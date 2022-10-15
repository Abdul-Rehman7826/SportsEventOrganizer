import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 

import AuthNavigation from './app/Navigation/postNavigation';
function App() {
  return (
    <NavigationContainer>
      <AuthNavigation/>
    </NavigationContainer>
  );
}

export default App;
