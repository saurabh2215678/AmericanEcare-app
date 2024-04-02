import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, createNavigationContainerRef, useNavigation } from "@react-navigation/native";
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
import PastSurgeryScreen from "./components/screens/patientVisit/PastSurgeryScreen";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import AllergyScreen from "./components/screens/patientVisit/AllergyScreen";
import DiagnosisScreen from "./components/screens/patientVisit/DiagnosisScreen";
import MedicalHistoryScreen from "./components/screens/patientVisit/MedicalHistoryScreen";
import PatientSocialHistory from "./components/screens/patientVisit/PatientSocialHistory";
import ObgynHistory from "./components/screens/patientVisit/ObgynHistory";
import FamilyHistory from "./components/screens/patientVisit/FamilyHistory";
import VitalHistory from "./components/screens/components/VitalHistory";
import PatientDocuments from "./components/screens/patientVisit/PatientDocuments";
import SelectProviderScreen from "./components/screens/patientVisit/SelectProviderScreen";
import ReasonScreen from "./components/screens/patientVisit/ReasonScreen";
import SymptomsScreen from "./components/screens/patientVisit/SymptomsScreen";
import VitalScreen from "./components/screens/patientVisit/VitalScreen";
import DocumentScreen from "./components/screens/patientVisit/DocumentScreen";
import TermScreen from "./components/screens/patientVisit/TermScreen";
import PaymentScreen from "./components/screens/patientVisit/PaymentScreen";
import CardScreen from "./components/screens/patientVisit/CardScreen";
import ThankyouScreen from "./components/screens/patientVisit/ThankyouScreen";
import ChangePasswordScreen from "./components/screens/ChangePasswordScreen";
import InsuranceScreenSide from "./components/screens/patientVisit/InsuranceScreenSide";
import MedicalHistoryScreenSide from "./components/screens/patientVisit/MedicalHistoryScreenSide";
import MedicationScreenSide from "./components/screens/patientVisit/MedicationScreenSide";
import AllergyScreenSide from "./components/screens/patientVisit/AllergyScreenSide";
import DependentScreenSide from "./components/screens/patientVisit/DependentScreenSide";
const Drawer = createDrawerNavigator();


const NewDrawerNavigator = ({header}) => {
  const navigation = useNavigation();
  const [headerShown, setHeaderShown] = useState(header);

  const NonHeaderRoutes = ['DateAndTimeScreen', 'SelectProviderScreen', 'ReasonScreen', 'SymptomsScreen', 'MedicalHistoryScreen', 'MedicationScreen', 'AllergyScreen', 'VitalScreen', 'DocumentScreen', 'InsuranceScreen', 'TermScreen', 'PaymentScreen', 'CardScreen']

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRouteName = navigation.getCurrentRoute().name;
      if(currentRouteName == "Home"){
        setHeaderShown(true);
        
      }
      if(!currentRouteName){
        setHeaderShown(true);
      }
      if(NonHeaderRoutes.find((a)=>a == currentRouteName)){
        setHeaderShown(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{flex: 1, paddingBottom: 0}}>
      <Drawer.Navigator screenOptions={{ headerShown: headerShown }} drawerContent={(props) => <CustomSidebarMenu {...props} />}  drawerStyle={{ paddingBottom: 20 }}>
        <Drawer.Screen name="DashboardScreen" component={HomeTabNavigator} />
        <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Drawer.Screen name="DemographicScreen" component={DemographicScreen} />
        <Drawer.Screen name="DependentScreen" component={DependentScreen} />
        <Drawer.Screen name="DependentScreenSide" component={DependentScreenSide} />
        <Drawer.Screen name="ImmunizationScreen" component={ImmunizationScreen} />
        <Drawer.Screen name="InsuranceScreen" component={InsuranceScreen} />
        <Drawer.Screen name="InsuranceScreenSide" component={InsuranceScreenSide} />
        <Drawer.Screen name="Home" component={HomeTabNavigator} />
        <Drawer.Screen name="DateAndTimeScreen" component={DateAndTimeScreen} />
        <Drawer.Screen name="ScheduleScreen" component={ScheduleScreen} />
        <Drawer.Screen name="MyVisitScreen" component={MyVisitScreen} />
        <Drawer.Screen name="PharmacyScreen" component={PharmacyScreen} />
        <Drawer.Screen name="MedicationScreen" component={MedicationScreen} />
        <Drawer.Screen name="MedicationScreenSide" component={MedicationScreenSide} />
        <Drawer.Screen name="AllergyScreen" component={AllergyScreen} />
        <Drawer.Screen name="AllergyScreenSide" component={AllergyScreenSide} />
        <Drawer.Screen name="PastSurgeryScreen" component={PastSurgeryScreen} />
        <Drawer.Screen name="DiagnosisScreen" component={DiagnosisScreen} />
        <Drawer.Screen name="MedicalHistoryScreen" component={MedicalHistoryScreen} />
        <Drawer.Screen name="MedicalHistoryScreenSide" component={MedicalHistoryScreenSide} />
        <Drawer.Screen name="PatientSocialHistory" component={PatientSocialHistory} />
        <Drawer.Screen name="ObgynHistory" component={ObgynHistory} />
        <Drawer.Screen name="FamilyHistory" component={FamilyHistory} />
        <Drawer.Screen name="VitalHistory" component={VitalHistory} />
        <Drawer.Screen name="PatientDocuments" component={PatientDocuments} />
        <Drawer.Screen name="SelectProviderScreen" component={SelectProviderScreen} />
        <Drawer.Screen name="ReasonScreen" component={ReasonScreen} />
        <Drawer.Screen name="SymptomsScreen" component={SymptomsScreen} />
        <Drawer.Screen name="VitalScreen" component={VitalScreen} />
        <Drawer.Screen name="DocumentScreen" component={DocumentScreen} />
        <Drawer.Screen name="TermScreen" component={TermScreen} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
        <Drawer.Screen name="CardScreen" component={CardScreen} />
        <Drawer.Screen name="ThankyouScreen" component={ThankyouScreen} />
        <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Drawer.Screen name="Login" component={Login} />
      </Drawer.Navigator>
      <Toast style={{zIndex: 99999999999}}/>
    </View>
    );
  };

const AppLayer = () =>{
  const storeUser = useSelector((state) => state.user.userData)
  const storeHeader = useSelector((state) => state.header.value)
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
          {storeUser ? <NewDrawerNavigator header={storeHeader}/> :
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
