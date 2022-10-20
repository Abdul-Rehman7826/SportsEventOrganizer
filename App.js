import React from "react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native"; 

import AuthNavigation from './app/Navigation/postNavigation';
function App() {
  return (
    <>
      <StatusBar style='light' />
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </>
  );
}

export default App;
