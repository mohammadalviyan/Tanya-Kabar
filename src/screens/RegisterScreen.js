import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {Auth,Db} from '../Config/Config';
import logo from '../assets/image/cat.png';
import {Item, Input, Label,Button,Thumbnail,Toast } from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import { setUser } from '../redux/actions/user';

export default function RegisterScreen(props) {
  const [input, setInput] = useState({ 
    name: "", 
    email: "",
    password:"",
    job: "Fullsnack Developer",
    latitude:"",
    longitude:"",
    errorMessage: null
  });

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
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  //SUBMIT DATA
  const submitForm =async () =>{
    await getLocation()
    Auth.createUserWithEmailAndPassword(input.email.trim(), input.password)
      .then(async result => {

        let userPro = Auth.currentUser;
        await userPro.updateProfile({
          displayName:input.name,
        });

        dispatch(setUser(
          result.user.uid, 
          result.user.displayName,
          result.user.email,
          input.job
        ))

        //INSERT DATABASE USER
        await Db.ref('users/' + result.user.uid)
        .set({
          id: result.user.uid,
          name: input.name,
          email: input.email,
          password: input.password,
          job: input.job,
          latitude:input.latitude,
          longitude:input.longitude
          })  
         
        props.navigation.navigate('App');
      })
      .catch(error => {
        Toast.show({
          text: error.message,
          buttonText: "Okay",
          type: "danger"
        })
        console.log(error)
      });
  }

  useEffect( ()=>{
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
                setInput({...input,latitude:position.coords.latitude,longitude:position.coords.longitude}); 
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
  },[])

  return(
    <View style={{padding:40,paddingTop:20}}>
      <View style={{alignItems:'center'}}>
      <Text style={{fontSize:30,fontWeight:'bold',color:'#57BFE6', marginBottom: 15}}>
          Tanya <Text style={{fontSize:30,fontWeight:'bold',color:'#3F3D56'}}>Kabar</Text>
      </Text>
      <Thumbnail source={logo} style={{width:220,height:190}} />
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
      <Button  onPress={submitForm} style={{backgroundColor:'#3F3D56',justifyContent:'center',marginTop:20,
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