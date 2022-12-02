import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../../components/lists";
import { supabase } from "../../lib/supabase";
import moment from "moment";



function MessagesScreen(props) {
  const [messages, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let { data: chat_list_view, error } = await supabase
        .from('chat_list_view')
        .select("*")
        .eq('owner_ch_id', user.id);
      if (error) throw error
      if (!error) {
        console.log(chat_list_view);
        setMessages(chat_list_view);
      }
    } catch (error) {
      console.log("error::", error);

    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.eventTitle}
            subTitle={moment(item.created_at).fromNow()}
            image={{ uri: item.avatar_url }}
            onPress={() => console.log("Message selected", item)}
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
