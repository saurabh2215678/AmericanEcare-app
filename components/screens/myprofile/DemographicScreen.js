import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Pressable, StyleSheet,Alert,Image} from 'react-native';
import moment from 'moment';
import images from '../images';
import { Container, AppHeader, Input, Button, RadioButton } from '../components';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Strings } from '../utils';
import RouteName from '../routes/RouteName';
import Styles from '../styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from '../styles/CommonStyle/Style';
import { useTogglePasswordVisibility } from '../utils/Passwordviseble';
import IconG from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import SearchableDropdown from 'react-native-searchable-dropdown'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
//import Alert from './components/commonComponents/SweetaelertModal';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

//const EditProfileScreen = ({navigation}) => {
export default function DemographicScreen({ navigation }) {
    //const navigation = useNavigation();
    const API_URL = Strings.baseUrl.url;
    const [username, setUsername] = useState('');
    const [user_middle_name, setUser_middle_name] = useState('');
    const [userlastname, setUserlastname] = useState('');
    const [emailId, setEmailId] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    //const [state, setState] = useState('');
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [cityData, setCityData] = useState([]);
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [dateOfBrith, setDateOfBrith] = useState(Strings.register.date_of_brith);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [StateData, setUserStateData] = useState([]);
    const [State, setUserState] = useState('');
  
    const [Zone, setUserZone] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [patientId, setpatientId] = useState(""); 
    const [ZoneData, setUserZoneData] = useState([]);

    const [selectedDate, setSelectedDate] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [gender, setGender] = useState([]);
    const [language, setLanguage] = useState([]);
     const [loading, setLoading] = useState(false);

    const [profileImage, setprofileImage] = useState(null);
    //const [profileImageInPicker, setProfileImageInPicker] = useState(null);
    const [profileImageName, setProfileImageName] = useState(null);

    


  // setUserZoneData([{ label: 'Central', value: '2' },{ label: 'Eastern', value: '1' },{ label: 'Pacific', value: '3' },{ label: 'South', value: '4'}]);

  const genderData = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const languageData = [
    { label: 'English', value: 'english' },
    { label: 'Other', value: 'other' },
    
    
  ];

 const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
  const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const pickProfileImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            filename:true
          });

          if (!result.canceled) {

            let filename_profile = result.assets[0].uri.replace(/^.*[\\\/]/,"");
            setprofileImage(result.assets[0].uri);
            setProfileImageName(filename_profile);
          }
  };

  

    
    const onChangeText = (text, type) => {
        if (type === 'user_name') setUsername(text);
        if (type === 'emaiId') setEmailId(text);
        if (type === 'mobile') setMobileNumber(text);
        if (type === 'password') setPassword(text);
        if (type === 'address') setAddress(text);
        if (type === 'state') setState(text);
        if (type === 'city') setCity(text);
        if (type === 'pincode') setPincode(text);
    };
    const showDateTimePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDateTimePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleDatePicked = (date) => {
        hideDateTimePicker(),
            setDateOfBrith(moment(date, "YYYY-MM-DDTHH:mm:ss Z").local().format('DD-MM-YYYY'));
    };
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    const [password, setPassword] = useState('');

    const { passwordVisibilitytwo, rightIcontwo, handlePasswordVisibilitytwo } =
        useTogglePasswordVisibility();
    const [conformpassword, setconformpassword] = useState('');

const getPatientId = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('user_id').then(
      (value) =>
        setpatientId(value),
    );
  };


const getDemographic = ()=>{
   let axiosConfig = {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      }
    };

    const body = { patient_id: patientId };


      axios.post(API_URL+'front/api/get_demographic_detail', body, axiosConfig)
             .then((responseJson) => {
              //  console.log(responseJson.data.data);
                  setGender(responseJson.data.data.gender)
                  setLanguage(responseJson.data.data.prefered_language)
                  setSelectedDate(responseJson.data.data.demographic_dob)

                  if(profileImageName == null)
                  {
                    setprofileImage(responseJson.data.data.demographic_image)
                  }
                

                })
             .catch(err => console.log('demographic API: ', err));

}



