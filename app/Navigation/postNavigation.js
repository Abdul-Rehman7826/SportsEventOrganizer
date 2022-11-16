import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { postsScreens, postEditScreens, postDetailsScreens } from '../screens/Posts';
const Stack = createStackNavigator();

const postNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='postsScreens' >
      <Stack.Screen name="postsScreens" component={postsScreens} />
      <Stack.Screen name="postEditScreens" component={postEditScreens} />
      <Stack.Screen name="postDetailsScreens" component={postDetailsScreens} />
    </Stack.Navigator>
  )
}

export default postNavigation;