import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../store/auth-context';
const authCtx = useContext(AuthContext);

import CreateTeamScreen from '../screens/Teams/CreateTeamScreen';
const Stack = createStackNavigator();
const chatNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='CreateTeamScreen' >
      <Stack.Screen name="CreateTeamScreen" component={CreateTeamScreen} options={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />
      }} />
    </Stack.Navigator>
  )
}

export default chatNavigation;