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
//import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
//import CheckBox from 'react-native-check-box'

const SymptomsScreen = ({navigation}) => {
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
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);
    const [isChecked4, setChecked4] = useState(false);
    const [isChecked5, setChecked5] = useState(false);
    const [isChecked6, setChecked6] = useState(false);
    const [isChecked7, setChecked7] = useState(false);
    const [isChecked8, setChecked8] = useState(false);
    const [isChecked9, setChecked9] = useState(false);
    const [isChecked10, setChecked10] = useState(false);
    const [isChecked11, setChecked11] = useState(false);
    const [isChecked12, setChecked12] = useState(false);
    const [isChecked13, setChecked13] = useState(false);
    const [isChecked14, setChecked14] = useState(false);
    const [isChecked15, setChecked15] = useState(false);
    const [isChecked16, setChecked16] = useState(false);
    const [isChecked17, setChecked17] = useState(false);
    const [isChecked18, setChecked18] = useState(false);
    const [isChecked19, setChecked19] = useState(false);
    const [isChecked20, setChecked20] = useState(false);
    const [isChecked21, setChecked21] = useState(false);
    const [isChecked22, setChecked22] = useState(false);
    const [isChecked23, setChecked23] = useState(false);
    const [isChecked24, setChecked24] = useState(false);
    const [isChecked25, setChecked25] = useState(false);
    const [isChecked26, setChecked26] = useState(false);
    const [isChecked27, setChecked27] = useState(false);
    const [isChecked28, setChecked28] = useState(false);
    const [isChecked29, setChecked29] = useState(false);
    const [isChecked30, setChecked30] = useState(false);
    const [isChecked31, setChecked31] = useState(false);
    const [isChecked32, setChecked32] = useState(false);
    const [isChecked33, setChecked33] = useState(false);
   
    const [isChecked34, setChecked34] = useState(false);
    const [isChecked35, setChecked35] = useState(false);
    const [isChecked36, setChecked36] = useState(false);
    const [isChecked37, setChecked37] = useState(false);
    const [isChecked38, setChecked38] = useState(false);
    const [isChecked39, setChecked39] = useState(false);
    const [isChecked40, setChecked40] = useState(false);
    const [isChecked41, setChecked41] = useState(false);
    const [isChecked42, setChecked42] = useState(false);
    const [isChecked43, setChecked43] = useState(false);
    const [isChecked44, setChecked44] = useState(false);
    const [isChecked45, setChecked45] = useState(false);
    const [isChecked46, setChecked46] = useState(false);
    const [isChecked47, setChecked47] = useState(false);
    const [isChecked48, setChecked48] = useState(false);
    const [isChecked49, setChecked49] = useState(false);
    const [isChecked50, setChecked50] = useState(false);
    const [isChecked51, setChecked51] = useState(false);
    const [isChecked52, setChecked52] = useState(false);
    const [isChecked53, setChecked53] = useState(false);
    const [isChecked54, setChecked54] = useState(false);
    const [isChecked55, setChecked55] = useState(false);
    const [isChecked56, setChecked56] = useState(false);
    const [isChecked57, setChecked57] = useState(false);
    const [isChecked58, setChecked58] = useState(false);
    const [isChecked59, setChecked59] = useState(false);
    const [isChecked60, setChecked60] = useState(false);
    const [isChecked61, setChecked61] = useState(false);
    const [isChecked62, setChecked62] = useState(false);
    const [isChecked63, setChecked63] = useState(false);
    const [isChecked64, setChecked64] = useState(false);
    const [isChecked65, setChecked65] = useState(false);
    const [isChecked66, setChecked66] = useState(false);
    const [isChecked67, setChecked67] = useState(false);
    const [isChecked68, setChecked68] = useState(false);
    const [isChecked69, setChecked69] = useState(false);
    const [isChecked70, setChecked70] = useState(false);
    const [isChecked71, setChecked71] = useState(false);
    const [isChecked72, setChecked72] = useState(false);
    const [isChecked73, setChecked73] = useState(false);
    const [isChecked74, setChecked74] = useState(false);
    const [isChecked75, setChecked75] = useState(false);
    const [isChecked76, setChecked76] = useState(false);
    const [isChecked77, setChecked77] = useState(false);
    const [isChecked78, setChecked78] = useState(false);
    const [isChecked79, setChecked79] = useState(false);
    const [isChecked80, setChecked80] = useState(false);
    const [isChecked81, setChecked81] = useState(false);
    const [isChecked82, setChecked82] = useState(false);
    const [isChecked83, setChecked83] = useState(false);
    const [isChecked84, setChecked84] = useState(false);
    const [isChecked85, setChecked85] = useState(false);
    const [isChecked86, setChecked86] = useState(false);
    const [isChecked87, setChecked87] = useState(false);
    const [isChecked88, setChecked88] = useState(false);
    const [isChecked89, setChecked89] = useState(false);

 
  
