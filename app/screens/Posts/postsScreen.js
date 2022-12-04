import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Button, Image } from "react-native";

import Card from "../../components/Card";
import Screen from "../../components/Screen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import moment from "moment";
import colors from "../../config/colors";
import { ListItem, ListItemSeparator } from "../../components/lists";
import { StatusBar } from "expo-status-bar";

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
  }, [])

  const renderItem = ({ item }) => {
    const { id, eventTitle, category,
      eventDate, description, created_at,
      full_name, avatar_url, imageUrl } = item;
    // console.log(item);
    return (
      <View style={[styles.card, styles.shadowOpt]}>
        <ListItem
          chevron={false}
          title={full_name}
          subTitle={moment(created_at).fromNow()}
          image={{ uri: avatar_url }}
        />
        <ListItemSeparator />
        <View style={{ flexDirection: 'row', padding: 8 }}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={{ flexDirection: 'column', padding: 8 }}>
            <Text style={styles.title}>{eventTitle}</Text>
            <Text style={styles.subTitle} numberOfLines={2}>
              Event for : {category}
            </Text>
            <Text style={styles.subTitle} numberOfLines={2}>
              Event Date : {eventDate}
            </Text>
          </View>
        </View>

        <Button title="more detail.."
          onPress={() => navigation.navigate('postDetailsScreens', { item: item })} />
      </View>
    );
  }
  return (
    <Screen style={styles.outContainer} >
      <StatusBar style="auto" />
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
  image: {
    width: 100,
    height: 100,
  },
  card: {
    borderRadius: 7,
    backgroundColor: colors.white,
    marginBottom: 10,
    overflow: "hidden",
    margin: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
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
  subTitled: {
    color: colors.black,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
});

export default postsScreen;
