import React from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";

import { ListItem} from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
// import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Input from "../components/Input";
import AppButton from "../components/Button";


function AccountScreen({ navigation }) {
  // const { user, logOut } = useAuth();

  return (
    <Screen
      style={styles.outContainer}>

        <View style={[styles.container]}>
          <View style={styles.ProfilePic}>
            <ListItem
              title={'AbdulRehman'}
              subTitle={'@Abdulrehman'}
              image={require("../assets/abdulrehman.png")}
              chevron={false}
              imagePicker={true}
              onPress={() => (console.log('Take Pic from galery'))}
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
    backgroundColor:colors.light,
    margin:8,
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

});
export default AccountScreen;
