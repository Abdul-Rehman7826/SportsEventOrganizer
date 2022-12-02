import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";

import colors from "../../config/colors";
import Text from "../../components/Text";
import AppButton from "../../components/Button";
import { AuthContext } from '../../store/auth-context';

function postDetailsScreen({ route, navigation }) {
  const authCtx = useContext(AuthContext);
  const { item } = route.params;
  const MakeChat = () => {
    navigation.navigate('Chat', { screen: 'MessageViewScreen', params: { item: item }, });
  };
  return (
    <View>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.eventTitle}</Text>
        <View >
          <Text style={styles.textS}>{item.category}</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.medium }}>Event Date : </Text>
        <Text style={styles.textS}>{item.eventDate}</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.medium }}>Description : </Text>
        <Text style={styles.textD}>{item.description}</Text>
        <View style={styles.userContainer}>
          {item.user_id != authCtx.user?.id &&

            <AppButton title={'Message'} color={colors.primary500} onPress={MakeChat} />
          }

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
  textS: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  textC: {
    backgroundColor: colors.light,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  textD: {
    fontSize: 15,
  },
  userContainer: {
    // marginVertical: auto,
    alignItems: 'center',
  },
  btnContainer: {
    backgroundColor: colors.primary500,
    height: 50,
    width: '50%',

  },
});

export default postDetailsScreen;
