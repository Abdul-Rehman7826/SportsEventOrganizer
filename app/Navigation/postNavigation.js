import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { postsScreens, postEditScreens, postDetailsScreens } from '../screens/Posts';
import colors from '../config/colors';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import { Button, TouchableOpacity, View } from 'react-native';
import AppButton from '../components/Button';
import IconButton from '../components/ui/IconButton';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

const postNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      mode="modal"
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
      <Stack.Screen name="postDetailsScreens" component={postDetailsScreens} />
    </Stack.Navigator >
  )
}

export default postNavigation;