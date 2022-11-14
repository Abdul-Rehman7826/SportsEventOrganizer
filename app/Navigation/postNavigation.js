import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import { AuthContext } from '../store/auth-context';

const authCtx = useContext(AuthContext);
import { postsScreens, postEditScreens, postDetailsScreens } from '../screens/Posts';
const Stack = createStackNavigator();
const postNavigation = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName='Posts'  >
      <Stack.Screen name="Posts" component={postsScreens} options={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />
      }} />
      <Stack.Screen name="PostEditScreens" component={postEditScreens} />
      <Stack.Screen name="PostDetailsScreens" component={postDetailsScreens} />
    </Stack.Navigator>
  )
}

export default postNavigation;