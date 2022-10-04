import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';

function SignUp({ navigation }) {
  const [fName, setFname] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <Screen style={styles.outContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text style={styles.imgText}>Sports Event Organizer</Text>
      </View>
      <View style={[styles.lastContainer,styles.shadowOpt]}>
        <Text style={styles.signUp}>Create Account</Text>
        <View style={styles.inputContainer}>
          <Text style={{ margin: 5 }}>Full Name</Text>
          <TextInput
            value={fName}
            onChangeText={setFname}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ margin: 7 }}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ margin: 7 }}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ margin: 7 }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>

              
        <TouchableOpacity style={[styles.singIn,styles.shadowOpt]}>
          <Text style={styles.singupText}>Sign Up</Text>
        </TouchableOpacity>


        <View style={{flexDirection:'row',marginVertical:10}}>
        <Text >
          I'm already a member .
          </Text>
          <TouchableOpacity onPress={() => console.log('signIn')}>
            <Text
              style={{
                color: colors.black,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        
        </View>
      
      
      </View>
    </Screen>

  );
}

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    padding:6,
  },

  imgContainer: {
    flex: 3,
    padding: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  lastContainer: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
  },

  signUp: {
    fontSize: 20,
    color: colors.black,
    marginVertical: 15,
    fontWeight:'bold',
  },

  inputContainer: {
    width: '90%',
  },

  textInput: {
    width: '100%',
    height:50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: colors.black,
    borderWidth: 1,

  },

  singIn: {
    width: '70%',
    height: 40,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },

  singupText: {
    color: 'white',
    fontWeight: 'bold',
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
export default SignUp;
