import React from "react";
import { View, Image, StyleSheet } from "react-native";

import colors from "../../config/colors";
import ListItem from "../../components/lists/ListItem";
import Text from "../../components/Text";

function postDetailsScreen(props) {
  return (
    <View>
      <Image style={styles.image} source={require("../assets/jacket1.png")} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Red jacket for sale</Text>
        <Text style={styles.price}>$100</Text>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/ahmad1.png")}
            title="Ahmad Al-Amin"
            subTitle="5 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default postDetailsScreen;
