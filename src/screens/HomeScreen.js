import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView ,
  Image
} from 'react-native';
import {Auth,Db} from '../Config/Config';

export default function HomeScreen(props) {

  const [users, setUsers] = useState({ 
      userslist: [],
      id: '',
  });

  const Profiluser = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  //Action Get All Users
  useEffect( ()=>{
    if(typeof Profiluser.id !== "undefined"){ 
      Db.ref('users').on('value', result => {
        let data = result.val();
        if (data !== null) {
          let allusers = Object.values(data);
          const filteredUser = allusers.filter(
              users => users.id !== Profiluser.id,
          );
          setUsers({users,userslist:filteredUser});
        }
      });
    } 
  },[Profiluser])

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
    <View>
      <View style={{backgroundColor: '#57BFE6'}}>
        <Text style={{marginTop: 20,marginBottom: 10, paddingHorizontal: 10, fontSize: 20, color: '#fff'}}>Friend List</Text>
      </View>
      <SafeAreaView>
        <FlatList
          data={users.userslist}
          renderItem={renderRow}
          keyExtractor={(item)=>item.id}
        />
      </SafeAreaView>
    </View>
  )
}