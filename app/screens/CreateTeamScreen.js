import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Feather } from "@expo/vector-icons";
import Screen from '../components/Screen'
import colors from '../config/colors'
import AppButton from '../components/Button'
import AppTextInput from '../components/TextInput'
import { ListItem, ListItemSeparator } from '../components/lists'

const CreateTeamScreen = () => {
  return (
    <Screen>
      <View style={[styles.firstContainer]}>
        <View style={styles.teamName} >
          <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-around'}}>
          <Text style={{ padding: 9,fontSize:25 }}>Lahore Qalender</Text>
          <Feather
            name='edit'
            size={25}
            />
          </View>
          <ListItemSeparator />
        </View>
        <ListItem
          image={require("../assets/usman.jpeg")}
        title={'Usman Sipra'}/>
        <ListItemSeparator />
        <ListItem
          image={require("../assets/hamza.png")}
          title={'Hamza Awerish'} />
        <ListItemSeparator />
        <ListItem
          image={require("../assets/imtyaz.png")}
          title={'Imtyaz Ahmed'} />
        <ListItemSeparator />
        <ListItem
          image={require("../assets/butt.png")}
          title={'Husnain Butt'} />
        

        <View style={[styles.EditTeam, styles.shadowOpt]}>
          <Feather
            name='plus'
            size={25}
            color={colors.white}
          />
        </View>
        </View>
    </Screen>
  )
}

export default CreateTeamScreen

const styles = StyleSheet.create({
  outContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  teamName: {
    flex:1,
    padding: 10,
    position: 'absolute',
    top: 10,
    width:'100%',
  },
  EditTeam: {
    alignItems: 'center',
    justifyContent:'center',
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius:50,
    bottom: 10,
    right:10,
    backgroundColor:colors.black,
  },
  firstContainer: {
    flex:2,
    marginTop: '10%',
    margin: 5,
    borderRadius:10,
    backgroundColor: colors.background,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
  },
  secondContainer: {
    flex: 4,
    backgroundColor: colors.light,
    margin: 5,
    borderRadius: 5,
    opacity: 0.9,
    padding:5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignContent:'center',
    justifyContent: 'space-evenly',
   
  },
  button: {
    padding: 7,
    margin: 10,
    borderWidth: 1,
    borderRadius: 50,
   width:'40%',
  },
  text: {
    color: colors.white,
    padding: 5,
    textAlign: 'center',
    fontWeight: "bold",
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
})