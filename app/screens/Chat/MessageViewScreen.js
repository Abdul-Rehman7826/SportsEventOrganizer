import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from '../../components/Screen'
import colors from "../../config/colors";

import { supabase } from '../../lib/supabase';
import { AuthContext } from '../../store/auth-context';

const MessageViewScreen = ({ route, navigation }) => {
    const authCtx = useContext(AuthContext);
    const { item } = route.params;
    const [chat_list_id, setChat_List_Id] = useState();
    const [sender_id, setSender_id] = useState();
    const [text, setText] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: item.eventTitle,
        });

    }, []);
    useEffect(() => {

        const load = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setSender_id(user.id);
                let { data: ChatList, error } = await supabase
                    .from('ChatList')
                    .select('*')
                    .eq('event_id', item.id)
                    .eq('owner_ch_id', user.id);

                if (!error) {
                    if (ChatList.length == 0) {
                        const { data, error } = await supabase
                            .from('ChatList')
                            .insert([
                                {
                                    owner_ch_id: user.id,
                                    event_id: item.id
                                },
                            ]).select();
                        if (error) throw error
                        if (!error) {
                            setChat_List_Id(data[0].id);
                            console.log("ChatList ID:: ", data[0].id);
                        }
                    } else {
                        setChat_List_Id(ChatList[0].id);
                        console.log("ChatList ID:: ", ChatList[0].id);
                    }
                }
                if (error) throw error
            } catch (error) {
                console.log(error);
            }
        };
        load();
    }, [item]);
    return (
        <Screen>
            <View style={styles.container}>
                <Text>{item.eventTitle}</Text>
                <View style={styles.footer}>
                    <TextInput
                        value={text}
                        onChangeText={(t) => { setText(t) }}
                        placeholder="Message"
                        style={styles.textInput}
                    />
                    <TouchableOpacity disabled={text.length == 0} onPress={() => null} activeOpacity={0.5}>
                        <MaterialCommunityIcons name="send" size={40} color={colors.primary500} />
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    )
}

export default MessageViewScreen

const styles = StyleSheet.create({
    outContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        width: '95%',
        backgroundColor: colors.background,
        margin: 8,
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
        position: 'absolute',
        bottom: 10,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.black,
        padding: 10,
        color: "gray",
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