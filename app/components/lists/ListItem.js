import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  chevron = true,
  imagePicker = false,
 ...Props
}) {
  return (
  <GestureHandlerRootView>
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={[styles.container, {...Props}]}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle && (
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          {chevron && <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
            />}
            {imagePicker && 
              <TouchableHighlight onPress={onPress}>
                <MaterialCommunityIcons
                  color={colors.black}
                  name="camera"
                  size={28}/>
              </TouchableHighlight>
            }
        </View>
      </TouchableHighlight>
    </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor:colors.black,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
