import React from 'react';
import {StyleSheet} from  'react-native';

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      input:{
        padding:10,
        borderWidth:1,
        borderColor:'#ccc',
        width:'80%',
        marginBottom:5,
        borderRadius:15
      },
      btnText:{
        color:'darkblue',
        fontSize:20
      },
      // Signin
      containerSignin:{
        flex:1,
        backgroundColor:'white',
        padding:40
      },
      
})

export default styles;