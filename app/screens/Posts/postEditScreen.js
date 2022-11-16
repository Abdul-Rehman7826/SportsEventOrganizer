import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Screen from "../../components/Screen";
import useLocation from "../../hooks/useLocation";



const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function postEditScreen() {
  // const location = useLocation();

  return (
    <Screen style={styles.container}>
      <View style={styles.imageContainer}></View>
      <View style={styles.Inputcontainer}></View>
      <View style={styles.buttoncontainer}></View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imageContainer: {

  },
  Inputcontainer: {

  },
  buttoncontainer: {

  },
});
export default postEditScreen;
