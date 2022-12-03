import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { postsScreens, postEditScreens, postDetailsScreens, chat } from '../screens/Posts';
import colors from '../config/colors';

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
      }}
    >
      <Stack.Screen name="postsScreens" component={postsScreens} options={{ title: 'Events' }} />
      <Stack.Screen name="postEditScreens" component={postEditScreens} options={{ title: 'Create Event' }} />
      <Stack.Screen name="postDetailsScreens" component={postDetailsScreens} options={{ title: 'Create Event' }} />
      <Stack.Screen name="chatScreen" component={chat} />
    </Stack.Navigator >
  )
}

export default postNavigation;