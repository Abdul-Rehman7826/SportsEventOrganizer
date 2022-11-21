import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import Input from "../../components/Input";

import Screen from "../../components/Screen";
import colors from "../../config/colors";
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
  const location = useLocation();
  const [eventTitle, setEventTitle] = useState();
  const [category, setCategory] = useState();
  const [eventDate, setEventDate] = useState();
  const [imageUrl, setImageurl] = useState();
  const [description, setDescription] = useState();
  const [imageKey, setImageKey] = useState();


  console.log("Erorr :: ", supabase.auth.getUser()?.id);

  return (
    <Screen style={styles.container}>
      <View style={styles.imageContainer}>
      </View>
      <View style={styles.Inputcontainer}>
        <Input
          id='title'
          label={'Title'}
          placeholder={'Enter Title'}
          value={eventTitle}
          onChange={(text) => setEventTitle(text)}
        />
        <View style={{ borderWidth: 1, marginVertical: 5, borderRadius: 5, borderColor: colors.primary500 }} >

          <TextInput
            id='description'
            multiline
            numberOfLines={4}
            placeholder={'Enter Description'}
            placeholderTextColor={colors.primary500}
            value={description}
            onChange={(text) => setDescription(text)}
            style={{ backgroundColor: colors.white, borderRadius: 5, }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
        <TouchableOpacity
          style={[styles.cancel, styles.shadowOpt]}
          onPress={() => null}>
          <Text style={styles.cancelText}>cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.save, styles.shadowOpt]}
          onPress={() => null}>
          <Text style={styles.saveText}>save</Text>
        </TouchableOpacity>
      </View>
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

  save: {
    width: '30%',
    height: 40,
    backgroundColor: colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cancel: {
    width: '30%',
    height: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  cancelText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
});
export default postEditScreen;
