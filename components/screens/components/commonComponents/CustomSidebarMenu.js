import React from "react";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import IconE from 'react-native-vector-icons/Feather';
import IconT from 'react-native-vector-icons/FontAwesome5';
import IconZ from 'react-native-vector-icons/FontAwesome';
import Styles from '../../styles/CommonStyle/CustomeSlidebar';
import IconF from 'react-native-vector-icons/Ionicons';
import images from '../../images';
import RouteName from '../../routes/RouteName';
import { useSelector } from "react-redux";

const CustomSidebarMenu = (props) => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const { navigation } = props;
  const Onpressfunction = (e) => {
    navigation.toggleDrawer();
    navigation.navigate(e)
  };
  return (
    <ScrollView>
      <View style={Styles.customslidebarmenu}>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.TAB_HOME)
        }>
          <Image source={images.ic_home}
            style={[Styles.logoimage, { tintColor: colorrdata }]} />
          <Text style={Styles.hometextstyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.TAB_EXERCISE)
        }>
          <Image source={images.Excersizeiconset_set_two}
            resizeMode='contain' style={[Styles.logoimage, { tintColor: colorrdata }]} />
          <Text style={Styles.hometextstyle}>Exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.TAB_NOTIFICATION)
        }>
          <IconF name="notifications" style={Styles.logoimage} color={colorrdata} size={20} />
          <Text style={Styles.hometextstyle}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.TAB_PROFILE)
        }>
          <Image source={images.ic_profile}
            style={[Styles.logoimage, { tintColor: colorrdata }]} />
          <Text style={Styles.hometextstyle}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.CHART_DOCTORE_SCREEN)
        }>
          <IconF name="chatbox-ellipses-outline" style={Styles.logoimage} color={colorrdata} size={20} />
          <Text style={Styles.hometextstyle}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.DOCTORE_MAP_LOCATIONS)
        }>
          <IconT name="map-marker-alt" style={Styles.logoimage} color={colorrdata} size={20} />
          <Text style={Styles.hometextstyle}>Doctor Near Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.DRAWER_NEWS_SCREEN)
        }>
          <IconZ name="newspaper-o" color={colorrdata} size={20} />
          <Text style={Styles.hometextstyle}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.DRAWER_LISTING_SCREEN)
        }>
          <IconZ name="address-book-o" color={colorrdata} size={20} />
          <Text style={Styles.hometextstyle}>Book Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.flexrowset} onPress={
          () => Onpressfunction(RouteName.DRAWER_HELP_SCREEN)
        }>
          <IconT name="hands-helping" color={colorrdata} size={20} />
          <Text style={Styles.hometextstyle}>Help</Text>
        </TouchableOpacity>
        <View style={Styles.settingandlogout}>
          <TouchableOpacity style={Styles.flexrowset} onPress={
            () => Onpressfunction(RouteName.LOGIN_PATINT_TAB_SCREEN)
          }>
            <IconE name="log-out" color={colorrdata} size={23} />
            <Text style={Styles.hometextstyle}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default CustomSidebarMenu;

