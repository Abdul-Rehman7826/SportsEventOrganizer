import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Pressable, View, TextInput, Keyboard, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import Input from "../../components/Input";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import useLocation from "../../hooks/useLocation";
import AppPicker from '../../components/Picker';
import ImageInput from '../../components/ImageInput';

import { AuthContext } from '../../store/auth-context';
import LoadingOverlay from "../../components/ui/LoadingOverlay";
import { supabase } from "../../lib/supabase";
import ActivityIndicator from "../../components/ActivityIndicator";

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "cricket",
    label: "Cricket",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "tennis",
    label: "Tennis",
    value: 2,
  },
  {
    backgroundColor: "#7ed335",
    icon: "hockey-sticks",
    label: "Hockey",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "soccer",
    label: "Football",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "volleyball",
    label: "Volleyball",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "basketball",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "weight-lifter",
    label: "Gymnastics",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "table-tennis",
    label: "Table tennis",
    value: 8,
  },
  {
    backgroundColor: "#7373ff",
    icon: "bicycle",
    label: "Cycling",
    value: 9,
  },
];


function postEditScreen({ navigation }) {
  // const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [eventTitle, setEventTitle] = useState();
  const [category, setCategory] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [imageUrl, setImageurl] = useState('');
  const [description, setDescription] = useState('');

  const authCtx = useContext(AuthContext);
  // console.log("user.id :: ", authCtx.user.id);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setEventDate(moment(date).format("DD-MM-YYYY"));
    // console.log('Date of event date :: ', eventDate);
    hideDatePicker();
  };

  const insertEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').insert([
      {
        eventTitle,
        category: category.label,
        eventDate,
        imageUrl,
        description,
        owner_id: authCtx.user.id
      },
    ])
    if (!error) console.log("Data Saved::", data)
    if (error) console.log(error.message);
    setLoading(false);
  };

  useEffect(() => {
  }, [])

  return (
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />
      <View style={styles.Inputcontainer}>
        <Input
          label={'Title'}
          placeholder={'Enter Title'}
          value={eventTitle}
          onChangeText={(text) => {
            console.log(eventTitle);
            setEventTitle(text);
          }}
        />
        <View style={{ flexDirection: 'row' }} >
          <View style={{ width: '50%', padding: 5 }}>
            <Text style={styles.textInput} >Category</Text>
            <AppPicker
              icon={category}
              selectedItem={category}
              items={categories}
              placeholder={'Select..'}
              onSelectItem={(e) => setCategory(e)} />
          </View>
          <View style={{ width: '50%', padding: 5 }}>
            <Text style={styles.textInput}>Date </Text>
            <Pressable onPress={showDatePicker} style={styles.chooes}>
              <TextInput
                id='eventDate'
                value={eventDate}
                placeholder="select..."
                placeholderTextColor={colors.primary100}
                onPressIn={showDatePicker}
                style={{
                  fontSize: 18,
                  fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
                }}
              />
              <Ionicons name="chevron-down-circle" size={24} color={colors.primary500} />
            </Pressable>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <ImageInput imageUri={imageUrl} onChangeImage={(e) => setImageurl(e)} />
        </View>
        <View style={{ borderWidth: 1, marginVertical: 5, borderRadius: 5, borderColor: colors.primary500 }} >
          <TextInput
            id='description'
            multiline
            maxLength={40}
            numberOfLines={4}
            placeholder={'Enter Description'}
            placeholderTextColor={colors.primary100}
            value={description}
            editable
            onChangeText={(text) => setDescription(text)}
            style={{
              height: 100, padding: 10, backgroundColor: colors.white, borderRadius: 5, fontSize: 18,
              fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
        <TouchableOpacity
          style={[styles.cancel, styles.shadowOpt]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity

          style={[styles.save, styles.shadowOpt]}
          onPress={() => insertEvent()}>
          <Text style={styles.saveText}>save</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imageContainer: {

    alignItems: 'center',
  },
  Inputcontainer: {

  },
  buttoncontainer: {

  },
  textInput: {
    color: colors.primary500,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 5,

  },
  chooes: {
    padding: 8,
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary500,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  save: {
    width: '30%',
    height: 40,
    backgroundColor: colors.primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cancel: {
    width: '30%',
    height: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
  cancelText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  shadowOpt: {
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
export default postEditScreen;
