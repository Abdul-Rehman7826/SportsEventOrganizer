import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen, LoginScreen, RegisterScreen } from '../screens/Auth';
import colors from '../config/colors';
const Stack = createStackNavigator();
const AuthNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: colors.primary100 },
            }}
        >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="Registeration" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        )
}

export default AuthNavigation;