import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground} from 'react-native';
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

const ReasonScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
    
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [ZoneData, setUserZoneData] = useState([]);
    const [Zone, setUserZone] = useState([]);
    const [visitTypesData, setvisitTypes] = useState([]);
    const [AvailableDoctorsData, setAvailableDoctors] = useState([]);
    const [reason, setReason] = useState("");
    const [visitType, setuservisitTypes] = useState([]);
    const [other_health_concern, setOtherHealthConcern] = useState([]);
    const [doctorlist, setdoctorlist] = useState([]);
    const [PatientState, setpatientState] = useState('');
   // const [visitTypes, setuservisitTypes] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [days, setdays] = useState('');
    const [weeks, setweek] = useState('');
    const { request_type } = route.params;


  const daysData = [
    { label: '0 days', value: '0 days' },
    { label: '1 days', value: '1 days' },
    { label: '2 days', value: '2 days' },
    { label: '3 days', value: '3 days' },
    { label: '4 days', value: '4 days' },
    { label: '5 days', value: '5 days' },
    { label: '6 days', value: '6 days' },
    { label: '7 days', value: '7 days' },
  ];


  const weekData = [
    { label: '0 week', value: '0 week' },
    { label: '1 week', value: '1 days' },
    { label: '2 week', value: '2 week' },
    { label: '3 week', value: '3 week' },
    { label: '4 week', value: '4 week' },
    { label: '5 week', value: '5 week' },
    { label: '6 week', value: '6 week' },
    { label: '7 week', value: '7 days' },
  ];

  




const getPatientState = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('state').then(
      (value) =>
        setpatientState(value),
    );
  };

const reason_submit=()=>{

  if(reason == "")
  {
    alert("Please Enter your reason of your visit");
  }
  else
  {
   // navigation.navigate("SymptomsScreen");

    let new_days = 0;
    let new_weeks = 0;

    if(days != '')
    {
      new_days = days;
    }


   if(weeks != '')
    {
      new_weeks = weeks;
    }


    duration = new_days + ', '+new_weeks;
   

    AsyncStorage.setItem("duration", duration);
    AsyncStorage.setItem("reason_visit", reason);
    AsyncStorage.setItem("current_health_concern", other_health_concern);

     navigation.navigate("SymptomsScreen",{
      request_type: request_type,
    });
  }
}


const backPress=()=>{
  navigation.navigate("SelectProviderScreen",{
      request_type: request_type,
  });
}



useEffect(() => {
}, [PatientState]);

    
  return (

  	 <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                   <AppHeader
                        leftImage={images.back_image}
                        title="Reason of visit"
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

                        <Text style={Styles.lableTextStyle}>Reason of the visit</Text>
                            <Input
                                placeholder="Reason"
                                onChangeText={(reason) => setReason(reason)}
                                value={reason}
                                inputStyle={Style.inputMobile}
                            />

                        <Text style={styles.symptomsText}>Duration of symptoms</Text>   


              <View style={Styles.inputviewstyle}>
                 <Dropdown
                  style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={daysData}
                               search
                               maxHeight={200}
                               labelField="label"
                               valueField="value"
                               placeholder={!isFocus ? 'Select Days' : '...'}
                               placeholderTextColor="#fff" 
                               searchPlaceholder="..."
                               value={days}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                 setdays(item.value);
                                 setIsFocus(true);
                               }}
                             />
                    </View>


                    <View style={Styles.inputviewstyle}>
                 <Dropdown
                  style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={weekData}
                               search
                               maxHeight={200}
                               labelField="label"
                               valueField="value"
                               placeholder={!isFocus ? 'Select Week' : '...'}
                               placeholderTextColor="#fff" 
                               searchPlaceholder="..."
                               value={weeks}
                               onFocus={() => setIsFocus(true)}
                               onBlur={() => setIsFocus(false)}
                               onChange={item => {
                                 setweek(item.value);
                                 setIsFocus(true);
                               }}
                             />
                    </View>

                   <View style={Styles.minflexview}>
                      <View style={Styles.minviewsigninscreen}>
                        <View>
                          <TextInput style={Styles.settextinputwidth} placeholder="Do you have any other health related concern"
                            onChangeText={(other_health_concern) => setOtherHealthConcern(other_health_concern)}
                            value={other_health_concern}
                           />
                        </View>
                        
                      </View>
                    </View>


                            <Button
                                title="Next"
                                onPress={() => reason_submit()}
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
    symptomsText:{
       fontSize: 18,
       marginBottom: 15,
       color:'#152549',
    }
});

export default ReasonScreen;