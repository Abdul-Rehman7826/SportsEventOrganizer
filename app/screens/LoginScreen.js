import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import Screen from '../components/Screen';
import colors from '../config/colors';

function SignIn({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <Screen style={styles.outContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={require('../assets/logo.png')} />
      </View>
      <View style={[styles.lastContainer]}>
        <Text style={styles.signin}>Sign In</Text>

        <View style={{ width: '90%' }}>
          <Input
            label={'Email Address'}
            value={email}
            onChangeText={setEmail}
            placeholder={'Enter your email'}
          />
        </View>
        <View style={{ width: '90%' }}>
          <Input
            label={'Password'}
            value={password}
            onChangeText={setPassword}
            placeholder={'Enter your password'}
            password={true}
          />
        </View>

        <TouchableOpacity style={styles.Fpassword}>
          {/* <Text>Forgot Password?</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.singIn, styles.shadowOpt]}>
          <Text style={styles.singupText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  outContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent:'center',
    backgroundColor: colors.black,
    paddingBottom: 10,
    padding:5,
  },
  image: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    flex: 1.5,
    padding: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastContainer: {
    flex:2,
    alignItems  :'center',
    justifyContent:'center',
    backgroundColor:  colors.light,
    borderRadius: 7,
  },

  signin: {
    fontSize: 24,
    color: 'black',
    marginVertical: 15,
    fontWeight:'800',
  },

  Fpassword: {
    width: '90%',
    alignItems: 'flex-end',
    marginVertical: 10,
  },

  singIn: {
    width: '80%',
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

export default SignIn;
