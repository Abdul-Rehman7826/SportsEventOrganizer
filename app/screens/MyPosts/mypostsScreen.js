import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "../../components/Screen";
import { supabase } from "../../lib/supabase";
import { ListItem, ListItemSeparator } from "../../components/lists";
import colors from "../../config/colors";
import moment from "moment";


function mypostsScreen({ navigation }) {
  const [data, setData] = useState();

  const loadEvents = async () => {
    try {

      const { data: { user } } = await supabase.auth.getUser();
      let { data: all_events, error } = await supabase
        .from('all_events')
        .select('*')
        .eq('user_id', user.id);
      if (!error) {
        console.log({ all_events });
        setData(all_events);
      }
      if (error) throw error
    } catch (error) {
      console.log(error);
    }
  };
  const removeEvent = async (item) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', item.id)
      if (error) throw error;
      if (!error) {
        console.log('Data remove');
        loadEvents();
      }
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    loadEvents();
  }, []);

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

        <Pressable style={{ backgroundColor: colors.danger, alignItems: 'center' }}
          onPress={() => removeEvent(item)} >
          <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>Delete</Text>
        </Pressable>
      </View>
    );
  };

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
    margin: 5
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

export default mypostsScreen;
