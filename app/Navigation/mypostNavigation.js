import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../store/auth-context';

const authCtx = useContext(AuthContext);
import { mypostsScreens, mypostEditScreens } from '../screens/MyPosts';
const Stack = createStackNavigator();
const postNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='mypostsScreens' >
      <Stack.Screen name="mypostsScreens" component={mypostsScreens} options={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />
      }} />
      <Stack.Screen name="mypostEditScreens" component={mypostEditScreens} />
    </Stack.Navigator>
  )
}

export default postNavigation;