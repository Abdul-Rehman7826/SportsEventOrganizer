import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MessageScreen from '../screens/Chat/MessagesScreen';
import MessageViewScreen from '../screens/Chat/MessageViewScreen';
const Stack = createStackNavigator();

const chatNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='MessageViewScreen' >
      <Stack.Screen name="MessageViewScreen" component={MessageViewScreen}
      />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  )
}

export default chatNavigation;