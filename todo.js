import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {List} from 'react-native-paper';
import { Alert, StyleSheet } from 'react-native';

export default function Todo({id, title, complete}) {
  async function toggleComplete() {
    await firestore().collection('todos').doc(id).update({complete: !complete});
  }
  async function deleteItem() {
   await Alert.alert(
     "Thông báo",
      'bạn có muốn xoá công việc này',
      [
        {
          text: 'Huỷ',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
           firestore().collection('todos').doc(id).delete()}
        },
      ],
      { cancelable: false }
    );
   
  }
  var styles = StyleSheet.create({
    itemStyle:{
      borderRadius: 12, 
      backgroundColor: complete ? 'lightgreen' : 'lightgray',
      marginTop: 5,
      padding:5
      
    },
  })
  return (
    <List.Item
      title = {title}
      style={styles.itemStyle}
      onLongPress={()=> deleteItem()}
      onPress = {() => toggleComplete()}
      left = {props => (
        <List.Icon {...props} icon = {complete ? 'check' : 'cancel'} />
      )}
    />
  );
  
}
