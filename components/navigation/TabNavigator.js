import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// import AppointmentScreen from "../screens/AppointmentScreen";
// import BookingScreen from "../screens/BookingScreen";
// import DietScreen from "../screens/DietScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AccountScreen from "../screens/AccountScreen";
import SettingScreen from "../screens/SettingScreen";
import Login from '../screens/Login';
import MyVisitScreen from '../screens/MyVisitScreen';
import CustomSidebarMenu  from '../screens/CustomSidebarMenu';

import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,DrawerItem} from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();




const HomeStackNavigator = () => {
return (
    <Drawer.Navigator  drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
     
    </Drawer.Navigator>
  );
};


const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home-outline";
          }
           else if (route.name === "Profile") {
            iconName = "md-person-outline";
          }
           else if (route.name === "Settings") {
            iconName = "md-settings";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#216afc",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerTitle: "My Profile Section",
          headerTitleAlign: "center",
        }}
      />

       <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      
     
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
