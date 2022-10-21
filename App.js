import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import AuthNavigation  from './app/Navigation/AuthNavigation';
import AccountScreen from './app/screens/Profile/AccountScreen';
import AuthContextProvider, { AuthContext } from './app/store/auth-context';
import colors from './app/config/colors';
import IconButton from './app/components/ui/IconButton';

const Stack = createStackNavigator();

function AuthenticatedStack() {

  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: colors.black },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={AccountScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNavigation />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {

  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedToken) {
        authCtx.authenticate(storedToken, storedUserId);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style='light'
      />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
