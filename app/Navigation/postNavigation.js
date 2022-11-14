import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../store/auth-context';

const authCtx = useContext(AuthContext);
import { postsScreens, postEditScreens, postDetailsScreens } from '../screens/Posts';
const Stack = createStackNavigator();
const postNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='PostEditScreens' >
      <Stack.Screen name="PostEditScreens" component={postEditScreens} options={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }} />
          <Stack.Screen name="Posts" component={postsScreens} />
          <Stack.Screen name="PostDetailsScreens" component={postDetailsScreens} />
      </Stack.Navigator>
  )
}

export default postNavigation;