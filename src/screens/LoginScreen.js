import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import User from '../../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/cat.png';
import { setUser } from '../redux/actions/user';
import { setLoading } from '../redux/actions/loading';
import {Form, Thumbnail,Item, Input, Label,Button,Toast,Spinner } from 'native-base';
import Geolocation from 'react-native-geolocation-service';

export default function LoginScreen(props) {
  
  const [input, setInput] = useState({ 
    email: "", 
    password: "",
    job: "Fullsnack Developer",
    latitude:"",
    longitude:""});
  const isLoading = useSelector(state => state.loading.isLoading);
  const dispatch = useDispatch();

  const handleChange = key => val =>{
    setInput({...input,[key]:val}); 
  }

  // GET LOCATION PERMISSIONS //
  const hasLocationPermission = async () => {
    if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
    ) {
    return true;
    }
    const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
    return true;
    }
    const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
    );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
    );
    }
    return false;
  };

  //GET LOCATION
  const getLocation = async () => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
          (position) => {
              setInput({...input,latitude:position.coords.latitude,longitude:position.coords.longitude}); 
          },
          (error) => {
              // See error code charts below.
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  //SUBMIT FORM
  const handleSubmit =async () =>{
    await getLocation()
    Auth.signInWithEmailAndPassword(input.email.trim(), input.password)
    .then(async result => {
        await Db.ref('users/' + result.user.uid).update({
          status: 'Online',
          latitude:input.latitude,
          longitude:input.longitude
        });
        dispatch(setUser(
          result.user.uid, 
          result.user.displayName,
          result.user.email,
          input.job
        ))
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
          disabled={isLoading}
          value={input.email}
          onChangeText={handleChange('email')}
        />
      </Item>
      <Item floatingLabel style={{marginBottom:8}}>
        <Label>Password</Label>
        <Input 
          disabled={isLoading}
          placeholder="Password"
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