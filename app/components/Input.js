import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
function Input({ label, password, ...Props }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor={colors.primary100}  {...Props} style={styles.Input} secureTextEntry={password} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginVertical: 10,
    paddingHorizontal: 10,
    color: colors.primary500,
    fontWeight: 'bold',
    fontSize: 20,

  },

  Input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary500,
    opacity: 1,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default Input;
