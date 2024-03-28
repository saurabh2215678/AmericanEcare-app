import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground} from 'react-native';
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
//import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import Symptoms from "./Symptoms";
import Spinner from 'react-native-loading-spinner-overlay';
//import CheckBox from 'react-native-check-box'

const SymptomsScreen = ({route,navigation}) => {
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
    const [days, setdays] = useState(false);
    const [weeks, setweek] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [patientId, setpatientId] = useState("");
    const [data, setData] = useState([]);
    const { request_type} = route.params;
    const [isLoading, setLoading] = useState(false)

   

const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };


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
  
const get_symtoms_with_subsymtoms = async ()=>{
  
     try {
      
         const SymptomsData = JSON.parse(await AsyncStorage.getItem('SymptomsData')) ;
        // console.log('ssdd ==', SymptomsData);
        if (SymptomsData !== null) {
          setData(SymptomsData);
         
        }
      } catch (e) {
        alert('Failed to fetch the input from storage for Symtoms');
        //setIsLoading(false)
      }

    //  var config = {
    //     method: 'get',
    //     url: API_URL+`front/api/symtoms_with_subsymtoms`,
    //     headers: {
    //       'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    //     },
    //   };

    //   axios(config)
    //   .then(response => {
    
    //   let data =response.data.data;
      
    //   setData(data);
   

    //   })
    // .catch(error => {
    //   console.log(error);
    // });
 };



const getPatientState = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('state').then(
      (value) =>
        setpatientState(value),
    );
  };

const symptoms_submit=()=>{
    //navigation.navigate("MedicalHistoryScreen");
     navigation.navigate("MedicalHistoryScreen",{
      request_type: request_type,
  });
}


const backPress=()=>{
  navigation.navigate("ReasonScreen",{
      request_type: request_type,
  });
}



 // useEffect(async () => {
 //    const data = await get_symtoms_with_subsymtoms();
 //    setData(data);
 //  }, []);  


useEffect(() => {
  get_symtoms_with_subsymtoms()
  getPatientId();
  startLoading();
}, [PatientState,patientId]);

    
  return (

  	 <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                   <AppHeader
                        leftImage={images.back_image}
                        title="Symptoms"
                        onLeftPress={() =>backPress()} />
                </View>

                 

                <ScrollView>
                    <View style={Styles.container_custom}>

                     <Spinner
                        visible={isLoading}
                        textContent={'Please Wait...'}
                        textStyle={styles.spinnerTextStyle}
                      />


                         <Button title="Next" onPress={() => symptoms_submit()}
                                style={Styles.button} />
                              <View style={styles.container}>
                                 
                                  <Symptoms data={data} />
                                  <StatusBar style="auto" />
                                </View>



                            <Button title="Next" onPress={() => symptoms_submit()}
                                style={Styles.button} />
                     
                       <Text></Text>
                       <Text></Text>
                       <Text></Text>

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
    },
    checkbox: {
    margin: 0,
  },

  main_symptoms:{
    backgroundColor: '#ccc',
    padding:10,

  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  section2:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
   spinnerTextStyle: {
    color: '#FFF',
  },

});

export default SymptomsScreen;