import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import MessageList from './screens/MessageList';
import MapsScreen from './screens/MapsScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';

const AppTabNavigator = createBottomTabNavigator(
  {
    MessageList: {
      screen: MessageList,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => 
          <Icon name="sms" size={26} color={tintColor} />
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => 
          <Icon name="users" size={26} color={tintColor} />
      }
    },
    Maps: {
      screen: MapsScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => 
          <Icon 
            name="map-marked-alt" 
            size={26} 
            color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => 
          <Icon name="user" size={26} color={tintColor} solid/>
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false
    }
  }
)

const AppStack = createStackNavigator({ 
  Tab: AppTabNavigator,
  Chat:ChatScreen
}, {
  defaultNavigationOptions: {
    header: null
  } 
});

const AuthStack = createStackNavigator({ 
  Login: LoginScreen, 
  Register:RegisterScreen,
  },{
    defaultNavigationOptions: {
      header: null
    } 
  }
);

const Router= createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(Router);