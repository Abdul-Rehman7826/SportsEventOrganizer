import 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import * as SecureStorage from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider, { AuthContext } from './app/store/auth-context';
import AuthNavigation from './app/Navigation/AuthNavigation';
import DrawerNavigation from './app/Navigation/DrawerNavigation';

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthNavigation />}
      {authCtx.isAuthenticated && <DrawerNavigation />}
    </NavigationContainer>
  );
}

function Root() {

  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStorage.getItemAsync('tokenid');
      if (storedToken) {
        authCtx.authenticate(storedToken);
        console.log(storedToken);
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
