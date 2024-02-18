import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,StatusBar,ScrollView, Pressable,ImageBackground} from 'react-native';
import {Container,AppHeader,Input,Button} from '../components';
import Styles from '../styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from '../styles/CommonStyle/Style';
import images from '../images';
//import { useSelector } from "react-redux";
import { SH, Strings } from '../utils';
import { Dropdown } from 'react-native-element-dropdown';
//import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const SelectProviderScreen = ({route,navigation}) => {
   const API_URL = Strings.baseUrl.url;
   const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [ZoneData, setUserZoneData] = useState([]);
    const [Zone, setUserZone] = useState([]);
    const [visitTypesData, setvisitTypes] = useState([]);
    const [AvailableDoctorsData, setAvailableDoctors] = useState([]);
    const [visitType, setuservisitTypes] = useState([]);
    const [doctorlist, setdoctorlist] = useState([]);
    const [PatientState, setpatientState] = useState('');
   // const [visitTypes, setuservisitTypes] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [doctorCount, setdoctorCount] = useState(false);
    const { request_type} = route.params;
    const { appointment_date} = route.params;
 

const getPatientState = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('state').then(
      (value) =>
        setpatientState(value),
    );
  };

const getVisitTypes=()=>{
 
     var config = {
          method: 'get',
          url: API_URL+`front/api/get_visit_type`,
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
        };

        axios(config)
        .then(response => {
      
        var count = Object.keys(response.data.data).length;
     
        let visitTypesArray = [];
        for (var i = 0; i < count; i++) {
          visitTypesArray.push({
            label: response.data.data[i].visit_type_name,
            value: response.data.data[i].visit_type_id,
          });
        }
        setvisitTypes(visitTypesArray);

        })
      .catch(error => {
        console.log(error);
      });

}

  // Function to get CSRF token from the server
const getCSRFToken = async () => {
  try {
    const response = await axios.get(API_URL+'front/api/getToken');
    const csrfToken = response.data.token;
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

const available_doctors_by_visit_type=  (visitType)=>{
//const csrfToken =  getCSRFToken();  



  setuservisitTypes(visitType);

  

    let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                   //'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
              }
            };


            // if(appointment_date != '')
            // {
            //   const body = {currentdatetime:appointment_date, visit_type: visitType,request_type:request_type,state:PatientState};
            // }
            // else
            // {
              const body = {visit_type: visitType,request_type:request_type,state:PatientState};
           // }





            axios.post(API_URL+'front/api/available_doctors_by_visit_type', body, axiosConfig)
             .then((responseJson) => {

           

                  var doctors_count = Object.keys(responseJson.data.data).length;
                  let doctorsArray = [];
                 // let doctorsArray = [{ label: 'Select Doctor', value: 'Select Doctor' }];
                  for (var i = 0; i < doctors_count; i++) {
                    doctorsArray.push({
                      label: responseJson.data.data[i].doc_name,
                      value: responseJson.data.data[i].doc_id,
                    });
                  }

                

                // alert(doctorsArray.length);

                if(doctorsArray.length)  
                {
                   setAvailableDoctors(doctorsArray); 
                }
                else
                {
                  setAvailableDoctors([{ label: 'No Doctors', value: 'No Doctors' }]);
                }

                setdoctorCount(doctorsArray.length);

                })
             .catch(err => console.log('get doctor API: ', err));

};


const provider_submit=()=>{
//alert(doctorCount);

  if(doctorCount>0)
  {
   // console.log("visitType",visitType);


// alert(doctorlist);
    AsyncStorage.setItem("visit_type", JSON.stringify(visitType));
    AsyncStorage.setItem("request_type", JSON.stringify(request_type));
    AsyncStorage.setItem("visit_id", JSON.stringify(visitType));
    //AsyncStorage.setItem("doctor_id", JSON.stringify(doctorlist));
    AsyncStorage.setItem("doctor_id", JSON.stringify(doctorlist));
   // navigation.navigate("ReasonScreen");

    navigation.navigate("ReasonScreen",{
          request_type: request_type,
        });

  }
  else
  {
    alert("There is no doctors available right now. Please try after some time");
  }

}

const backPress=()=>{

  if(request_type ==1)
  {
     navigation.navigate("DateAndTimeScreen",{request_type: request_type});
  }
  if(request_type ==0)
  {
    navigation.navigate("ScheduleScreen",{request_type: request_type});
  }
}



useEffect(() => {
     getVisitTypes();
     setUserZoneData([{ label: 'Doctor', value: 'Doctor' }]);
    // setAvailableDoctors([{ label: 'No Doctors', value: 'No Doctors' }]);
     getPatientState();
   //  available_doctors_by_visit_type();
 // alert(appointment_date)
}, [PatientState]);

    
  return (

  	 <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                   <AppHeader
                        leftImage={images.back_image}
                        title="Select Provider"
                        onLeftPress={() => backPress()} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        height: '100%'
                    }}>
                    <View style={Styles.container}>
                        <View style={Style.minviewallcontent}>

                             <Text style={Styles.lableTextStyle}>Select Provider</Text>
                             <View style={Styles.inputviewstyle}>
                               
                                  <Dropdown
                               style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={ZoneData}
                               search
                               maxHeight={200}
                               labelField="label"
                               valueField=""
                               placeholder={!isFocus ? 'Select' : '...'}
                               placeholderTextColor="#fff" 
                               searchPlaceholder="..."
                               value={value}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                 setUserZone(item.value);
                                 setIsFocus(true);
                               }}
                              
                             />
                            </View>


                            <Text style={Styles.lableTextStyle}>Select Visit Types</Text>
                             <View style={Styles.inputviewstyle}>
                              <Dropdown
                               style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={visitTypesData}
                               search
                               maxHeight={200}
                               labelField="label"
                               valueField="value"
                               placeholder={!isFocus ? 'Select' : '...'}
                               placeholderTextColor="#fff" 
                               searchPlaceholder="..."
                               value={value}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                 available_doctors_by_visit_type(item.value);
                                 setIsFocus(true);
                               }}
                               
                             />
                            </View>


                             <Text style={Styles.lableTextStyle}>Available Providers</Text>
                             <View style={Styles.inputviewstyle}>
                              <Dropdown
                               style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={AvailableDoctorsData}
                               search
                               maxHeight={200}
                               labelField="label"
                               valueField="value"
                               placeholder={!isFocus ? 'Select' : '...'}
                               placeholderTextColor="#fff" 
                               searchPlaceholder="..."
                               value={value}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                 setdoctorlist(item.value);
                                 setIsFocus(true);
                               }}
                             />
                            </View>


                            <Button
                                title="Next"
                                onPress={() =>  provider_submit()}
                                style={Styles.button} />
                        </View>
                      
                    </View>
                </ScrollView>
            </ImageBackground>
        </Container>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: '80%',
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EE59D',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
Zonedropdown: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
      borderRadius:10,
      marginTop: 0,
      marginBottom: 15,
      width:'100%'

    },
});

export default SelectProviderScreen;