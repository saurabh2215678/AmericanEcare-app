import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Login from '../screens/Login';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPScreen from '../screens/OTPScreen';
import SetPassword from '../screens/SetPassword';
import Register from '../screens/Register';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import AccountScreen from '../screens/AccountScreen';
import DateAndTimeScreen from '../screens/patientVisit/DateAndTimeScreen';
import SelectProviderScreen from '../screens/patientVisit/SelectProviderScreen';
import DependentScreen from '../screens/patientVisit/DependentScreen';
import ReasonScreen from '../screens/patientVisit/ReasonScreen';
import SymptomsScreen from '../screens/patientVisit/SymptomsScreen';
import MedicalHistoryScreen from '../screens/patientVisit/MedicalHistoryScreen';
import MedicationScreen from '../screens/patientVisit/MedicationScreen';
import AllergyScreen from '../screens/patientVisit/AllergyScreen';
import PharmacyScreen from '../screens/patientVisit/PharmacyScreen';
import VitalScreen from '../screens/patientVisit/VitalScreen';
import DocumentScreen from '../screens/patientVisit/DocumentScreen';
import InsuranceScreen from '../screens/patientVisit/InsuranceScreen';
import TermScreen from '../screens/patientVisit/TermScreen';
import HippaScreen from '../screens/patientVisit/HippaScreen';
import PaymentScreen from '../screens/patientVisit/PaymentScreen';
import CardScreen from '../screens/patientVisit/CardScreen';
import ScheduleScreen from '../screens/patientVisit/ScheduleScreen';
import ThankyouScreen from '../screens/patientVisit/ThankyouScreen';
import MyVisitScreen from '../screens/MyVisitScreen';
import DemographicScreen from '../screens/myprofile/DemographicScreen';

import Sidebar from '../sidebar'; //

//import Dashboard from '../screens/Dashboard';

import HomeTabNavigator from "./TabNavigator";

// import LoginScreen from "../screens/LoginScreen";
// import HomeTabNavigator from "./TabNavigator";
// import ProfileScreen from "../screens/ProfileScreen";
// import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function Root() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Home" component={Home} />     
    </Drawer.Navigator>
  );
}



const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};


const StackNavigator = () => {
  return (
  
     <Stack.Navigator>
      <Stack.Screen
        name="AmericanEcare"
        component={Home}
        options={{ headerShown: false }}
      />
   
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
       
       <Stack.Screen
        name="DateAndTimeScreen"
        component={DateAndTimeScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="SelectProviderScreen"
        component={SelectProviderScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="DependentScreen"
        component={DependentScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="ReasonScreen"
        component={ReasonScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="SymptomsScreen"
        component={SymptomsScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="MedicalHistoryScreen"
        component={MedicalHistoryScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="MedicationScreen"
        component={MedicationScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AllergyScreen"
        component={AllergyScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PharmacyScreen"
        component={PharmacyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VitalScreen"
        component={VitalScreen}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="DocumentScreen"
        component={DocumentScreen}
        options={{
          headerShown: false,
        }}
      />

     <Stack.Screen
        name="InsuranceScreen"
        component={InsuranceScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TermScreen"
        component={TermScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HippaScreen"
        component={HippaScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CardScreen"
        component={CardScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ThankyouScreen"
        component={ThankyouScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MyVisitScreen"
        component={MyVisitScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="DemographicScreen"
        component={DemographicScreen}
        options={{
          headerShown: false,
        }}
      />

    
       
       
     
    </Stack.Navigator>
  
  );
};

export default StackNavigator;
