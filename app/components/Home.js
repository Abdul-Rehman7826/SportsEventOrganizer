//import liraries
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment, submit} from '../store/action';
import numbro from 'numbro';
import TextInputMask from 'react-native-text-input-mask';

// create a component
const Home = ({navigation}) => {
  const number = useSelector(state => state.num);
  const Name = useSelector(state => state.name);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  const onAdd = () => {
    dispatch(increment(number));
  };

  const onDec = () => {
    dispatch(decrement(number));
  };

  const onSubmit = () => {
    dispatch(submit(name));
  };
  const calculate = val => {
    // let new_text = [...text]
    // new_text = numbro(val).format({thousandSeparated: true});

    setText(numbro(val).format({thousandSeparated: true}));
  };
  // setText2(new_text);

  var string = numbro(5156151).format({thousandSeparated: true});

  console.log('test>>>>>>>>>>', string);

  // Number

  // const numb = 1251215613456.789;
  // console.log(numb.toLocaleString('en-US')); // output: 123 456,789

  const mask = '[000],[000],[000]';

  return (
    <View style={styles.container}>
      <Text>{number}</Text>

      <Button title="ADD" onPress={onAdd} />

      <Button title="DEC" onPress={onDec} />

      <TextInput value={name} onChangeText={setName} style={styles.textInput} />
      <Button title="submit" onPress={onSubmit} />
      <Text>{Name}</Text>
      <View style={styles.btn}>
        <Button
          title="display Screeen"
          onPress={() => navigation.navigate('Display')}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Wheel Picker Screen"
          onPress={() => navigation.navigate('Wheel Picker')}
        />
      </View>
      {/* <Button
        title="dropdown Screeen"
        onPress={() => navigation.navigate('DropDown')}
      /> */}

      <TextInput
        style={styles.input}
        onChangeText={val => calculate(val)}
        value={text}
        placeholder="useless placeholder"
        // keyboardType="numeric"
      />
      <Text>{text}</Text>

      <TextInputMask
        onChangeText={(formatted, extracted) => {
          console.log(`Formatted: ${formatted}`); // +1 (123) 456-7890
          console.log(`Extracted: ${extracted}`); // 1234567890
        }}
        style={styles.maskedInput}
        mask={mask}
        placeholder={mask}
        keyboardType="numeric"
        placeholderTextColor="grey"
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    borderRadius: 10,
    margin: 10,
    borderWidth: 2,
  },
  btn: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: '70%',
  },
  maskedInput: {
    borderWidth: 2,
    borderRadius: 6,
    width: '80%',
    padding: 12,
    color: 'black',
    fontSize: 20,
  },
});

//make this component available to the app
export default Home;
