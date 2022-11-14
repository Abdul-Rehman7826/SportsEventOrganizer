import React, { useState,  useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import LoadingOverlay from '../../components/ui/LoadingOverlay';
 
import Input from '../../components/Input';
import colors from '../../config/colors';
import Screen from '../../components/Screen';
import { login } from '../../api/auth';
import { AuthContext } from '../../store/auth-context';


function SignIn({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isAuthenticating, setIsAuthenticating] = useState(false);


  const authCtx = useContext(AuthContext);

  async function loginHandler() {
    setIsAuthenticating(true);
    try {
      const {tokenid} = await login(email, password);
      if (tokenid) {
        authCtx.authenticate(tokenid);
      }
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
  
      <Screen style={styles.outContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
      </View>
      <View style={[styles.lastContainer, styles.shadowOpt]}>
        <Text style={styles.signin}>Sign In</Text>

        <View style={{ width: '90%' }}>
          <Input
            label={'Email Address'}
            value={email}
            onChangeText={setEmail}
            placeholder={'Enter your email'}
          />
        </View>
        <View style={{ width: '90%' }}>
          <Input
            label={'Password'}
            value={password}
            onChangeText={setPassword}
            placeholder={'Enter your password'}
            password={true}
          />
        </View>
        <TouchableOpacity style={styles.Fpassword}>
          {/* <Text>Forgot Password?</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.singIn, styles.shadowOpt]}
          onPress={ loginHandler }>
          <Text style={styles.singupText}>Sign In</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <Text >
            Create a account .
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registeration')}>
            <Text
              style={{
                color: colors.black,
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              Registration
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </Screen>
  

  );
}

const styles = StyleSheet.create({
  outContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    padding:5,
  },
  image: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    flex: 1.5,
    padding: 5,
    margin: 5,
    alignItems: 'center',
  },
  lastContainer: {
    flex:2.5,
    alignItems  :'center',
    justifyContent:'center',
    backgroundColor:  colors.light,
    borderRadius: 7,
  },

  signin: {
    fontSize: 24,
    color: 'black',
    marginVertical: 10,
    fontWeight:'800',
  },

  Fpassword: {
    width: '90%',
    alignItems: 'flex-end',
    marginVertical: 10,
  },

  singIn: {
    width: '80%',
    height: 40,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    borderRadius: 5,
  },

  singupText: {
    color: 'white',
    fontWeight: 'bold',
  },
  shadowOpt:{
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default SignIn;
