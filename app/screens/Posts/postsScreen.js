import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Button } from "react-native";

import Card from "../../components/Card";
import Screen from "../../components/Screen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import moment from "moment";

function postsScreen({ navigation }) {
  const [data, setData] = useState([]);

  const loadEvents = async () => {
    try {
      let { data: all_events, error } = await supabase
        .from('all_events')
        .select('*')
      if (!error) setData(all_events);
      if (error) throw error
    } catch (error) {
      console.log(error);
    }
  };
  const lisentEvent = async () => {

    const events = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        (payload) => {
          loadEvents();
        }
      )
      .subscribe()
    return events;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Events",
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: 'center',
            width: 100,
            marginRight: 25,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('postEditScreens')}>
            <FontAwesome name="plus" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons name="menu" size={35} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [])
  useEffect(() => {
    loadEvents();
    const events = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        (payload) => {
          loadEvents();
        }
      ).subscribe()

    return () => { events.subscribe };
  }, [navigation])

  const renderItem = ({ item }) => {
    const { id, eventTitle, category,
      eventDate, description, created_at,
      full_name, avatar_url } = item;
    // console.log(item);
    return (
      <>
        <Text>{eventTitle}</Text>
        <Button title="more detail.."
          onPress={() => navigation.navigate('postDetailsScreens', { item: item })} />
      </>
    );
  }
  return (
    <Screen style={styles.outContainer} >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  outContainer: {
  },
});

export default postsScreen;
