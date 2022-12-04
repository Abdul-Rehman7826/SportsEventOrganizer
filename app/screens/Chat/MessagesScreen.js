import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import { supabase } from "../../lib/supabase";
import moment from "moment";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../store/auth-context";

function MessagesScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState();

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };
  const loadData = async () => {
    console.log(authCtx.user.id);
    try {
      let { data: chat_list_view, error } = await supabase
        .from('chat_list_view')
        .select("*")
        .eq('receiver_id', authCtx.user.id);
      if (error) throw error.message
      if (!error) {
        setMessages(chat_list_view);
      }
    } catch (error) {
      console.log("error::", error);

    }
  };
  const navigateTochat = (item) => {
    navigation.navigate('MessageViewScreen', { item: item })
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Screen>
      <StatusBar style="auto" />
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.eventTitle}
            subTitle={moment(item.created_at).fromNow()}
            image={{ uri: item.avatar_url }}
            onPress={() => navigateTochat(item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          loadData();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
