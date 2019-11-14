import React,{useState,useEffect} from 'react';
import {View,Dimensions,Text,SafeAreaView,TextInput,TouchableOpacity} from 'react-native';
import styles from '../constants/styles';
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

ChatScreen.navigationOptions=({navigation})=>{
    return{
        title:navigation.getParam('name',null)
    }
}

export default function ChatScreen(props) {
    const [person, setPerson]=useState({
        name:props.navigation.getParam('name'),
        id:props.navigation.getParam('id'),
        textMessage: ''
    })

    const [message,setMessageList]=useState({
        messageList:[]
    })

    const getMessage=async()=>{
        const name = await AsyncStorage.getItem('name');
        firebase.database().ref('messages')
        .child(name)
        .child(person.name)
            .on('child_added',(value)=>{
                setMessageList((prevState)=>{
                return{
                    messageList:[...prevState.messageList,value.val()]
                }
            })
        })
    }

    useEffect(()=>{
        getMessage()
    },[])

   const handleChange=key=>val=>{
        setPerson({ ...person, [key]: val });
    }

   const convertTime=(time)=>{
        let d=new Date(time);
        let c= new Date();
        let result=(d.getHours()<10 ? '0':'')+d.getHours()+':';
        result +=(d.getMinutes()<10?'0':'')+d.getMinutes();
        if(c.getDay()!==d.getDay()){
            result=d.getDay()+''+d.getMonth()+''+result;
        }
        return result;
    }

    const sendMessage=async()=>{
        const name = await AsyncStorage.getItem('name');
        if(person.textMessage.length>0){
            let msgId=firebase.database().ref('message').child(name).child(person.name).push().key;
            let updates={};
            let message={
                message:person.textMessage,
                time:firebase.database.ServerValue.TIMESTAMP,
                from:person.name
            }
            updates['messages/'+name+'/'+person.name+'/'+msgId]=message;
            updates['messages/'+person.name+'/'+ name+'/'+msgId]=message;
            firebase.database().ref().update(updates);
            setPerson({ ...person, textMessage: '' });
        }
    }

    renderRow=({item})=>{
        const name = AsyncStorage.getItem('name');
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf:item.from==person.name?'flex-end':'flex-start',
                backgroundColor:item.from===person.name?'#00897b':'#7cb324',
                borderRadius:5,
                marginBottom:10 
            }}>
                <Text style={{color:'#fff',padding:7,fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color:'#eee',padding:3,fontSize:12}}>
                    {convertTime(item.time)}
                </Text>
            </View>
        )
    }

    let {height,width}=Dimensions.get('window');
    return(
        <SafeAreaView>
            <FlatList
                style={{padding:10,height:height*0.8}}
                data={message.messageList}
                renderItem={renderRow}
                keyExtractor={(item, index)=>index.toString()}
            />
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    value={person.textMessage}
                    onChangeText={handleChange('textMessage')}
                />
                <TouchableOpacity onPress={sendMessage} style={{paddingBottom:10,marginLeft:5}}>
                    <Text style={styles.btnText}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}