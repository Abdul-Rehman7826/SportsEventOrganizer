import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, Pressable, Keyboard, TouchableOpacity } from "react-native";
import { BottomSheet } from 'react-native-btr'

import { ListItem} from "../../components/lists";
import colors from "../../config/colors";
import Input from "../../components/Input";
import AppButton from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Entypo } from '@expo/vector-icons';

function AccountScreen({ navigation }) {

  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
      setVisible(!visible);
  };
  
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      setToken(storedToken);
      setUserId(storedUserId);
     }
    fetchToken();
  }, []);

  return (
    
    <View style={styles.outContainer}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        <View style={styles.bottomNavigationView}>
          <View style={{ flexDirection:'row',justifyContent:'space-between',alignItems:'center', margin: 10 }}>
            <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>Choose Image From</Text>
            <Pressable onPress={toggleBottomNavigationView}>
              <AntDesign name="close" size={24} color={colors.white}  />
            </Pressable>
          </View>
          <View style={styles.btnContaner}>
            <TouchableOpacity style={[styles.btnImgBS,styles.shadowOpt]}>
              <AntDesign name='camera' size={30} color={colors.white} />
              <Text style={{ color: colors.white }}>Camera</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.primary500 }}>OR</Text>
            <TouchableOpacity style={[styles.btnImgBS, styles.shadowOpt]}>
              <Entypo name='folder-images' size={30} color={colors.white} />
              <Text style={{color: colors.white }}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <View style={[styles.container]}>
          <View style={styles.ProfilePic}>
            <ListItem
              title={'AbdulRehman'}
              subTitle={'@Abdulrehman'}
              image={require("../../assets/abdulrehman.png")}
              chevron={false}
              imagePicker={true}
            onPress={toggleBottomNavigationView}
              backgroundColor={colors.light}
            />
          </View>
          <Text style={{ marginTop: 30, fontSize: 24, fontWeight: '700' }}>My Profile</Text>

            <Input label={'Name :'} placeholder='Abdul Rehman' />
            <Input label={'Email :'} placeholder='abdulrehman@gmail.com'/>
            <Input label={'Phone :'} placeholder='03127826888' />
            <Input label={'Address :'} placeholder='St.# 33 Gujranwala Pakistan' />

        <AppButton title={'Save'} width={'50%'} color={colors.black} />
      </View>
      </View>
   
     
  );
}
const styles = StyleSheet.create({
  outContainer: {
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex:1,
    backgroundColor:colors.light,
    margin:5,
    borderRadius: 7,
    padding: 20,    
  },
  ProfilePic: {
  margin:-20,
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
  bottomNavigationView: {
    backgroundColor: colors.primary500,
    width: '100%',
    height: '25%',
    borderRadius:20,
  },
  btnContaner: {
    // padding:20,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    width: '100%',
    backgroundColor: colors.primary100,
    height:'75%',
  },
  btnImgBS: {
    alignItems: 'center',
    margin:20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.primary500,
    color:colors.white,
  },

});
export default AccountScreen;
