import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from "./components/navigation/StackNavigator";
import DrawerNavigator from "./components/navigation/StackNavigator";
import { Text } from "react-native";
import EditProfileScreen from './components/screens/EditProfileScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import CustomSidebarMenu from "./components/screens/CustomSidebarMenu";
import DemographicScreen from "./components/screens/myprofile/DemographicScreen";
import HomeTabNavigator from "./components/navigation/TabNavigator";
import { View } from "react-native";
import DependentScreen from "./components/screens/patientVisit/DependentScreen";
import InsuranceScreen from "./components/screens/patientVisit/InsuranceScreen";
import ImmunizationScreen from "./components/screens/patientVisit/ImmunizationScreen";
import Toast from 'react-native-toast-message';
import DateAndTimeScreen from "./components/screens/patientVisit/DateAndTimeScreen";
import ScheduleScreen from "./components/screens/patientVisit/ScheduleScreen";
import MyVisitScreen from "./components/screens/MyVisitScreen";
import PharmacyScreen from "./components/screens/patientVisit/PharmacyScreen";
import Login from "./components/screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from 'react-redux';
import store from './components/store/index';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from "./components/store/userSlice";
import MedicationScreen from "./components/screens/patientVisit/MedicationScreen";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import AllergyScreen from "./components/screens/patientVisit/AllergyScreen";
const Drawer = createDrawerNavigator();


const NewDrawerNavigator = () => {

  return (
    <View style={{flex: 1, paddingBottom: 0}}>
      <Drawer.Navigator  drawerContent={(props) => <CustomSidebarMenu {...props} />}  drawerStyle={{ paddingBottom: 20 }}>
        <Drawer.Screen name="DashboardScreen" component={HomeTabNavigator} />
        <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Drawer.Screen name="DemographicScreen" component={DemographicScreen} />
        <Drawer.Screen name="DependentScreen" component={DependentScreen} />
        <Drawer.Screen name="ImmunizationScreen" component={ImmunizationScreen} />
        <Drawer.Screen name="InsuranceScreen" component={InsuranceScreen} />
        <Drawer.Screen name="Home" component={HomeTabNavigator} />
        <Drawer.Screen name="DateAndTimeScreen" component={DateAndTimeScreen} />
        <Drawer.Screen name="ScheduleScreen" component={ScheduleScreen} />
        <Drawer.Screen name="MyVisitScreen" component={MyVisitScreen} />
        <Drawer.Screen name="PharmacyScreen" component={PharmacyScreen} />
        <Drawer.Screen name="MedicationScreen" component={MedicationScreen} />
        <Drawer.Screen name="AllergyScreen" component={AllergyScreen} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
      <Toast style={{zIndex: 99999999999}}/>
    </View>
    );
  };

const AppLayer = () =>{
  const storeUser = useSelector((state) => state.user.userData)
  const dispatch = useDispatch();

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user_data");
    dispatch(logIn(JSON.parse(user)));
  }

  useEffect(()=>{
      getUser();
  },[]);


  return(
    <AutocompleteDropdownContextProvider>
      <NavigationContainer style={{paddingBottom: 10}}>
          {storeUser ? <NewDrawerNavigator/> :
          <StackNavigator />}
      </NavigationContainer>
    </AutocompleteDropdownContextProvider>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <AppLayer/>
    {/* <StackNavigator /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
