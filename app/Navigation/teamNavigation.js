import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateTeamScreen from '../screens/Teams/CreateTeamScreen';

const Stack = createStackNavigator();
const chatNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='CreateTeamScreen' >
      <Stack.Screen name="CreateTeamScreen" component={CreateTeamScreen} />
    </Stack.Navigator>
  )
}

export default chatNavigation;