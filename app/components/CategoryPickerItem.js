import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

function CategoryPickerItem({ item, onPress }) {
  return (
    <View >
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={30}
        />
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    // width: "33%",
  },
  label: {
    margin: 5,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
