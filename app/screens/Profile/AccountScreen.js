import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, Pressable, Keyboard, TouchableOpacity } from "react-native";
import { BottomSheet } from 'react-native-btr';
import * as ImagePicker from "expo-image-picker";

import { ListItem } from "../../components/lists";
import colors from "../../config/colors";
import Input from "../../components/Input";
import AppButton from "../../components/Button";

import { AntDesign, Entypo } from '@expo/vector-icons';

import { supabase } from "../../lib/supabase";
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import Screen from "../../components/Screen";
import ActivityIndicator from "../../components/ActivityIndicator";

function AccountScreen({ navigation }) {
  const [loading, setLoading] = useState();
  const [fname, setFname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [avatar_url, setAvatar_url] = useState();
  const [imaget, setImaget] = useState();

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const uploadeBucket = async (photo) => {
    console.log(photo);
    const ext = photo.uri.split('.').pop();
    const filename = photo.uri.replace(/^.*[\\\/]/, "");

    var formData = new FormData();
    formData.append("files", {
      uri: photo.uri,
      name: filename,
      type: `${photo.type}/${ext}`
    })
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`_${Math.floor(Math.random() * 1000) + 2}${filename}_avatar.${ext}`, formData);
      if (error) throw error.message;
      if (!error) setAvatar_url(`https://utvogrvlrqwaunjqpryp.supabase.co/storage/v1/object/public/avatars/${data.path}`);
    } catch (error) {
      Alert.alert('Image Upload error', error.message);
    } finally {
      setLoading(false);
    }
  };
  const takePicture = async () => {
    toggleBottomNavigationView();
    let photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!photo.cancelled) {
      setImaget(photo);
      uploadeBucket(photo);
    }
  };

  const pickImage = async () => {
    toggleBottomNavigationView();
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photo.cancelled) {
      setImaget(photo);
      uploadeBucket(photo);
    }
  };


  const getProfile = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser();
      console.log('user id :: ', user.id);
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();
      if (error) throw error.message;
      if (data) {
        setFname(data.full_name);
        setPhone(data.phone);
        setEmail(data.email);
        setAvatar_url(data.avatar_url);
      }

    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
  const UpdateProfile = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fname,
          email: email,
          phone: phone,
          avatar_url: avatar_url
        });
      if (error) throw error
      console.log("after updateing");
    } catch (error) {
      console.log(error.message)
    } finally {
      getProfile();
      setLoading(false)
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!status === 'granted') Alert.alert("Cannot access the MediaLibrary !");
    })();
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (!status === 'granted') Alert.alert("Cannot access the Camera !");;
    })();
    getProfile();
  }, [])


  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <View style={styles.outContainer}>
        <View style={[styles.container]}>
          <View style={styles.ProfilePic}>
            <ListItem
              title={fname}
              image={{ uri: avatar_url }}
              chevron={false}
              imagePicker={true}
              onPress={toggleBottomNavigationView}
              backgroundColor={colors.light}
            />
          </View>

          <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700' }}>My Profile</Text>

          <Input label={'Name :'}
            value={fname}
            onChangeText={(t) => setFname(t)}
          />
          <Input label={'Email :'}

            keyboardType='email-address'
            value={email}
            onChangeText={(text) => { setEmail(text) }}
          />
          <Input label={'Phone :'}
            keyboardType='phone-pad'
            value={phone}
            onChangeText={(text) => { setPhone(text) }}

          />
          <AppButton onPress={UpdateProfile} title={'Save'} width={'50%'} color={colors.black} />
        </View>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>Choose Image From</Text>
            <Pressable onPress={toggleBottomNavigationView}>
              <AntDesign name="close" size={24} color={colors.white} />
            </Pressable>
          </View>
          <View style={styles.btnContaner}>
            <TouchableOpacity onPress={takePicture} style={[styles.btnImgBS, styles.shadowOpt]}>
              <AntDesign name='camera' size={30} color={colors.white} />
              <Text style={{ color: colors.white }}>Camera</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary500 }}>OR</Text>
            <TouchableOpacity onPress={pickImage} style={[styles.btnImgBS, styles.shadowOpt]}>
              <Entypo name='folder-images' size={30} color={colors.white} />
              <Text style={{ color: colors.white }}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </Screen>

  );
}
const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.light,
    margin: 5,
    borderRadius: 7,
    padding: 20,
  },
  ProfilePic: {
    margin: -20,
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
  bottomNavigationView: {
    backgroundColor: colors.primary500,
    width: '100%',
    height: '25%',
    borderRadius: 20,
  },
  btnContaner: {
    // padding:20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.primary100,
    height: '75%',
  },
  btnImgBS: {
    alignItems: 'center',
    margin: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.primary500,
    color: colors.white,
  },

});

export default AccountScreen;
