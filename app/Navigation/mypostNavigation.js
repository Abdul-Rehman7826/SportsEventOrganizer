import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { mypostsScreens, mypostEditScreens } from '../screens/MyPosts';
const Stack = createStackNavigator();
const postNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='mypostsScreens' >
      <Stack.Screen name="mypostsScreens" component={mypostsScreens} />
      <Stack.Screen name="mypostEditScreens" component={mypostEditScreens} />
    </Stack.Navigator>
  )
}

export default postNavigation;