// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const DrawerNavigator = () => {

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

 return (
    <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
