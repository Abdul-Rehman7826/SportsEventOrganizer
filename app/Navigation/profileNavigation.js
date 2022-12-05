import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import profile from '../screens/Profile/AccountScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();
const profileNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary500,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}        >
      <Stack.Screen name="Profile" component={profile} />
    </Stack.Navigator>
  )
}

export default profileNavigation;