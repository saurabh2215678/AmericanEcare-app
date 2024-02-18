import React, { useState,useEffect,useMemo,useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image
} from "react-native";
import Styles from './styles/Tabstyle/ProfileScreenStyle';
import Style from './styles/CommonStyle/Style';
import images from './images';
//import { useSelector } from "react-redux";
import { SH, Strings } from './utils';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { useIsFocused,useFocusEffect } from "@react-navigation/native"; 


export default function AccountScreen({ navigation }) {

// const { colorrdata } = useSelector(state => state.commonReducer) || {};
const colorrdata  = '#013220';
const API_URL = Strings.baseUrl.url;
const [patientId, setpatientId] = useState("");
const [loading, setLoading] = useState(false);
const [patient_name, set_patient_name] = useState("");
const [patient_mobile, set_patient_mobile] = useState("");
const [patient_email, set_patient_email] = useState("");
const [patient_address, set_patient_address] = useState("");
const [patient_dob, set_patient_dob] = useState("");

const isFocused = useIsFocused();  // useIsFocused as shown  

const getPatientId = async () => {
  try {
    const value = await AsyncStorage.getItem('user_id');

    if (value !== null) {
      setpatientId(value);
    }
  } catch (e) {
    alert('Failed to fetch the input from storage');
  }
};   


// const getPatientId = () => {

//     // Function to get the value from AsyncStorage
//     AsyncStorage.getItem('user_id').then(
//       (value) =>
//         setpatientId(value),
//     );
//   };
 const getProfileDetails = async () => {

   let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_detail', body, axiosConfig)
             .then((responseJson) => {

           console.log(responseJson.data.data.address);

                    const first_name = responseJson.data.data.first_name;
                    const middle_name = responseJson.data.data.middle_name;
                    const last_name = responseJson.data.data.last_name;

                    const full_name = first_name+ ' '+middle_name+' '+last_name;
                    const mobile = responseJson.data.data.mobile;
                    const email = responseJson.data.data.email;
                    const dob = responseJson.data.data.dob;
                    const address = responseJson.data.data.address;
                    const pincode = responseJson.data.data.pincode;
                    const city_name = responseJson.data.data.city_name;
                    const state_name = responseJson.data.data.state_name;
                    const country_name = 'U.S';
                    
                    const complete_addr = address + ', '+city_name+ ', '+state_name+', '+pincode;

                    set_patient_name(full_name);
                    set_patient_mobile(mobile);
                    set_patient_email(email);
                    set_patient_address(complete_addr);
                    set_patient_dob(dob);


                    })
               
             .catch(err => console.log('GET PROFILE: ', err));

};



 useEffect(() => {
      getPatientId()
      getProfileDetails()
     //alert(patientId)
  }, [patientId],getProfileDetails)



  return (

    <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover' style={Style.setbgimage}>
            <View style={Styles.minstyleviewphotograpgy}>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        width: '100%',
                        height: 'auto',
                    }}>
                    <View style={Styles.container}>
                        <View style={[Styles.setbgcolorviewtop, { backgroundColor: colorrdata }]}>
                        </View>
                        <View style={Style.minviewallcontent}>
                            <View style={Styles.cardView}>
                                <View style={[Styles.sectionView, { justifyContent: 'space-between' }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={images.ic_profileF} style={Styles.iconStyle} resizeMode={'stretch'} />
                                        <Text style={Styles.leblaStyle}>{patient_name}</Text>
                                        
                                    </View>
                                    <TouchableOpacity style={{ right: SH(10) }}
                                        onPress={() => navigation.navigate('EditProfileScreen')}><Text style={[Styles.editLableStyle, { color: colorrdata }]}>{Strings.Profile.edit}</Text></TouchableOpacity>
                                </View>
                                <View style={Styles.sectionView}>
                                    <Image source={images.ic_phone} style={Styles.iconStyle} resizeMode={'contain'} />
                                    <Text style={Styles.leblaStyle}>{patient_mobile}</Text>
                                </View>
                                <View style={Styles.sectionView}>
                                    <Image source={images.ic_email} style={Styles.iconStyle} resizeMode={'contain'} />
                                    <Text style={Styles.leblaStyle}>{patient_email}</Text>
                                </View>
                                <View style={Styles.sectionView}>
                                    <Image source={images.ic_location} style={Styles.iconStyle} resizeMode={'contain'} />
                                    <Text style={Styles.leblaStyle}>{patient_address}</Text>
                                </View>
                                
                                <View style={Styles.sectionView}>
                                    <Image source={images.ic_calender} style={Styles.iconStyle} resizeMode={'contain'} />
                                    <Text style={Styles.leblaStyle}>{patient_dob}</Text>
                                </View>
                               
                            </View>
                            <View style={Styles.settwobuttonset}>
                                <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')} style={[Styles.changePasswordView, { backgroundColor: colorrdata }]}
                                    >
                                    <Text style={Styles.changePasswordlabel}>{Strings.Profile.change_password}</Text>
                                    <Image source={images.ic_arrow_next}
                                        style={Styles.nextIcon}
                                        resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[Styles.changePasswordView, { backgroundColor: colorrdata }]}
                                    >
                                    <Text style={Styles.changePasswordlabel}>{Strings.Profile.contact_usset}</Text>
                                    <Image source={images.ic_arrow_next}
                                        style={Styles.nextIcon}
                                        resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

        </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: {
    fontSize: 16,
    paddingLeft: 15,
    backgroundColor: "white",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    marginTop: 10,
  },
  searchInputContainer: {
    backgroundColor: "#F0F8FF",
    marginLeft: 10,
    marginRight: 10,
  },
  headerQuickAcess: {
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textHeaderQuickAccess: {
    fontSize: 26,
    fontWeight: "bold",
  },

  

});
