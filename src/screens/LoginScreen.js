import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/cat.png';
import {Form, Thumbnail,Item, Input, Label,Button,Toast } from 'native-base';

export default function LoginScreen(props) {
  const [input, setInput] = useState({ email: "", password: ""});

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
  }

  const handleSubmit =async () =>{
    Auth.signInWithEmailAndPassword(input.email.trim(), input.password)
      .then(async result => {
        await Db.ref('users/' + result.user.uid).update({
          status: 'online',
        });
        await AsyncStorage.setItem('id', result.user.uid);
        await AsyncStorage.setItem('name', result.user.displayName);
        await AsyncStorage.setItem('email', result.user.email);
        await AsyncStorage.setItem('job', result.user.job);
        User.email== result.user.email;
        User.id==result.user.uid

        props.navigation.navigate('App');
      })
      .catch(error => {
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          type: "danger"
        })
    });
  }
  return(
    <View style={styles.containerSignin}>
    <Form>
      <View style={{alignItems:'center'}}>
        <Text style={{fontSize:30,fontWeight:'bold',color:'#57BFE6', marginBottom: 15}}>
          Tanya <Text style={{fontSize:30,fontWeight:'bold',color:'#3F3D56'}}>Kabar</Text>
        </Text>
        <Thumbnail source={logo} style={{width:220,height:190}} />
      </View>
      <Item floatingLabel >
        <Label>Email</Label>
        <Input 
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:8}}>
        <Label>Password</Label>
        <Input 
          placeholder="Email....."
          value={input.password}
          onChangeText={handleChange('password')}
          secureTextEntry={true}
        />
      </Item>
      <Button onPress={handleSubmit} style={{backgroundColor:'#3F3D56',justifyContent:'center',marginTop:20,
      alignItems:'center',}}>
        <Text style={{fontWeight:'bold', color: '#fff'}}>Sign in</Text>
      </Button>
      <View style={{alignItems:'center'}}>
        
      <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
        <Text style={{fontSize:15,marginTop:30, color: '#4D535F'}}>
          Don't have any account?<Text style={{fontWeight:'bold',color:'#57BFE6'}}> Register</Text>
        </Text>
      </TouchableOpacity>
      </View>
      </Form>
    </View>
  )
}