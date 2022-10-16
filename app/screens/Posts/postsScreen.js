import React from "react";
import {  StyleSheet, View } from "react-native";

import Card from "../../components/Card";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import { ScrollView } from "react-native-gesture-handler";


function postsScreen(props) {
  return (
    <Screen style = {styles.outContainer} >
        <ScrollView>
          <Card
            ProfPic={require('../../assets/usman.jpeg')}
            ProfName={'Usman Sipra'}
            pdate={'12-03-22'}
            subTitle={"Its a time to play with best player any one want to paly with me and my team wwcc"}
          />
          <Card
            ProfPic={require('../../assets/hamza.png')}
            ProfName={'Hamza Awerish'}
            pdate={'01-02-22'}
            subTitle={"We Want to play match if any onr is free to contect with us..."}/>
          <Card
            ProfPic={require('../../assets/butt.png')}
            ProfName={'Husnain Butt'}
            pdate={'4-05-21'}
            subTitle={"Its a time to play with best player any one want to paly with me and my team wwcc"}/>
        </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  outContainer: {
    margin: 5,
    backgroundColor:colors.background,
  },
});

export default postsScreen;