const updateDemographic=async()=>{
   setLoading(true);
   const formData = new FormData();
   let profileImageActualName = /\.(\w+)$/.exec(profileImageName);
   let profileImageType = profileImageActualName ? `image/${profileImageActualName[1]}` : `image`;

     if(profileImageActualName != null)
     {
      formData.append('profileImage', {
          uri: profileImage,
          type: profileImageType, 
          name: profileImageName,
        });
     }

  

    formData.append('patient_id', patientId);
    formData.append('demographic_dob', selectedDate);
    formData.append('gender', gender);
    formData.append('prefered_language', language);


   let axiosConfig = {
      headers: {
         // "Content-Type": "application/x-www-form-urlencoded",
          'Content-Type': 'multipart/form-data',
      }
    };

   
     axios.post(API_URL+'front/api/edit_demographic_information', formData, axiosConfig)
     .then((responseJson) => {
    
       if(responseJson.data.status == "success")
            {
              setLoading(false); // Stop loading
               Alert.alert(
                      'Sucess',
                      'Demographic Update Successfully',
                      [
                        {text: '', onPress: () => navigation.navigate("DemographicScreen")},
                      ],
                      {cancelable: false},
                    );
            }

      })
                 
     .catch(err => console.log('UPDATE Demographic API: ', err));
  
}


 // Function to get CSRF token from the server
const getCSRFToken = async () => {
  try {
    const response = await axios.get(API_URL+'front/api/getToken');
    const csrfToken = response.data.token;
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF tokenweqe:', error);
    throw error;
  }
};






  useEffect(() => {
  
  
    try {
      navigation.addListener('focus', () => {
        setDisplayAlert(0);
      });
       getPatientId();
       getDemographic();

     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
 


}, [patientId]);



    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#e3f2f0" />
            <View style={Styles.setbgcolorthe}>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader leftImage={images.back_image} title='Demographic' onLeftPress={() => navigation.goBack()} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        height: 'auto'
                    }}>
                    <View style={styles.container}>
                      

                      <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />

             
                 <Text style={styles.label2}>Select Gender:</Text>     
                   <Dropdown
                        style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={genderData}
                          search
                          maxHeight={200}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? 'Select Gender' : '...'}
                          placeholderTextColor="#fff" 
                          searchPlaceholder="Gender..."
                          value={gender}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setGender(item.value);
                            setIsFocus(true);
                          }}
                         
                        />


                  <Text style={styles.label2}>Select Language:</Text>     
                   <Dropdown
                        style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={languageData}
                          search
                          maxHeight={200}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? 'Select Language' : '...'}
                          placeholderTextColor="#fff" 
                          searchPlaceholder="Language..."
                          value={language}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setLanguage(item.value);
                            setIsFocus(true);
                          }}
                         
                        /> 
                     
                    <Text style={styles.label2}> Profile image</Text>   
                    <TouchableOpacity onPress={pickProfileImage}>       
                    <Image
                      style={{ alignSelf: 'center',top: 10 }}
                      source={require('../../../assets/app_images/camera.png')}
                    />
                    </TouchableOpacity>
                    <Text></Text>
                     {profileImage && <Image source={{ uri: profileImage }} style={{ width: 70, height: 70 }} />}

                      <Text></Text>

                     <Button onPress={() => { updateDemographic() }}
                      title={loading ? 'Loading...' : 'Submit'}
                      style={Styles.button} />
                      
                    </View>
                </ScrollView>
                
            </View>
        </Container >
    );
};

const styles = StyleSheet.create({

    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#333',
  },

   label2: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 0,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },

  calendarIcon: {
    padding: 10,
  },


   Zonedropdown: {
      height: 40,
      width:300,
      borderColor: 'gray',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#ccc',
      borderRadius:10,
      marginTop: 20,
    },

     placeholderStyle: {
      fontSize: 16,
      color: 'white',
    },

});    

