import React,{useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView ,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Auth,Db} from '../Config/Config';

    HomeScreen.navigationOptions=({navigation})=>{
        return{
            title:'Chats',
            headerRight:(
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                    <Image source={{uri:'https://instagram.fjog3-1.fna.fbcdn.net/vp/244d4d9ec903d34fcadd4b0b2f9a09eb/5E5CAC06/t51.2885-15/sh0.08/e35/s640x640/74661227_136879711053702_8974505103939330289_n.jpg?_nc_ht=instagram.fjog3-1.fna.fbcdn.net&_nc_cat=106'}} 
                    style={{width:32,height:32,marginRight:7}}/>
                </TouchableOpacity>
            )

        }
    }

export default function HomeScreen(props) {

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

