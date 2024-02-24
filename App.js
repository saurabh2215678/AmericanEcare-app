import React, { useEffect } from "react";
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
import Login from "./components/screens/Login";
const Drawer = createDrawerNavigator();

console.log('h')
function Root() {
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="DashboardScreen" component={HomeTabNavigator} />
      <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </Drawer.Navigator>
  );
}

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
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
      <Toast style={{zIndex: 99999}}/>
    </View>
    );
  };

export default function App() {
  return (
    <>
    <NavigationContainer style={{paddingBottom: 10}}>
        <NewDrawerNavigator/>
        {/* <StackNavigator /> */}
    </NavigationContainer>
    {/* <StackNavigator /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
