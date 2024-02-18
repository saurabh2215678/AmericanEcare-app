import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Pressable, StyleSheet,Alert} from 'react-native';
import moment from 'moment';
import images from './images';
import { Container, AppHeader, Input, Button, RadioButton } from './components';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Strings } from './utils';
import RouteName from './routes/RouteName';
import Styles from './styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from './styles/CommonStyle/Style';
import { useTogglePasswordVisibility } from './utils/Passwordviseble';
import IconG from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Alert from './components/commonComponents/SweetaelertModal';
import axios from 'axios';
import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import CustomSidebarMenu from './CustomSidebarMenu';
import DashboardScreen from './DashboardScreen';


const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {
  return (
      <Drawer.Navigator  drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
       
      </Drawer.Navigator>
    );
  };

//const EditProfileScreen = ({navigation}) => {
export default function EditProfileScreen({ navigation }) {
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
    const [ZoneData, setUserZoneData] = useState([]);
    const [Zone, setUserZone] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [patientId, setpatientId] = useState("");   

    
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


const getAllStates = () => {
    // Function to get the value from AsyncStorage
         var config = {
          method: 'get',
          url: API_URL+`front/api/all_state`,
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
        };

        axios(config)
        .then(response => {
      
        var count = Object.keys(response.data.data).length;
     
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            label: response.data.data[i].state_name,
            value: response.data.data[i].state_id,
          });
        }

        setUserStateData(stateArray);

        })
      .catch(error => {
        console.log(error);
      });
  };

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


  const getAllCities =  async () => {
    // Function to get the value from AsyncStorage
    const csrfToken = await getCSRFToken();
   
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
              }
            };
            const body = { state_id: State };


            axios.post(API_URL+'front/api/all_city', body, axiosConfig)
             .then((responseJson) => {

                  var city_count = Object.keys(responseJson.data.data).length;
                  let cityArray = [];
                  for (var i = 0; i < city_count; i++) {
                    cityArray.push({
                      label: responseJson.data.data[i].city_name,
                      value: responseJson.data.data[i].city_id,
                    });
                  }
                setCityData(cityArray);     

                })
             .catch(err => console.log('CITY API: ', err));
        };


const getProfileDetails = async ()=>{

      try {
       // const patientData = await AsyncStorage.getItem('patientData');
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

        if (address !== null) {
            setAddress(address);
        }

        if (phone !== null) {
            setMobileNumber(phone);
        }

        if (state !== null) {
            setUserState(state);
        }

        if (city !== null) {
            setCity(city);
        }

        if (pincode !== null) {
            setPincode(pincode);
        }

        if (zone !== null) {
            setUserZone(zone);
        }




        // if (patientData !== null) {
        

        //     const first_name = patientData.first_name;
        //     const middle_name = patientData.middle_name;
        //     const last_name = patientData.last_name;
        //     const email = patientData.email;
        //     const address = patientData.address;
        //     const phone = patientData.mobile;
        //     const state_new = patientData.state;
        //     const pincode = patientData.pincode;
        //     const city = patientData.city;
        //     const zone = patientData.zone;
 
        //     const full_name = first_name+ ' '+middle_name+' '+last_name;

        //     setUsername(first_name);
        //     setUserlastname(last_name);
        //     setEmailId(email);
        //     setAddress(address);
        //     setMobileNumber(phone);
        //     setUserState(state_new);
        //     setCity(city);
        //     setPincode(state_new);
        //     setUserZone(zone);

        // }


      } catch (e) {
       // alert('Failed to fetch the input from storage');
      }


}; 


// const getProfileDetailsOld = async () => {

//    let axiosConfig = {
//               headers: {
//                   "Content-Type": "application/x-www-form-urlencoded",
//               }
//             };
//             const body = { patient_id: patientId };

//             axios.post(API_URL+'front/api/get_patient_detail', body, axiosConfig)
//              .then((responseJson) => {

//                         //console.log("patientId:"+patientId);
//                         const first_name = responseJson.data.data.first_name;
//                         const middle_name = responseJson.data.data.middle_name;
//                         const last_name = responseJson.data.data.last_name;
//                         const email = responseJson.data.data.email;
//                         const address = responseJson.data.data.address;
//                         const phone = responseJson.data.data.mobile;
//                         const state_new = responseJson.data.data.state;
//                         const pincode = responseJson.data.data.pincode;
//                         const city = responseJson.data.data.city;
//                         const zone = responseJson.data.data.zone;
//                         const full_name = first_name+ ' '+middle_name+' '+last_name;

//                         setUsername(first_name);
//                         setUserlastname(last_name);
//                         setEmailId(email);
//                         setAddress(address);
//                         setMobileNumber(phone);
//                         setUserState(state_new);
//                         setCity(city);
//                         setPincode(state_new);
//                         setUserZone(zone);


//                     })
               
//              .catch(err => console.log('GET PROFILE n: ', err));

