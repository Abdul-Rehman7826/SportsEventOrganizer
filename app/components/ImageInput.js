import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import { supabase } from "../lib/supabase";
import ActivityIndicator from "./ActivityIndicator";

function ImageInput({ imageUri, onChangeImage }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      if (!result.cancelled) {
        /**
         * 
         * 
         */
        const ext = result.uri.split('.').pop();
        const filename = result.uri.replace(/^.*[\\\/]/, "");
        // console.log(imaget);
        var formData = new FormData();
        formData.append("files", {
          uri: result.uri,
          name: filename,
          type: `${result.type}/${ext}`
        })
        setVisible(true);
        const { data, error } = await supabase.storage
          .from('events')
          .upload(`_${Math.floor(Math.random() * 100) + 1}_event.${ext}`, formData);
        // console.log(error);
        if (error) {
          throw error
        }
        onChangeImage(`https://utvogrvlrqwaunjqpryp.supabase.co/storage/v1/object/public/events/${data.path}`);
        setVisible(false);


        /**
         * 
         * 
         */
        // onChangeImage(result.uri);
      }
      console.log(result);
    } catch (error) {
      Alert.alert('Image Upload!', error.message);
      console.log("Error reading an image", error);
    }
  };

  return (
    <>
      <ActivityIndicator visible={visible} />
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {!imageUri && (
            <MaterialCommunityIcons
              color={colors.medium}
              name="camera"
              size={40}
            />
          )}
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 200,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 200,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
