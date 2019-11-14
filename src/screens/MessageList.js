import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Auth,Db} from '../Config/Config';

export default function MessageList(props) {
  const [users, setUsers] = useState({ 
    userslist: [],
    id: '',
  });

  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
  }); 
  //Get All Users
  const getAllUser = async() => {
    const value = await AsyncStorage.getItem('id');

    Db.ref('users').on('value', result => {
      let data = result.val();
      if (data !== null) {
        let allusers = Object.values(data);
        const filteredUser = allusers.filter(
            user => user.id !== value,
        );
          setUsers({users,userslist:filteredUser});
      }
    });
  };

  //Action Get All Users
  useEffect( ()=>{
      getAllUser()
  },[])

  renderRow =({item})=>{
    return(
      <TouchableOpacity 
        onPress={()=>props.navigation.navigate('Chat',item)}
        style={{padding:10,borderBottomColor:'#ccc',borderBottomWidth:1}}>
        <Text style={{fontSize:20}}>
            {item.name}
        </Text>
      </TouchableOpacity>
    )
  }
  return(
    <SafeAreaView>
      <FlatList
        data={users.userslist}
        renderItem={renderRow}
        keyExtractor={(item)=>item.id}
      />
    </SafeAreaView>
  )
}