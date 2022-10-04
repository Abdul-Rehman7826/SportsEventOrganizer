import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';

import DropDown from './DropDown';

// get data from this URL!
const movieURL = 'https://reactnative.dev/movies.json';

const articalURL = 'https://jsonplaceholder.typicode.com/posts?_limit=20';

const Display = props => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(props.data);
  const [jsondata, setJsonData] = useState([]);
  // const [incrementVal, setIncrementVal] = useState(0);
  const [disMeasured, setDisMeasured] = useState(0);
  const [lastValue, setLastValue] = useState(0);
  const [newValue, setNewValue] = useState(0);

  const _fetchMovies = () => {
    fetch(movieURL)
      .then(response => response.json()) // get response, convert to json
      .then(json => {
        setData(json.movies);
      })
      .catch(error => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  };

  const _fetchArticals = () => {
    fetch(articalURL)
      .then(response => response.json())
      .then(json => setJsonData(json))
      .catch(error => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  };

  // // similar to 'componentDidMount', gets called once
  useEffect(() => {
    _fetchMovies();
    _fetchArticals();
  }, []);

  // let disMeasured = incrementVal;
  // let lastValue = 0;
  // let newValue = 0;

  const increment = () => {
    if (lastValue == 0) {
      setLastValue(disMeasured)
    }
      // alert(lastValue);

    if (disMeasured >= (lastValue + 1) && disMeasured <= (lastValue + 5)) {
      setNewValue(disMeasured)
      setLastValue(disMeasured)
      // newValue = disMeasured;
      // lastValue = disMeasured;
      alert('if executed')
    } 
    // else if (disMeasured == (lastValue - 1) || disMeasured > (lastValue - 5)) {
    //   newValue = disMeasured;
    //   lastValue = disMeasured;
    // }
  };

  // setIncrementVal(newValue);

  // console.log('incrementVal>>', incrementVal);
  console.log('disMeasured>>', disMeasured);
  console.log('lastValue>>', lastValue);
  console.log('newValue>>', newValue);
  return (
    <View>
      <Text>Display Screen</Text>

      <DropDown data={data} />

      <DropDown data={jsondata} />

      <TextInput
        onChangeText={setDisMeasured}
        // value={incrementVal}
        style={{
          borderWidth: 2,
          width: '80%',
          marginHorizontal: 20,
          marginVertical: 20,
        }}
        placeholder={'Enter increment Value'}
      />

      <Button title="Increment" onPress={increment} />

      <Text
        style={{
          color: 'black',
          fontSize: 24,
          marginVertical: 10,
        }}>
        newValue ={newValue}
      </Text>

      {/* <View>
        {jsondata.map((val, i) => {
          return <Text key={String(i)}>{val.articles}</Text>;
        })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
    fontWeight: '200',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '200',
    color: 'green',
  },
});

export default Display;
