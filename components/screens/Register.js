import React,{useState, createRef,useEffect} from 'react'
import { View, Button, Text, ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, TouchableOpacity,SafeAreaView,ImageBackground,StyleSheet,TextInput,Pressable,Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
//import Loader from './Components/Loader';
//import CalendarPicker from the package we installed
//import {CalendarPicker} from 'react-native-calendar-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SH, Strings } from './utils';
import Icon from 'react-native-vector-icons/FontAwesome';
//import { Dropdown } from 'react-native-material-dropdown';

const Register = ({navigation}) => {

 // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const MAIN_URL = Strings.baseUrl.main_url;
  const API_URL = Strings.baseUrl.url;
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



 const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  ;

   
  // const [FirstName, setUserFirstName] = useState('');
  // const [MiddleName, setUserMiddleName] = useState('');
  // const [LastName, setUserLastName] = useState('');
  const [Mobile, setUserMobile] = useState('');
  const [Email, setUserEmail] = useState('');
  const [Password, setUserPassword] = useState('');
  const [Dob, setUserDob] = useState('');
  const [StateData, setUserStateData] = useState([]);
  const [State, setUserState] = useState('');
  const [ZoneData, setUserZoneData] = useState([]);
  const [Zone, setUserZone] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);


  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  useEffect(() => {
        var config = {
          method: 'get',
          url: API_URL+`front/api/all_state`,
         // url: API_URL+`api/all_state`,
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
        };

    axios(config)
      .then(response => {
       // console.log(JSON.stringify(response.data.data));
        var count = Object.keys(response.data.data).length;
        let stateArray = [];
        for (var i = 0; i < count; i++) {
          stateArray.push({
            label: response.data.data[i].state_name,
            value: response.data.data[i].state_id,
          });
        }
       // console.log(JSON.stringify(stateArray));


        setUserZoneData([{ label: 'Central', value: '2' },{ label: 'Eastern', value: '1' },{ label: 'Pacific', value: '3' },{ label: 'South', value: '4'}]);

        setUserStateData([{"value":"3919","label":"Alabama"},{"value":"3920","label":"Alaska"},{"value":"3921","label":"Arizona"},{"value":"3922","label":"Arkansas"},{"value":"3924","label":"California"},{"value":"3926","label":"Colorado"},{"value":"3927","label":"Connecticut"},{"value":"3928","label":"Delaware"},{"value":"3930","label":"Florida"},{"value":"3931","label":"Georgia"},{"value":"3932","label":"Hawaii"},{"value":"3933","label":"Idaho"},{"value":"3934","label":"Illinois"},{"value":"3935","label":"Indiana"},{"value":"3936","label":"Iowa"},{"value":"3937","label":"Kansas"},{"value":"3938","label":"kentucky"},{"value":"3939","label":"Louisiana"},{"value":"3941","label":"Maine"},{"value":"3942","label":"Maryland"},{"value":"3943","label":"Massachusetts"},{"value":"3945","label":"Michigan"},{"value":"3946","label":"Minnesota"},{"value":"3947","label":"Mississippi"},{"value":"3948","label":"Missouri"},{"value":"3949","label":"Montana"},{"value":"3950","label":"Nebraska"},{"value":"3951","label":"Nevada"},{"value":"3952","label":"New Hampshire"},{"value":"3954","label":"New Jersey"},{"value":"3955","label":"New Mexico"},{"value":"3956","label":"New York"},{"value":"3957","label":"North Carolina"},{"value":"3958","label":"North Dakota"},{"value":"3959","label":"Ohio"},{"value":"3960","label":"Oklahoma"},{"value":"3962","label":"Oregon"},{"value":"3963","label":"Pennsylvania"},{"value":"3965","label":"Rhode Island"},{"value":"3966","label":"South Carolina"},{"value":"3967","label":"South Dakota"},{"value":"3969","label":"Tennessee"},{"value":"3970","label":"Texas"},{"value":"3972","label":"Utah"},{"value":"3973","label":"Vermont"},{"value":"3974","label":"Virginia"},{"value":"3975","label":"Washington"},{"value":"3976","label":"West Virginia"},{"value":"3977","label":"Wisconsin"},{"value":"3978","label":"Wyoming"},{"value":"4129","label":"Washington DC"}]);
      })
      .catch(error => {
        console.log(error);
      
      });
  }, []);


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

  const handleSubmitButton = async () => {
    setErrortext('');
    const csrfToken = await getCSRFToken();
  
   

    if (!Email) {
      alert('Please fill Email');
      return;
    }
    // if (!Mobile) {
    //   alert('Please fill Mobile');
    //   return;
    // }
  
    if (!Password) {
      alert('Please fill Password');
      return;
    }

     if (!State) {
      alert('Please Choose State');
      return;
    }

     if (!Zone) {
      alert('Please Choose Zone');
      return;
    }

     let axiosConfig = {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
      }
    };


    //Show Loader
    setLoading(true);
    var dataToSend = {
      email: Email,
      mobile: Mobile,
      password: Password,
      dob: selectedDate,
      city: '24210',
      state: State,
      zone: Zone,
    };

   // console.log(dataToSend);


    axios.post(API_URL+'front/api/patient_main_register', dataToSend,axiosConfig)
    .then((responseJson) => {
      var status = responseJson.data.status ;
       if (status === 'success') {
       setLoading(false);
       
        Alert.alert(
          'Success',
          'Registration Successful. Please Login to proceed', 
          [
            {text: 'ok', onPress: () => navigation.navigate("Login")},
          ],
          {cancelable: false},
        );

       }

       else 
       {
          setLoading(false);
          alert(responseJson.data.msg);
       }
    

    })
    .catch(err => console.log('Error: ', err));


  
  };



    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
        
          <SafeAreaView style={{ flex: 1 }}>
             <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

           <ImageBackground
            source={require("../../assets/app_images/doctor_login.png")}
            style={{ width: "100%", height: "100%",backgroundColor: 'black' }}
            imageStyle={{ opacity: 0.5}}>
         
        <View style={{ flex: 1,justifyContent:'center' }}>
          <View style={styles.wrapper}>

           <View style={styles.inputWrap}>
            <TextInput
              placeholder="Email Address"
              onChangeText={(Email) => setUserEmail(Email)}
              placeholderTextColor="#fff" 
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Password"
              onChangeText={(Password) => setUserPassword(Password)}
               placeholderTextColor="#fff" 
              secureTextEntry
              style={styles.input}
            />
          </View>
     
          

          <View style={styles.inputWrap}>
            <TextInput
              placeholder="Select DOB"
              style={styles.input}
              value={selectedDate}
              onFocus={showDatePicker}
            />
            <TouchableOpacity onPress={showDatePicker}>
               <Icon name="calendar" size={20} color="#fff" style={{ padding: 10 }} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={datePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>


           

          
           <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
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
              placeholderTextColor="#fff" 
              searchPlaceholder="Search States..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setUserState(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
         
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
              valueField="value"
              placeholder={!isFocus ? 'Select Zones' : '...'}
              placeholderTextColor="#fff" 
              searchPlaceholder="Zones..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setUserZone(item.value);
                setIsFocus(true);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />


          <TouchableOpacity onPress={handleSubmitButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{loading ? 'Loading..' : 'Register'}</Text>
            </View>
          </TouchableOpacity>

           <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("Login")}>
            <View>
              <Text style={styles.registerText}>Already have an Account? <Text style={{fontWeight: "bold"}}> Login</Text></Text>
            </View>
          </TouchableOpacity>
        

         </View>
         </View> 
         </ImageBackground>

          </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
        </SafeAreaView>
         
      
     
     
    )
}

const styles = StyleSheet.create({
      imageBackground: {
        height: '100%',
        width: '100%',
     },
     container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 1)',
      },
      innerContainer: {
        flex: 1,
        
      },
       background: {
        width: null,
        height: null,
      },
  wrapper: {
    paddingHorizontal: 20,
   
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
     borderRadius:10
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#831c81",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18
  },
  forgotPasswordText: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "right"
  },

   registerText: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 18
  },

   dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#C0C0C0',
      borderRadius:10
    },

    Zonedropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#C0C0C0',
      borderRadius:10,
      marginTop: 20,

    },

    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },

    placeholderStyle: {
      fontSize: 16,
      color: 'white',
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
    datePickerStyle: {
    width: 200,
    marginTop: 20,
  },




});

export default Register;