const get_symtoms_with_subsymtoms = ()=>{

     var config = {
        method: 'get',
        url: API_URL+`front/api/symtoms_with_subsymtoms`,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        },
      };

      axios(config)
      .then(response => {
    
      var count = Object.keys(response.data.data).length;
   
      let symptomsArray = [];
      for (var i = 0; i < count; i++) {
        symptomsArray.push({
          label: response.data.data[i].dieases_name,
          value: response.data.data[i].dieases_name,
        });
      }
     // setdieaseData(dieasesArray);

      })
    .catch(error => {
      console.log(error);
    });
 };



const getPatientState = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('state').then(
      (value) =>
        setpatientState(value),
    );
  };

const symptoms_submit=()=>{

    navigation.navigate("MedicalHistoryScreen");

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
                        title="Symptoms"
                        onLeftPress={() => navigation.navigate('SelectProviderScreen')} />
                </View>
                <ScrollView>
                    <View style={Styles.container_custom}>

                    <Button title="Next" onPress={() => symptoms_submit()}
                                style={Styles.button} />

                                <Text></Text>

                    <View style={styles.main_symptoms}>
                       <Text>Cardiovascular</Text>
                     </View>  

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked1}
                            onValueChange={setChecked1}
                            color={isChecked1 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Chest pain/pressure</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked2}
                            onValueChange={setChecked2}
                            color={isChecked2 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Palpitations</Text>
                        </View>

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked3}
                            onValueChange={setChecked3}
                            color={isChecked3 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Lightheaded</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked4}
                            onValueChange={setChecked4}
                            color={isChecked4 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Exercise intolerance</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked5}
                            onValueChange={setChecked5}
                            color={isChecked5 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Leg pain while walking</Text>
                        </View>


                      <View style={styles.main_symptoms}>
                       <Text>Constitutional symptoms</Text>
                     </View> 

                       <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked6}
                            onValueChange={setChecked6}
                            color={isChecked6 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Fatigue</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked7}
                            onValueChange={setChecked7}
                            color={isChecked7 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Fever</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked8}
                            onValueChange={setChecked8}
                            color={isChecked8 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Night sweats</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked9}
                            onValueChange={setChecked9}
                            color={isChecked9 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Difficulty Sleeping</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked10}
                            onValueChange={setChecked10}
                            color={isChecked10 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Lose of appetite</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked11}
                            onValueChange={setChecked11}
                            color={isChecked11 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Weight gain</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked12}
                            onValueChange={setChecked12}
                            color={isChecked12 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Pain swallowing</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked13}
                            onValueChange={setChecked13}
                            color={isChecked13 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Chills</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked14}
                            onValueChange={setChecked14}
                            color={isChecked14 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Weight loss</Text>
                        </View>

                         <View style={styles.main_symptoms}>
                            <Text>Dermatology</Text>
                          </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked15}
                            onValueChange={setChecked15}
                            color={isChecked15 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Hair loss</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked16}
                            onValueChange={setChecked16}
                            color={isChecked16 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Thin hair</Text>
                        </View>

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked17}
                            onValueChange={setChecked17}
                            color={isChecked17 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Bites</Text>
                        </View>

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked18}
                            onValueChange={setChecked18}
                            color={isChecked18 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Itching</Text>
                        </View>


                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked19}
                            onValueChange={setChecked19}
                            color={isChecked19 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Rash</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked20}
                            onValueChange={setChecked20}
                            color={isChecked20 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Acne</Text>
                        </View>

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked21}
                            onValueChange={setChecked21}
                            color={isChecked21 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Dry skin</Text>
                        </View>

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked22}
                            onValueChange={setChecked22}
                            color={isChecked22 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Sores</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked23}
                            onValueChange={setChecked23}
                            color={isChecked23 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Bruising</Text>
                        </View>

                         <View style={styles.main_symptoms}>
                          <Text>Ears, Eyes, Nose, Mouth, and Throat (EENT)</Text>
                        </View> 

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked24}
                            onValueChange={setChecked24}
                            color={isChecked24 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Ear pain/discharge</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked25}
                            onValueChange={setChecked25}
                            color={isChecked25 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Hearing loss/ringing</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked26}
                            onValueChange={setChecked26}
                            color={isChecked26 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Eye redness/discharge</Text>
                        </View>


                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked27}
                            onValueChange={setChecked27}
                            color={isChecked27 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Congestion</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked28}
                            onValueChange={setChecked28}
                            color={isChecked28 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Sinus pressure</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked29}
                            onValueChange={setChecked29}
                            color={isChecked29 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Nose bleeding</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked30}
                            onValueChange={setChecked30}
                            color={isChecked30 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Nasal discharge</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked31}
                            onValueChange={setChecked31}
                            color={isChecked31 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Sore throat</Text>
                        </View>

                         <View style={styles.main_symptoms}>
                            <Text>Endocrine</Text>
                          </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked32}
                            onValueChange={setChecked32}
                            color={isChecked32 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Heat intolerance</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked33}
                            onValueChange={setChecked33}
                            color={isChecked33 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Cold intolerance</Text>
                        </View>

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked34}
                            onValueChange={setChecked34}
                            color={isChecked34 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Polyuria</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked35}
                            onValueChange={setChecked35}
                            color={isChecked35 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Polydipsia</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked36}
                            onValueChange={setChecked36}
                            color={isChecked36 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Hot flashes</Text>
                        </View>

                         <View style={styles.main_symptoms}>
                            <Text>Gastrointestinal</Text>
                          </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked37}
                            onValueChange={setChecked37}
                            color={isChecked37 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Acid reflux/heartburn</Text>
                        </View>  


                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked38}
                            onValueChange={setChecked38}
                            color={isChecked38 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Abdominal pain</Text>
                        </View>  

                         <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked39}
                            onValueChange={setChecked39}
                            color={isChecked39 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Difficulty swallowing</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked40}
                            onValueChange={setChecked40}
                            color={isChecked40 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Indigestion</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked41}
                            onValueChange={setChecked41}
                            color={isChecked41 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Nausea</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked42}
                            onValueChange={setChecked42}
                            color={isChecked42 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Vomiting</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked43}
                            onValueChange={setChecked43}
                            color={isChecked43 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Constipation</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked44}
                            onValueChange={setChecked44}
                            color={isChecked44 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Diarrhea</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked45}
                            onValueChange={setChecked45}
                            color={isChecked45 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Bloody stool</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked46}
                            onValueChange={setChecked46}
                            color={isChecked46 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Dark stool</Text>
                        </View> 

                         <View style={styles.main_symptoms}>
                            <Text>Genitourinary</Text>
                          </View>  

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked47}
                            onValueChange={setChecked47}
                            color={isChecked47 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Urine incontinence</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked48}
                            onValueChange={setChecked48}
                            color={isChecked48 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Painful urination</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked49}
                            onValueChange={setChecked49}
                            color={isChecked49 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Blood in urine</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked50}
                            onValueChange={setChecked50}
                            color={isChecked50 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Frequent urination</Text>
                        </View>

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked51}
                            onValueChange={setChecked51}
                            color={isChecked51 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Flank pain</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked52}
                            onValueChange={setChecked52}
                            color={isChecked52 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Vaginal discharge</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked53}
                            onValueChange={setChecked53}
                            color={isChecked53 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Vaginal bleeding</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked54}
                            onValueChange={setChecked54}
                            color={isChecked54 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Irregular periods</Text>
                        </View> 

                        <View style={styles.section}>
                          <Checkbox
                            style={styles.checkbox}
                            value={isChecked55}
                            onValueChange={setChecked55}
                            color={isChecked55 ? '#4630EB' : undefined}
                          />
                           <Text style={styles.paragraph}> Any chance of pregnancy now ?</Text>
                        </View> 



                        

                        <View style={Style.minviewallcontent}>
                            <Button title="Next" onPress={() => symptoms_submit()}
                                style={Styles.button} />
                       </View>
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
  }

});

export default SymptomsScreen;