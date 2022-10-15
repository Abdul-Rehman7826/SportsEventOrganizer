import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, LoginScreen, RegisterScreen } from '../screens/Auth';
const Stack = createStackNavigator();
const AuthNavigation = () => {
    return (
        <Stack.Navigator  initialRouteName='WelcomeScreen' screenOptions={{headerShow:false}}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="Registeration" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        )
}

export default AuthNavigation;