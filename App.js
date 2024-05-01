import React from "react";
import firebase from "@react-native-firebase/app"
import firestore from "@react-native-firebase/firestore"
import { Alert, FlatList, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import Todo from "./todo";

const firebaseConfig = {
  apiKey: "AIzaSyBuKrf8RClFMoGvEEiMazg1aGYssEU9gJg",
  projectId: "todoapp-4dd02",
  storageBucket: "todoapp-4dd02.appspot.com",
  messagingSenderId: "273197336657",
  databaseURL: "/todos",
  appId: "1:273197336657:android:787fe1ef568a4287969070"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function App() {
  const[loading, setLoading] = React.useState(true)
  const[todos,setTodos] = React.useState([])
  const[todo,setTodo] = React.useState('')
  const ref = firestore().collection('todos')

    async function addTodo(){
      if(todo != '')
      {
        await ref.add({
          title:todo,
          complete:false,
        });
      }else{
        Alert.alert("Thông báo",'Chưa nhập tên công việc')
      }
     
      setTodo('');
    }
    React.useEffect(()=>{
      return ref.onSnapshot(querySnapshot => {
        const list = []
        querySnapshot.forEach(doc=>{
          const {title, complete} = doc.data()
          list.push({
            id: doc.id,
            title,
            complete,
          })
        })
        setTodos(list)
        if (loading) {
          setLoading(false)
        }
      })
    })
    if (loading){
      return null
    }
    return(
      <View style = {{flex:1}}>
        <Appbar>
          <Appbar.Content title = {'Danh sách công việc'}/>
        </Appbar>
        <FlatList
          style = {{flex:1, margin:15}}
          data = {todos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Todo {...item}/>}
        />
        <TextInput label={'Công việc mới'} 
          value = {todo}
          onChangeText = {(text) =>{
            setTodo(text)
          }
          } />
        <Button icon = 'plus' onPress = {addTodo}>Thêm công việc</Button>
      </View>
    );
}