// };


 const updateProfile = () => {

 // alert("ok");
    // Function to get the value from AsyncStorage
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };

            let patient_id_post = patientId;
            let first_name_post = username;
            let last_name_post = userlastname;
            let emailId_post = emailId;
            let address_post = address;
            let mobileNumber_post = mobileNumber;
            let country_post = '231';
            let city_post = city;
            let State_post = State;
            let pincode_post = pincode;
            let zone_post = Zone;

           // alert("Zone"+zone_post);

             const body = { patient_id: patient_id_post, first_name:first_name_post,last_name:last_name_post, email:emailId_post,address:address_post, mobile:mobileNumber_post, country:country_post, state:State_post, city:city_post,pincode:pincode_post,zone:zone_post};

             // console.log(body);
             // return;

            axios.post(API_URL+'front/api/edit_basic_information', body, axiosConfig)
             .then((responseJson) => {

                  if(responseJson.data.status == "success")
                  {
                    Alert.alert(
                      'Sucess',
                      'Profile Update Successfully',
                      [
                        {text: '', onPress: () => navigation.navigate("AccountScreen")},
                      ],
                      {cancelable: false},
                    );
                  }
                })
             .catch(err => console.log('UPDATE PROFIlE API: ', err));
        };



    useEffect(() => {
        navigation.addListener('focus', () => {
            setDisplayAlert(0);
        });
      
      getPatientId();
      getAllStates();
      getAllCities();
      getProfileDetails();
       

    }, []);
    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#e3f2f0" />
            <View style={Styles.setbgcolorthe}>
                <View style={Style.setheaderspacepadding}>
                    {/* <AppHeader leftImage={images.back_image} title='Edit' onLeftPress={() => navigation.goBack()} /> */}
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        height: 'auto'
                    }}>
                    <View style={Styles.container}>
                        <View style={Style.minviewallcontent}>
                       
                            <Input
                                placeholder={Strings.register.name_hint}
                                onChangeText={(user_name) => setUsername( user_name)}
                                value={username}
                                inputStyle={Style.inputMobile}
                                 onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                  alert("okk")
                                }
                                
                              }}
                            />
                            <Input
                                placeholder={Strings.register.last_name_hint}
                                onChangeText={(text) => onChangeText(text, 'user_name')}
                                value={userlastname}
                                inputStyle={Style.inputMobile}
                            />
                            <Input
                                placeholder={Strings.register.email_hint}
                                onChangeText={(text) => onChangeText(text, 'emaiId')}
                                value={emailId}
                                inputStyle={Style.inputMobile}
                            />

                             <Input
                                placeholder="Address"
                                onChangeText={(text) => onChangeText(text, 'address')}
                                value={address}
                                inputStyle={Style.inputMobile}
                            />

                            <TextInput
                                placeholder={Strings.register.mobile_number_hint}
                                value={mobileNumber}
                                onChangeText={(text) => onChangeText(text, 'mobile')}
                                keyboardType="numeric"
                                style={Style.numberinputMobile}
                            />
                           
                            <View style={Styles.inputviewstyle}>
                                 <Dropdown
                                    style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={StateData}
                                      search
                                      maxHeight={200}
                                      labelField="label"
                                      valueField="value"
                                      placeholder={!isFocus ? 'Select States' : '...'}
                                      placeholderTextColor="black" 
                                      searchPlaceholder="States..."
                                      value={State}
                                      onFocus={() => setIsFocus(true)}
                                      onBlur={() => setIsFocus(false)}
                                      onChange={item => {
                                        setUserState(item.value);
                                        setIsFocus(true);
                                      }}
                                     
                                    />
                               </View>

                            <View style={Styles.inputviewstyle}>
                               
                                  <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={cityData}
                                      search
                                      maxHeight={200}
                                      labelField="label"
                                      valueField="value"
                                      placeholder={!isFocus ? 'Select City' : '...'}
                                      placeholderTextColor="black" 
                                      searchPlaceholder="Cities..."
                                      value={city}
                                      onFocus={() => setIsFocus(true)}
                                      onBlur={() => setIsFocus(false)}
                                      onChange={item => {
                                        setCity(item.value);
                                        setIsFocus(true);
                                      }}
                                     
                                    />
                               
                            </View>
                             <View style={Styles.inputviewstyle}>
                                <TextInput
                                    placeholder={Strings.register.pincode_hint}
                                    onChangeText={(text) => onChangeText(text, 'pincode')}
                                    value={pincode}
                                    keyboardType={"numeric"}
                                    style={Style.numberinputMobile}
                                />
                             </View>
                            <View style={Styles.setbuttonview}>
                                <Button
                                    title={Strings.ChangePassword.update}
                                    onPress={() => { updateProfile() }}
                                    style={Styles.button} />
                            </View>
                            
                        </View>
                    </View>
                </ScrollView>
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                />
            </View>
        </Container >
    );
};

const styles = StyleSheet.create({

     dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#ffffff',
      borderRadius:10,
      marginTop: 12,
      marginBottom: 12,
      width:'100%'
    },

    Zonedropdown: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
      borderRadius:10,
      marginTop: 0,
      width:'100%'

    },

    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: '#ccc',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },

    placeholderStyle: {
      fontSize: 16,
      color: '#ccc',
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
      
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    label_style:{
      textAlign: 'left'

    },

});    

