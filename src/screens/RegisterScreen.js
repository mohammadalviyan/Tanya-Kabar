import React,{useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {Auth,Db} from '../Config/Config';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/image/LogoOshaburi.png';
import {Form, Item, Input, Label,Button,Thumbnail,Toast } from 'native-base';

export default function RegisterScreen(props) {
    const [input, setInput] = useState({ 
      name: "", 
      email: "",
      password:"",
      job: "Fullsnack Developer",
      errorMessage: null
    });

    const handleChange = key => val =>{
        setInput({...input,[key]:val}); 
    }

  const submitForm =async () =>{
    await Auth.createUserWithEmailAndPassword(input.email.trim(), input.password)
        .then(async result => {
            let userPro = Auth.currentUser;
            await userPro.updateProfile({
                displayName:input.name,
                displayJob: input.job
            });
            await AsyncStorage.setItem('id', result.user.uid);
            await AsyncStorage.setItem('name', input.name);
            await AsyncStorage.setItem('email', result.user.email);
            await AsyncStorage.setItem('job', input.job);
            User.email== result.user.email;
            User.id==result.user.uid;

            //INSERT DATABASE USER
            await Db.ref('users/' + input.name)
            .set({
                id: result.user.uid,
                name: input.name,
                email: input.email,
                password: input.password,
                job: input.job
            })
            .then(async() => {
              props.navigation.navigate('Home');
            });
            
        })
        .catch(error => 
          Toast.show({
            text: error.message,
            buttonText: "Okay",
            type: "danger"
          })
        );
  }

  return(
    <View style={{padding:40,paddingTop:20}}>
      <View style={{alignItems:'center'}}>
      <Thumbnail  source={logo} style={{width:200,height:150}} />
      <Text style={{fontSize:30,fontWeight:'bold',color:'#57BFE6'}}>
            Oshabiru
          </Text>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#4D535F'}}>
            オシャビル
          </Text>
      </View>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Name</Label>
        <Input 
          value={input.name}
          onChangeText={handleChange('name')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Email</Label>
        <Input 
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:6}}>
        <Label>Password</Label>
        <Input 
          secureTextEntry={true}
          value={input.password}
          onChangeText={handleChange('password')}
        />
      </Item>
      <Button  onPress={submitForm} style={{backgroundColor:'#57BFE6',justifyContent:'center',marginTop:20,
        alignItems:'center',}}>
          <Text style={{fontWeight:'bold', color: '#fff'}}>
            Register
          </Text>
        </Button>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
            <Text style={{fontSize:15,marginTop:30, color: '#4D535F'}}>
              Already have an account?
              <Text style={{fontWeight:'bold',color:'#57BFE6'}}> Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}