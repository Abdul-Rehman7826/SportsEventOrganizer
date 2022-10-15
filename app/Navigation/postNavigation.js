import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { postsScreens, postEditScreens, postDetailsScreens } from '../screens/Posts';
const Stack = createStackNavigator();
const postNavigation = () => {
  return (
      <Stack.Navigator initialRouteName='Posts' screenOptions={{ headerShow: false }}>
          <Stack.Screen name="Posts" component={postsScreens} />
          <Stack.Screen name="PostEditScreens" component={postEditScreens} />
          <Stack.Screen name="PostDetailsScreens" component={postDetailsScreens} />
      </Stack.Navigator>
  )
}

export default postNavigation