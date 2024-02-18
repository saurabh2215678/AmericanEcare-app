import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Pressable, StyleSheet,Alert} from 'react-native';
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
    const [genderData, setgenderData] = useState([]);
    const [Zone, setUserZone] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [patientId, setpatientId] = useState(""); 

  const [selectedDate, setSelectedDate] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

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






    useEffect(() => {
        navigation.addListener('focus', () => {
            setDisplayAlert(0);
        });
      
      getPatientId();
      getAllStates();
      getAllCities();
      setgenderData([{ label: 'Male', value: 'male' },{ label: 'Female', value: 'female' },{ label: 'Other', value: 'other' }]);;
       

    }, [navigation,getPatientId]);
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
                      <Text style={styles.label}>Select DOB:</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          onChangeText={(inputText) => setText(inputText)}
                          value={selectedDate}
                          onFocus={showDatePicker}
                          placeholder="Type here..."
                          placeholderTextColor="#777"
                        />
                        <TouchableOpacity onPress={showDatePicker}>
                          <Icon name="calendar" size={20} color="#000" style={styles.calendarIcon} />
                        </TouchableOpacity>


                          


                      </View>


                    


                      <DateTimePickerModal
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />



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
    fontSize: 18,
    marginBottom: 8,
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

  Genderdropdown: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
      borderRadius:10,
      marginTop: 0,
      width:'100%'

    },


});    

