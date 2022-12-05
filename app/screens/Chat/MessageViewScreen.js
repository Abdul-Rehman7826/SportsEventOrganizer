import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from '../../components/Screen'
import colors from "../../config/colors";
import ActivityIndicator from '../../components/ActivityIndicator';
import { supabase } from '../../lib/supabase';
import { AuthContext } from '../../store/auth-context';
import { StatusBar } from 'expo-status-bar';

const MessageViewScreen = ({ route, navigation }) => {
    const authCtx = useContext(AuthContext);
    const { item } = route.params;
    const [loading, setLoading] = useState(false);
    const [event_id, setEvent_id] = useState();
    const [sender_id, setSender_id] = useState();
    const [chat_list_id, setChat_List_Id] = useState();
    const [text, setText] = useState('');
    const [message, setMessage] = useState([]);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: item.eventTitle,
        });

    }, [route.params.item]);


    useEffect(() => {
        setEvent_id(route.params.item.event_id);
        setSender_id(authCtx.user.id);
        setChat_List_Id(route.params.item.id);

    }, [route.params.item]);

    useEffect(() => {
        loadMessage();
        const events = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'chat' },
                (payload) => {
                    loadMessage();
                }
            ).subscribe()

        return () => { events.subscribe };
    }, [chat_list_id]);

    const sendMessage = async () => {
        Keyboard.dismiss();
        console.log('::', authCtx.user.id);
        try {
            const { data, error } = await supabase
                .from('chat')
                .insert([
                    {
                        chat_list_id,
                        sender_id: authCtx.user.id,
                        text
                    },
                ]).select();
            if (error) throw error
            if (!error) {
                console.log(data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setText('');
        }
    }
    const loadMessage = async () => {
        try {
            console.log('loadMessage :: ', chat_list_id);
            let { data: chat_view, error } = await supabase
                .from('chat_view')
                .select("*")
                .eq('chat_list_id', chat_list_id);
            if (error) throw error
            if (!error) {
                setMessage(chat_view);
                console.log(chat_view);
            }
        } catch (error) {
            console.log(error)
        }
    };


    const renderitem = ({ item }) => {
        return (
            item.sender_id == sender_id ? (
                <View key={item.created_at} style={styles.receiver}>
                    <Text style={styles.receiverText}>{item.text}</Text>
                </View>
            ) : (
                <View key={item.created_at} style={styles.sender}>
                    <Text style={styles.senderText}>{item.text}</Text>
                </View>
            )
        );
    }
    return (
        <Screen>
            <StatusBar style="light" />
            <ActivityIndicator visible={loading} />
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={message}
                        renderItem={renderitem}
                        keyExtractor={(item) => item.id.toString()}
                        inverted
                    />
                </TouchableWithoutFeedback>

            </View>
            <View style={styles.footer}>
                <TextInput
                    value={text}
                    onChangeText={(t) => { setText(t) }}
                    placeholder="Message"
                    style={styles.textInput}
                    placeholderTextColor={colors.medium}
                />
                <TouchableOpacity disabled={text.length == 0} onPress={sendMessage} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="send-circle" size={50} color={colors.primary500} />
                </TouchableOpacity>
            </View>
        </Screen>
    )
};

export default MessageViewScreen

const styles = StyleSheet.create({
    outContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        borderRadius: 7,
    },
    shadowOpt: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 10,
        bottom: 10,
    },
    textInput: {
        bottom: 0,
        height: 50,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black,
        padding: 10,
        borderRadius: 20,
    },

    senderText: {
        color: "#fff",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "#fff",
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2068E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    receiverText: {
        color: "#000",
        fontWeight: "500",
        marginLeft: 10,
    },
})