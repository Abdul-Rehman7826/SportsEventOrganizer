import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateTeamScreen from '../screens/Teams/CreateTeamScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();
const chatNavigation = ({ navigation }) => {
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
      initialRouteName='CreateTeamScreen' >
      <Stack.Screen name="CreateTeamScreen" component={CreateTeamScreen} />
    </Stack.Navigator>
  )
}

export default chatNavigation;