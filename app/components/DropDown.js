import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';

function DropDown(props) {
  const [title, setTitle] = useState([]);
  const [dropDown, setDropDown] = useState(false);
  const [selectItem, setSelectItem] = useState(false);

  //   let fruits = [
  //     {id: 1, name: 'mango'},
  //     {id: 2, name: 'apple'},
  //     {id: 3, name: 'banana'},
  //   ];

  const _showList = () => {
    // if (dropDown == true) {
    //   setDropDown(false);
    // } else {
    //   setDropDown(true);
    // }
    // alert(dropDown);
    setDropDown(!dropDown);
  };

  const _selectItem = item => {
    setSelectItem(item);
    // console.log(selectItem.title, selectItem.releaseYear);
    setDropDown(!dropDown);
  };

  //   console.log(props.data);
  return (
    <View
      style={{
        width: '100%',
        padding: 20,
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 5,
          padding: 10,
        }}
        onPress={_showList}>
        <Text>{selectItem ? selectItem.title : 'Choose item from list'}</Text>
      </TouchableOpacity>

      {dropDown && (
        <FlatList
          data={props.data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{paddingBottom: 10}}
              onPress={() => _selectItem(item)}>
              <Text style={styles.movieText}>
                {item.title}, {item.releaseYear}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    // <View>
    //   <View>
    //     {props.data.map(val => {
    //       return <Text>{val.title}</Text>;
    //     })}
    //   </View>
    //   <Text>DropDown</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 48,
  },
  movieText: {
    fontSize: 16,
    // fontWeight: '200',
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
export default DropDown;
