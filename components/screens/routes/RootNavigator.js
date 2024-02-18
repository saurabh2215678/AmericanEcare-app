import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouteName from './RouteName';
import { colorsset } from '../utils';
import { View, TouchableOpacity, } from "react-native";
import Style from '../styles/CommonStyle/Style';
import IconL from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

import Splash from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import VideoCallScreen from '../components/commonComponents/VideoCallScreen/VideoCallScreen';
import AudioCall from '../components/commonComponents/VideoCallScreen/AudioCall';
import EndCallScreen from '../components/commonComponents/VideoCallScreen/EndCallScreen';
import {LoginScreen, RegisterScreen, OtpVeryfiveScreen,RegistrationSuccessful, LoginandPatientTab,EditProfile, ChnagePassword,ThankYouScreens, ReviewsScreen,SaveCardScreen, PayNowScreen,
  DrawerListingScreenn, ChartScreen,DrawerChartScreen, DrawerHelpScreen,DoctoreDetailesScreen, Doctoremapscreen, NewsDetailesScreen, DrawerNewsScreen, ExerciseDetail, PaymentScreen,
  ThankYouScreen, AudioCallandVideocall,TabContactUs, ExerciseTab, TabNotification, TabProfile
} from '../screens';

const RootNavigator = props => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name={RouteName.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={RouteName.REGISTER_SCREEN} component={RegisterScreen} />
        <Stack.Screen name={RouteName.HOME_SCREEN} component={TabNavigator} />
        <Stack.Screen name={RouteName.EXERCISE_DETAIL} component={ExerciseDetail} />
        <Stack.Screen name={RouteName.CHANGE_PASSWORD} component={ChnagePassword} />
        <Stack.Screen name={RouteName.EDIT_PROFILE} component={EditProfile} />
        <Stack.Screen name={RouteName.PAYMENT} component={PaymentScreen} />
        <Stack.Screen name={RouteName.THANK_YOU} component={ThankYouScreen} />
        <Stack.Screen name={RouteName.VIDEOCALL} component={VideoCallScreen} />
        <Stack.Screen name={RouteName.AUDIOCALL_SET} component={AudioCall} />
        <Stack.Screen name={RouteName.REGIATRAION_SUCCESSFULL} component={RegistrationSuccessful} />
        <Stack.Screen name={RouteName.THANKS_SCREEN} component={ThankYouScreens} />
        <Stack.Screen name={RouteName.REVIEWS_SCREEN} component={ReviewsScreen} />
        <Stack.Screen name={RouteName.AUDIOCALL_VIDEOCALL} component={AudioCallandVideocall} />
        <Stack.Screen name={RouteName.CONTACT_TAB} component={TabContactUs} />
        <Stack.Screen name={RouteName.END_CALL} component={EndCallScreen} />
        <Stack.Screen name={RouteName.SAVECARD_SCREEN} component={SaveCardScreen} />
        <Stack.Screen name={RouteName.PAYNOW_SCREEN} component={PayNowScreen} />
        <Stack.Screen name={RouteName.DRAWER_EXCERSIE} component={ExerciseTab} />
        <Stack.Screen name={RouteName.DRAWER_NOTIFICATION} component={TabNotification} />
        <Stack.Screen name={RouteName.CHART_DOCTORE_SCREEN} component={DrawerChartScreen} />
        <Stack.Screen name={RouteName.DRAWER_HELP_SCREEN} component={DrawerHelpScreen} />
        <Stack.Screen name={RouteName.DOCTORE_DETAILES_SCREEN} component={DoctoreDetailesScreen} />
        <Stack.Screen name={RouteName.DOCTORE_MAP_LOCATIONS} component={Doctoremapscreen} />
        <Stack.Screen name={RouteName.DRAWER_NEWS_SCREEN} component={DrawerNewsScreen} />
        <Stack.Screen name={RouteName.DRAWER_NEWS_DETAILES_SCREEN} component={NewsDetailesScreen} />
        <Stack.Screen options={{
          headerShadowVisible: false,
          title: 'Dr.Geeta Thakor', headerShown: true,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            color: colorrdata,
          },
          headerTintColor: colorrdata,
          headerStyle: {
            backgroundColor: colorsset.theme_backgound_second,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerRight: () => {
            const navigation = useNavigation();
            return (
              <View style={Style.minviewtwoiconcall}>
                <TouchableOpacity onPress={() => navigation.navigate(RouteName.AUDIOCALL_SET)} style={[Style.seticongbgoclor, { backgroundColor: colorrdata }]}>
                  <IconL name="call" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(RouteName.VIDEOCALL)} style={[Style.seticongbgoclor, { backgroundColor: colorrdata }]}>
                  <IconF name="video" size={15} color="white" />
                </TouchableOpacity>
              </View>
            );
          }
        }} name={RouteName.CHART_SCREEN_PERSON} component={ChartScreen} />
        <Stack.Screen name={RouteName.LOGIN_PATINT_TAB_SCREEN} component={LoginandPatientTab} />
        <Stack.Screen name={RouteName.OTP_VERYFY_SCREEN} component={OtpVeryfiveScreen} />
        <Stack.Screen name={RouteName.DRAWER_LISTING_SCREEN} component={DrawerListingScreenn} />
        <Stack.Screen name={RouteName.TAB_PROFILE_SCREEN} component={TabProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;