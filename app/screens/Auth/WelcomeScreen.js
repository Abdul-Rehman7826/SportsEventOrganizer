import React, { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../config/colors';
import Screen from '../../components/Screen';


function Welcome({ navigation }) {
  return (    
    <Screen style={styles.outContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={require('../../assets/logo.png')}/>
        <Text style={styles.imgText}>Sports Event Organizer</Text>
       </View>
      <View style={[styles.buttonContainer]}>
        <Text style={styles.bestText}>Best way to Play!</Text>
        <TouchableOpacity
          style={[styles.singUp,styles.shadowOpt]}
          onPress={() => navigation.navigate('Registeration')}>
          <Text style={styles.singupText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.singIn,styles.shadowOpt]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.singinText}>Login</Text>
        </TouchableOpacity>
      </View>
    </Screen >
  );
}

const styles = StyleSheet.create({
  outContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  imgContainer: {
    flex:3,
    padding: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    width: 200,
    height:200,
  },
  imgText: {
    textAlign: 'center',
    fontSize: 35,
    color: 'black',
    color: colors.black,
  },
  buttonContainer: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: colors.light,
    borderRadius: 25,
    margin: 5,
  },

  bestText: {
    fontSize: 16,
    color: 'black',
  },
  singUp: {
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
    textTransform:'uppercase',
  },
  singIn: {
    width: '80%',
    height: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  singinText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
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
export default Welcome;
