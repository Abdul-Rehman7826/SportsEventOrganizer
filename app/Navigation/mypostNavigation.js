import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { mypostsScreens, mypostEditScreens } from '../screens/MyPosts';
import colors from '../config/colors';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
const postNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: 'bold',
        },
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: 'center',
              width: 100,
              marginRight: 25,
            }}
          >
            <TouchableOpacity>
              <FontAwesome name="plus" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons name="menu" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
        ),

      }}
    >
      <Stack.Screen name="mypostsScreens" component={mypostsScreens} />
      <Stack.Screen name="mypostEditScreens" component={mypostEditScreens} />
    </Stack.Navigator>
  )
}

export default postNavigation;