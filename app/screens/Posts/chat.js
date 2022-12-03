import { Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../store/auth-context';
import { supabase } from '../../lib/supabase';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import { StatusBar } from 'expo-status-bar';
import ActivityIndicator from '../../components/ActivityIndicator';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const chat = ({ route, navigation }) => {
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
            title: route.params.item.eventTitle,
        });

    }, [route.params.item]);
    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            console.log('Chate focus', route.params.item);
            setEvent_id(route.params.item.id);
            setSender_id(authCtx.user.id);
        });
        return focusHandler;

    }, [route.params.item]);

    useEffect(() => {
        loadChatId();
        loadMessage();
    }, [event_id, sender_id]);

    useEffect(() => {
        const events = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'chat' },
                (payload) => {
                    loadMessage();
                }
            ).subscribe()

        return () => { events.subscribe };
    }, []);
    const sendMessage = async () => {
        Keyboard.dismiss();

        try {
            const { data, error } = await supabase
                .from('chat')
                .insert([
                    {
                        chat_list_id,
                        sender_id,
                        text
                    },
                ]).select();
            if (error) throw error.message
            if (!error) {
                console.log(data);
            }
        } catch (error) {
            Alert.alert('Error !', error);
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
    const loadChatId = async () => {
        try {
            setLoading(true);
            console.log(' :: ', sender_id, " :: ", event_id);
            let { data: ChatList, error } = await supabase
                .from('ChatList')
                .select('*')
                .eq('event_id', event_id)
                .eq('owner_ch_id', sender_id);
            if (!error) {
                if (ChatList.length == 0) {
                    const { data, error } = await supabase
                        .from('ChatList')
                        .insert([
                            {
                                owner_ch_id: sender_id,
                                event_id: event_id
                            },
                        ]).select();
                    if (error) throw error
                    if (!error) {
                        setChat_List_Id(data[0].id);
                        console.log("ChatList 1 ID:: ", data[0].id);
                    }
                } else {
                    setChat_List_Id(ChatList[0].id);
                    console.log("ChatList 2 ID:: ", ChatList[0].id);
                }
            }
            if (error) throw error
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
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
}

export default chat

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
        fontSize: 18,
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
        fontSize: 18,
        marginLeft: 10,
    },
})