import * as SecureStorage from 'expo-secure-store';
import { createContext, useState } from 'react';
import { supabase } from '../lib/supabase';


export const AuthContext = createContext({
  tokenid: '',
  isAuthenticated: false,
  authenticate: (tokenid) => { },
  logout: () => { },
});

function AuthContextProvider({ children }) {
  const [authtokenid, setAuthtokenid] = useState();

  async function authenticate(tokenid) {
    try {
      await SecureStorage.setItemAsync('tokenid', tokenid);
      setAuthtokenid(tokenid);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      console.log('logout-----------');
      let { error } = await supabase.auth.signOut();
      setAuthtokenid(null);
      await SecureStorage.deleteItemAsync('tokenid');
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    tokenid: authtokenid,
    isAuthenticated: (!!authtokenid),
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
