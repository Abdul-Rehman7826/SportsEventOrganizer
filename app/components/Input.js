import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

function Input({ label, password, ...Props }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput   {...Props} style={styles.Input} secureTextEntry={password} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  Input: {
    width: '100%',
    height:50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius:5,
    borderColor: colors.black,
    opacity: 1,
  },
});

export default Input;
