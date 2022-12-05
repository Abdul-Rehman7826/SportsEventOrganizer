import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

async function signup(email, password, phone, fName) {

  try {
    const { data: user, data: session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          phone: phone,
          full_name: fName
        }
      }
    });
    if (error) {
      throw error;
    } else {
      console.log(user);
      console.log(session);
      return user;
    }
  } catch (error) {
    Alert.alert('Authentication error', error.message)
    return;
  }
}

async function ulogin(email, password) {

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw error;
    } else {
      const tokenid = data.session.access_token;
      return { tokenid };
    }
  } catch (error) {
    Alert.alert('Authentication error', error.message)
    return;
  }
}
export function createUser(email, password, phone, fName) {
  return signup(email, password, phone, fName);
}
export function login(email, password) {
  return ulogin(email, password);
}


