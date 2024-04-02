import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,StatusBar,ScrollView,TextInput, Pressable,ImageBackground,Alert,TouchableOpacity} from 'react-native';
import {Container,AppHeader,Input,Button} from '../components';
import Styles from '../styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from '../styles/CommonStyle/Style';
import images from '../images';
//import { useSelector } from "react-redux";
import { SH, Strings } from '../utils';
import { Dropdown } from 'react-native-element-dropdown';
//import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

const DependentScreenSide = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
    const [Dob, setUserDob] = useState('');
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [dependent_name, setDependentName] = useState('')
    const [GenderData, setGenderData] = useState([]);
    const [Gender, setUserGender] = useState('Male');
    const [currentDate, setcurrentDate] = useState('');
    const [currentTime, setcurrentTime] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [patientId, setpatientId] = useState("");
    const { request_type} = route.params || '1';

   const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
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


    const { dependent_val} = route.params || '1';

useEffect(() => {
     setGenderData([{ label: 'Male', value: 'Male' },{ label: 'Female', value: 'Female' }]);
     getPatientId();
//getCurrentDateTime();
    // alert(dependent_val);
}, [patientId]);


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

const SaveDependent = async (type)=> {

    const csrfToken = await getCSRFToken();  

     let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
        }
     };

      if (!dependent_name) {
      alert('Please Enter Name');
      return;
    }



     var year = selectedDate.getFullYear();
     var month = selectedDate.getMonth()+1;
     var date = selectedDate.getDate();

     if(month < 10)
     {
      month = '0'+month;
     }

     //var dob = year + '-'+month+'-'+date;
     var dob = month + '-'+date+'-'+year;
     //alert(Gender);

     const body = { patient_id: patientId, dependent_first_name:dependent_name,dependent_dob:dob,dependent1_relationship:dependent_val,dependent_gender:Gender};

      axios.post(API_URL+'front/api/save_dependent', body, axiosConfig)
             .then((responseJson) => {

              if(responseJson.status == 200)
              {

                if(type == 1)
                {
                   Alert.alert(
                      'Sucess',
                      'Dependent Save Successfully',
                      [
                        {text: '', onPress: () => navigation.navigate("SelectProviderScreen",{request_type: request_type})},
                      ],
                      {cancelable: false},
                    );
                }
                else
                {

                  Alert.alert(
                      'Sucess',
                      'Dependent Save Successfully',
                      [
                        {text: '', onPress: () => navigation.navigate("DependentScreen",{
                          dependent_val: dependent_val,
                          request_type: request_type
                        })},
                      ],
                      {cancelable: false},
                    );

                }

               



              }
            })
         .catch(err => console.log('Save Dependent API: ', err));
    

}




   
  return (

  	 <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title="Add Dependent"
                        onLeftPress={() => navigation.navigate('DateAndTimeScreen',{request_type: request_type})} />
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

                            <Text style={Styles.lableTextStyle}>Dependent</Text>
         
                            <Input
                                placeholder="Date"
                                value={dependent_val}
                                inputStyle={Style.inputMobile}
                            />
                            <Text style={Styles.lableTextStyle}>Name</Text>
                            <Input
                                placeholder="Name"
                                value={dependent_name}
                                onChangeText={(dependent_name) => setDependentName(dependent_name)}
                                inputStyle={Style.inputMobile}
                            />

                             <Text style={Styles.lableTextStyle}>DOB</Text>

                             <Input
                                placeholder="DOB"
                                onChangeText={(Dob) => setUserDob(Dob)}
                                value={selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                                inputStyle={Style.inputMobile}
                            />

                           
                        <Button onPress={showDatePicker} title="Change DOB!" />
                          <DateTimePickerModal
                           date={selectedDate}
                           isVisible={datePickerVisible}
                           mode="date"
                           onConfirm={handleConfirm}
                           onCancel={hideDatePicker}
                        />

                          <Text style={Styles.lableTextStyle}>Gender</Text>
                             <View style={Styles.inputviewstyle}>
                               
                 <Dropdown
                  style={[styles.Genderdropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={GenderData}
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
                                 setUserGender(item.value);
                                 setIsFocus(true);
                               }}
                             />
                               
                            </View>
                            <Button
                                title="Save and Next"
                                onPress={() => SaveDependent(1)}
                               />

                            

                                <TouchableOpacity onPress={()=>SaveDependent(2)}>
                                  <View style={styles.button_two}>
                                    <Text style={styles.buttonText}>Save and Add More</Text>
                                  </View>
                                </TouchableOpacity>
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
Genderdropdown: {
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
    button_two: {
     backgroundColor: "#831c81",
      padding: 15,
      marginVertical: 15,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonText: {
    color: "#FFF",
    fontSize: 18
  },
});

export default DependentScreenSide;