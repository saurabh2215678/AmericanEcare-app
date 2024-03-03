import React, { useState,useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
    TouchableOpacity
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sidebarUserStyle } from '../../styles/sidebarStyle';

import { useNavigation } from '@react-navigation/native';
import { SideBarData } from '../../utils';
import NavigationItem from './components/commonComponents/NavigationItem';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/userSlice';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomSidebarMenu = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    const [isMyHealthOpen, setMyHealthOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [user_middle_name, setUser_middle_name] = useState('');
    const [userlastname, setUserlastname] = useState('');
    const [emailId, setEmailId] = useState('');

    const BASE_PATH = require('../../assets/app_images/user.png')

     const handleMainMenuItemClick = () => {
        setSubMenuOpen(!isSubMenuOpen);
     };

      const handleMyHealthItemClick = () => {
        setMyHealthOpen(!isMyHealthOpen);
     };

      const handleSubMenuClick = () => {
        // Handle submenu item click
       alert("Working")
      };

    const getProfileDetails = async ()=>{

      try {
       
        const first_name = await AsyncStorage.getItem('first_name');
        const middle_name = await AsyncStorage.getItem('middle_name');
        const last_name = await AsyncStorage.getItem('last_name');
        const email = await AsyncStorage.getItem('email');
        const address = await AsyncStorage.getItem('address');
        const phone = await AsyncStorage.getItem('phone');
        const pincode = await AsyncStorage.getItem('pincode');
        const city = await AsyncStorage.getItem('city');
        const zone = await AsyncStorage.getItem('zone');
        const state = await AsyncStorage.getItem('state');

        if (first_name !== null) {
          setUsername(first_name);
        }

        if (middle_name !== null) {
            setUser_middle_name(middle_name);
        }

        if (last_name !== null) {
            setUserlastname(last_name);
        }

        if (email !== null) {
            setEmailId(email);
        }

        


      } catch (e) {
       // alert('Failed to fetch the input from storage');
      }
};

 logout=()=>{
    AsyncStorage.clear();
    dispatch(logOut());
    navigation.navigate('Login')
  }

  useEffect(() => {
     
      getProfileDetails();
    }, [navigation]);


    return (
        <SafeAreaView style={{ flex: 1}}>
            <View style={sidebarUserStyle}>
                <Image
                    source={BASE_PATH}
                    style={styles.sideMenuProfileIcon}
                />
                <View style={{alignItems: "flex-start",marginTop: 10,}}>
                     <Text style={{color:"#fff"}}>Welcome2, {username}</Text>
                     <Text style={{color:"#fff"}}>{emailId}</Text>
                </View>
            </View>


            <DrawerContentScrollView {...props}>
                {/* <DrawerItemList {...props}  /> */}
                {SideBarData.map((item, id) => <NavigationItem key={id} data={item}/>)}
                
{/*                 
                 <View style={{backgroundColor: '#eee',padding: 6 }}>
                  <TouchableOpacity onPress={handleMainMenuItemClick}>
                    <Text>My information</Text>
                  </TouchableOpacity>

                  {isSubMenuOpen && (
                    <View style={{backgroundColor: '#eee',padding: 6 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")}>
                          <Text>Personal information</Text>
                         </TouchableOpacity>

                         <TouchableOpacity onPress={() => navigation.navigate("DemographicScreen")}>
                           <Text>Demographic</Text>
                         </TouchableOpacity>  

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Dependents</Text>
                         </TouchableOpacity>  
                    </View>
                  )}
                </View>


                <View style={{backgroundColor: '#eee',padding: 6,marginTop: 10,marginBottom: 10 }}>
                  <TouchableOpacity onPress={handleMyHealthItemClick}>
                    <Text>My Health Record</Text>
                  </TouchableOpacity>

                  {isMyHealthOpen && (
                    <View style={{backgroundColor: '#eee',padding: 6 }}>
                        <TouchableOpacity onPress={handleSubMenuClick}>
                          <Text>Insurance</Text>
                         </TouchableOpacity>

                         <TouchableOpacity onPress={handleSubMenuClick}>
                           <Text>Pharmacy</Text>
                         </TouchableOpacity>  

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Immunization 1r</Text>
                         </TouchableOpacity>  

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Medication</Text>
                         </TouchableOpacity>  

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Allergies</Text>
                         </TouchableOpacity> 

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Diagnosis</Text>
                         </TouchableOpacity> 

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Past Medical History</Text>
                         </TouchableOpacity>  

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Past Surgery History</Text>
                         </TouchableOpacity>

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Social History</Text>
                         </TouchableOpacity>  

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>OBGYN History</Text>
                         </TouchableOpacity>

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Family History</Text>
                         </TouchableOpacity> 

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>Vitals</Text>
                         </TouchableOpacity>

                         <TouchableOpacity onPress={handleSubMenuClick}> 
                           <Text>My Documents</Text>
                         </TouchableOpacity>  

                    </View>
                  )}
                </View>


                <View style={{backgroundColor: '#eee',padding: 6 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("DateAndTimeScreen")}>
                    <Text>Start Visit Now</Text>
                  </TouchableOpacity>
                </View>

                 <View style={{backgroundColor: '#eee',padding: 6,marginTop: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("ScheduleScreen")}>
                    <Text>Schedule a visit </Text>
                  </TouchableOpacity>
                </View>

                <View style={{backgroundColor: '#eee',padding: 6,marginTop: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("MyVisitScreen")}>
                    <Text>My Visits </Text>
                  </TouchableOpacity>
                </View>

                <View style={{backgroundColor: '#eee',padding: 6,marginTop: 10 }}>
                  <TouchableOpacity onPress={() => navigation.navigate("ChangePasswordScreen")}>
                    <Text>Change Password </Text>
                  </TouchableOpacity>
                </View>
                */}
                <TouchableOpacity onPress={()=>this.logout()}>
                  <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 13, paddingVertical: 10}}>
                      <Icon style={{width: 25, textAlign: 'center'}} name="power-off" size={23} color="#248A24" />
                      <Text style={{fontSize: 15, fontWeight: 500, marginLeft: 9}}>Logout </Text>
                  </View> 
                </TouchableOpacity>

            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'contain',
        width: 60,
        height: 60,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;