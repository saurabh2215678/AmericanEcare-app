import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerNavigator from "./srcz/navigation/DrawerNavigator";

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Dashboard from './src/screens/Dashboard';
//import DrawerNavigationRoutes from './src/screens/DrawerNavigationRoutes';
//import Signup from './Screens/Signup';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AmericanEcare" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login}  options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register}  options={{headerShown:false}}/>
        <Stack.Screen name="Dashboard" component={Dashboard}  options={{headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}