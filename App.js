import 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import AuthContextProvider, { AuthContext } from './app/store/auth-context';
import AuthNavigation from './app/Navigation/AuthNavigation';
import DrawerNavigation from './app/Navigation/DrawerNavigation';
import { supabase } from './app/lib/supabase';

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
  async function loaduser() {
    const { data: { user } } = await supabase.auth.getUser();
    authCtx.authenticate(user);
    setIsTryingLogin(false);
  }
  useEffect(() => {
    loaduser();
    const auth = () => supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') authCtx.authenticate('');
      if (event === 'SIGNED_IN') authCtx.authenticate(session.user)
    }).unsubscribe

    return () => auth.unsubscribe()

  }, [])

  // useEffect(() => {
  //   async function fetchToken() {
  //     const storedToken = await SecureStorage.getItemAsync('tokenid');
  //     if (storedToken) {
  //       authCtx.authenticate(storedToken);
  //       console.log(storedToken);
  //     }
  //     setIsTryingLogin(false);
  //   }
  //   fetchToken();
  // }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
