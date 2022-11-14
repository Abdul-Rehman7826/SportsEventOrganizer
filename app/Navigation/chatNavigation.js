import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../store/auth-context';

const authCtx = useContext(AuthContext);
import MessageScreen from '../screens/Chat/MessagesScreen';
import MessageViewScreen from '../screens/Chat/MessageViewScreen';
const Stack = createStackNavigator();

const chatNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='MessageViewScreen' >
      <Stack.Screen name="MessageViewScreen" component={MessageViewScreen}
        options={{
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />
        }} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
    </Stack.Navigator>
  )
}

export default chatNavigation;