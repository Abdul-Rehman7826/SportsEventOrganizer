import React from 'react'
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from '../../components/Screen'
import colors from "../../config/colors";
import { ListItem } from '../../components/lists';

const MessageViewScreen = () => {
    const data = [
        {},{}
    ]
  return (
      <Screen>
              <View style={styles.container}>
                  <ListItem
                      title={'AbdulRehman'}
                      image={require('../assets/usman.jpeg')}
                  chevron={false}
                  />
                  <View style={styles.footer}>
                      <TextInput
                          placeholder="Message"
                          style={styles.textInput}
                      />
                      <TouchableOpacity onPress={() => (console.log(''))} activeOpacity={0.5}>
                          <MaterialCommunityIcons name="send" size={30} color={colors.black}  />
                      </TouchableOpacity>
                  </View>
              </View>
      </Screen>
  )
}

export default MessageViewScreen

const styles = StyleSheet.create({
    outContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        width: '95%',
        backgroundColor: colors.background,
        margin: 8,
        borderRadius: 7,
    },
    shadowOpt: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 10,
        position: 'absolute',
        bottom: 10,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor:colors.black,
        padding: 10,
        color: "gray",
        borderRadius:20,
    },

    senderText: {
        color: "#fff",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "#fff",
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: "#2068E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    receiverText: {
        color: "#000",
        fontWeight: "500",
        marginLeft: 10,
    },
})