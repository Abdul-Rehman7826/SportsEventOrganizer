import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import { ListItem, ListItemSeparator } from "../components/lists";

function Card({ ProfPic, ProfName, pdate, title, subTitle, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card,styles.shadowOpt]}>
        <ListItem
          chevron={false}
          title={ProfName}
          subTitle={pdate}
          image={ProfPic}
        />
        <ListItemSeparator/>
        {image && <Image style={styles.images} source={image} />}
        <ListItemSeparator />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius:7,
    backgroundColor: colors.white,
    marginBottom: 10,
    overflow: "hidden",
    margin:5,
  },
  detailsContainer: {
    padding: 20,
  },
  images: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  ProfPic:{
    backgroundColor:'blue',
    width:50,
    height:50,
    borderRadius: 50,
    margin:5,
  },
  ProfName:{
    backgroundColor: 'black',
    color:'white',
    padding:5,
    margin:5,
  },
  PrifileInfo:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:colors.primary,
  },
  shadowOpt:{
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
  
    },
});

export default Card;
