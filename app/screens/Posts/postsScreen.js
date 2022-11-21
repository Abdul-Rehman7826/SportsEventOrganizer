import React, { useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Card from "../../components/Card";
import Screen from "../../components/Screen";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";


function postsScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Post",
      // headerBackTitleVisible: false,
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
  return (
    <Screen style={styles.outContainer} >
      <ScrollView>
        <Card
          onPress={() => navigation.navigate('postDetailsScreens')}
          ProfPic={require('../../assets/usman.jpeg')}
          ProfName={'Usman Sipra'}
          pdate={'12-03-22'}
          subTitle={"Its a time to play with best player any one want to paly with me and my team wwcc"}
        />
        <Card
          ProfPic={require('../../assets/hamza.png')}
          ProfName={'Hamza Awerish'}
          pdate={'01-02-22'}
          subTitle={"We Want to play match if any onr is free to contect with us..."} />
        <Card
          ProfPic={require('../../assets/butt.png')}
          ProfName={'Husnain Butt'}
          pdate={'4-05-21'}
          subTitle={"Its a time to play with best player any one want to paly with me and my team wwcc"} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  outContainer: {
    margin: 5
  },
});

export default postsScreen;
