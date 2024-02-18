import React from 'react';
import { Text, View, TouchableOpacity,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/EvilIcons';
import TabHome from '../screens/Home/Tab/TabHome';
import CustomSidebarMenu from '../components/commonComponents/CustomSidebarMenu';
import TabExercise from '../screens/Home/Tab/TabExercise';
import TabNotification from '../screens/Home/Tab/TabNotification';
import TabProfile from '../screens/Home/Tab/TabProfile';
import AudioCallandVideocall from '../screens/Home/Tab/AudioCallandVideocall';
import { colorsset ,SF, SH, Strings} from '../utils';
import { useTheme } from '@react-navigation/native';
import images from '../images';
import RouteName from './RouteName';
import Style from '../styles/CommonStyle/Style';
import { useSelector } from "react-redux";
import ColorPicker from '../components/commonComponents/ColorPicker';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerSidebarScreen(props) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomSidebarMenu {...props} />
    </DrawerContentScrollView>
  );
}

function MyDrawer({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerSidebarScreen {...props} />}>
      <Drawer.Screen name="Home"
        component={HomeTabsAll} />
    </Drawer.Navigator>
  );
}

function HomeTabsAll({ navigation }) {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          return null
        },
        tabBarStyle: { backgroundColor: '#fff', height: Platform.OS === 'ios' ? SH(80) : SH(60), },
        tabBarOptions: {
          style: {
            borderTopColor: 'black',
            borderTopWidth: 2,
          },
          // other stuff unrelated:
          labelStyle: {
            marginTop: -7,
          },
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconNametwo;
          let tintColor = colors.pale_sky;
          let name = route.name;
          if (route.name === RouteName.TAB_HOME) {
            iconName = focused ? images.ic_homeF : images.ic_home;
          } else if (route.name === RouteName.TAB_EXERCISE) {
            iconName = focused ? images.Excersizeiconset_set_two : images.Excersizeiconset_set_two;
          } else if (route.name === RouteName.TAB_NOTIFICATION) {
            iconName = focused ? images.ic_notify : images.ic_notifyF;
          } else if (route.name === RouteName.TAB_PROFILE) {
            iconName = focused ? images.ic_profileF : images.ic_profile;
          } else if (route.name === RouteName.AUDIOCALL_VIDEOCALL) {
            iconName = focused ? images.ic_videoF : images.ic_video;
          }
          return (
            <View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Platform.OS === 'ios' ? 33 : 29 }}>
                <Image source={iconName} style={{ width: Platform.OS === 'ios' ? SH(30) : SH(35), tintColor: colorrdata, height: Platform.OS === 'ios' ? SH(25) : SH(30), aspectRatio: 1, resizeMode: 'contain' }} />
                <Image source={iconNametwo} style={{
                  width: Platform.OS === 'ios' ? SH(35) : SH(39), tintColor: colorrdata,
                  height: Platform.OS === 'ios' ? SH(35) : SH(39), aspectRatio: 1, resizeMode: 'contain', position: 'relative', top: -29
                }} />
              </View>
            </View>
          )
        }
      })}>
      <Tab.Screen name={RouteName.TAB_HOME} component={HomeTabScreenStack} />
      <Tab.Screen name={RouteName.TAB_EXERCISE} component={ExcersizeScreenStack} />
      <Tab.Screen name={RouteName.TAB_NOTIFICATION} component={NotificationScreenStack} />
      <Tab.Screen name={RouteName.TAB_PROFILE} component={ProfileScreenStack} />
      <Tab.Screen name={RouteName.AUDIOCALL_VIDEOCALL} component={VidepcallStack} />
    </Tab.Navigator>
  );
}

function Root({ navigation }) {

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{
          title: '',
          headerShown: false
        }}
      />
      <Stack.Screen name="Home" component={HomeTabsAll}
        options={{
          title: '',
          headerShown: false
        }}
      />
    </Stack.Navigator>

  );
}
export default Root;

function HomeTabScreenStack({ navigation }) {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <Stack.Navigator initialRouteName="TabHome">
      <Stack.Screen
        name="TabHome"
        component={TabHome}
        options={{
          title: 'Home', headerShown: true,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            color: 'white',
          },
          headerStyle: {
            backgroundColor: colorrdata,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <IconE style={Style.setbariconmarginright} name="navicon" color={'white'} size={35} />
            </TouchableOpacity>
          ),
          headerRight: () => <TouchableOpacity onPress={() => navigation.navigate(RouteName.AUDIOCALL_VIDEOCALL)} style={Style.flexrowplusicon}>
            <Icon name="plus" style={Style.plusiconstyle} color="white" size={22} />
            <Text style={Style.chiropractorText}>Chiropractor</Text>
            <ColorPicker />
          </TouchableOpacity>,

        }}
      />
    </Stack.Navigator>
  );
}
function ExcersizeScreenStack({ navigation }) {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <Stack.Navigator initialRouteName="TabExercise">
      <Stack.Screen
        name="TabExercise"
        component={TabExercise}
        options={{
          title: 'Exercise', headerShown: true,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            color: colorrdata,
          },
          headerStyle: {
            backgroundColor: colorsset.theme_backgound_second,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
             <IconE style={Style.setbariconmarginright} name="navicon" color={colorrdata}  size={35} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function NotificationScreenStack({ navigation }) {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <Stack.Navigator initialRouteName="TabNotification">
      <Stack.Screen
        name="TabNotification"
        component={TabNotification}
        options={{
          title: 'Notification', headerShown: true,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            color: colorrdata,
          },
          headerStyle: {
            backgroundColor: colorsset.theme_backgound_second,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <IconE style={Style.setbariconmarginright} name="navicon" color={colorrdata} size={35} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function ProfileScreenStack({ navigation }) {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <Stack.Navigator initialRouteName="TabProfile">
      <Stack.Screen
        name="TabProfile"
        component={TabProfile}
        options={{
          title: 'Profile', headerShown: true,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            color: 'white'
          },
          headerStyle: {
            backgroundColor: colorrdata,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
           <IconE style={Style.setbariconmarginright} name="navicon" color={'white'} size={35} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function VidepcallStack({ navigation }) {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <Stack.Navigator initialRouteName="AudioCallandVideocall">
      <Stack.Screen
        name="AudioCallandVideocall"
        component={AudioCallandVideocall}
        options={{
          title: null, headerShown: true,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            color: 'white'
          },
          headerStyle: {
            backgroundColor: colorrdata,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
           <IconE style={Style.setbariconmarginright} name="navicon" color={'white'} size={35} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <ColorPicker />
          ),
        }}
      />
    </Stack.Navigator>
  );
}