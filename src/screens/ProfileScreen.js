import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  StyleSheet, Image, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import User from '../../User';
import firebase from 'firebase'; 
import AsyncStorage from '@react-native-community/async-storage';
import { setUserNull } from '../redux/actions/user';

ProfileScreen.navigationOptions={
  title:'Profile'
}

export default function ProfileScreen(props) {
  const [input, setInput]=useState({name:'', job: ''})

  const Profiluser = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleChange=key=>val=>{
    setInput({...input,[key]:val});
  }

  const changeName= async()=>{
    if(input.name.lenght < 3){
      Alert.alert('Error','Please Enter')
    }else if(User.name !== input.name){
      firebase.database().ref('users').child(User.phone).set({name:input.name});
      User.name=input.name;
      alert.alert('Succes','Changed Name Succesful');
    } 
  }

  const deleteToken = async () => {
    dispatch(setUserNull());
    firebase.auth().signOut();
    props.navigation.navigate('Auth')
  }

  return(
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleBar}>
                  <TouchableOpacity onPress={deleteToken}>
                      <Icon name="sign-out-alt" size={24} color="#4E5460" />
                  </TouchableOpacity>
              </View>

              <View style={{ alignSelf: "center", marginTop: 10 }}>
                  <View style={styles.profileImage}>
                      <Image source={require("../assets/image/bg-register.jpg")} style={styles.image}></Image>
                  </View>
                  <View style={styles.dm}>
                      <Icon name="sms" size={18} color="#fff" style={{ marginTop: 2, marginLeft: 2 }} />
                  </View>
                  <View style={styles.active}></View>
                  <View style={styles.add}>
                      <Icon name="plus" size={32} color="#fff" style={{ marginTop: 4, marginLeft: 2 }} />
                  </View>
              </View>

              <View style={styles.infoContainer}>
                  <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{Profiluser.name}</Text>
                  <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{Profiluser.job}</Text>
              </View>

              <View style={styles.statsContainer}>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                      <Text style={[styles.text, styles.subText]}>Stars</Text>
                  </View>
                  <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                      <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                      <Text style={[styles.text, styles.subText]}>Repositories</Text>
                  </View>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                      <Text style={[styles.text, styles.subText]}>Followers</Text>
                  </View>
              </View>
              <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
              <View style={{ alignItems: "center" }}>
                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                          </Text>
                      </View>
                  </View>

                  <View style={styles.recentItem}>
                      <View style={styles.activityIndicator}></View>
                      <View style={{ width: 250 }}>
                          <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                              Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                          </Text>
                      </View>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 15,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#4E5460",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});