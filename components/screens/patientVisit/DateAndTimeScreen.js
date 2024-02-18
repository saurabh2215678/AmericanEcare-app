import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,StatusBar,ScrollView,SafeAreaView, Pressable,ImageBackground,Image,FlatList,  TouchableOpacity,Alert } from 'react-native';
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
import { Card,RadioButton } from 'react-native-paper';
const DateAndTimeScreen = ({navigation}) => {
  const API_URL = Strings.baseUrl.url;
   const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [dependentData, setDependentData] = useState([]);
    const [Dependent, setDependent] = useState([]);
    const [currentDate, setcurrentDate] = useState('');
    const [currentTime, setcurrentTime] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [patientId, setpatientId] = useState("");
    const [dependentApi, setdependentApi] = useState([]);

    const [isChecked1, setChecked1] = useState(false);

    const navigation_url = 'DashboardScreen';

    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ];

const Item = ({title,dob}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

useEffect(() => {
     setDependentData([{ label: 'Self', value: '0' },{ label: 'Spouse', value: 'Spouse' },{ label: 'Daughter', value: 'Daughter' },{ label: 'Son', value: 'Son'}]);
     getCurrentDateTime();
     getPatientId();
     getPatientDependent();
   // alert(patientId)
     //alert(Dependent);

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


 const getPatientDependent =  () => {
    //const csrfToken = await getCSRFToken();

    // Function to get the value from AsyncStorage
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  //'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_dependent', body, axiosConfig)
             .then((responseJson) => {

                  var dependent_count = Object.keys(responseJson.data.data).length;
                  let dependentArray = [];
                  for (var i = 0; i < dependent_count; i++) {
                    dependentArray.push({
                      id: responseJson.data.data[i].id,
                      dependent_first_name: responseJson.data.data[i].dependent_first_name,
                      dependent_dob: responseJson.data.data[i].dependent_dob,
                      dependent_relationship: responseJson.data.data[i].dependent_relationship,
                    });
                  }
               // setCityData(cityArray);  
               //console.log(dependentArray); 
               setdependentApi(dependentArray);

                })
             .catch(err => console.log('Patient Dependent API: ', err));
        };



 submitVisit=()=>{
 
   AsyncStorage.setItem("booking_date", currentDate);
   AsyncStorage.setItem("booking_time", currentTime);

    if(Dependent != 0)
    {
        navigation.navigate("DependentScreen",{
          dependent_val: Dependent,
        });
    }
    else
    {
     //navigation.navigate("SelectProviderScreen");
      navigation.navigate("SelectProviderScreen",{
          request_type: 1,
          appointment_date: ''
        });
    }
 }


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

const delete_dependent_box =(id)=>{
 // alert("o");

  return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            delete_dependent(id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
}



const delete_dependent =  (id)=>{

   //const csrfToken = await getCSRFToken();

  let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  //'X-CSRF-TOKEN': csrfToken, // Include the CSRF token here
              }
            };
  const body = { dependent_id: id };

   axios.post(API_URL+'front/api/delete_dependent', body, axiosConfig)
             .then((responseJson) => {

                if(responseJson.status == 200)
                  {
                    Alert.alert(
                      'Sucess',
                      'Delete Successfully',
                      [
                        {text: '', onPress: () => refreshDependent()},
                      ],
                      {cancelable: false},
                    );
                  }
            })
             .catch(err => console.log('Delete Dependent API: ', err));
};


refreshDependent=(is_delete="")=>{
   getPatientDependent();
   navigation.navigate("DateAndTimeScreen")
}


const choose_dependent=(dependent_id)=>{
  AsyncStorage.setItem("dependent_id", dependent_id);
  navigation.navigate("SelectProviderScreen",{
          request_type: 1,
   });
}

const getCurrentDateTime=()=>{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var time = new Date().toLocaleTimeString();
      var current_date  = month+'-'+date+'-'+year;
      setcurrentDate(current_date);
      setcurrentTime(time);
}

const height = "flexDirection: 'column',justifyContent: 'flex-start',alignContent: 'flex-start',height: '100%'"
   
  return (

  	 <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title="Start visit Now"
                        onLeftPress={() => navigation.navigate(navigation_url)} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        
                    }}>
                    <View style={Styles.container}>
                        <View style={Style.minviewallcontent}>

                            <Text style={Styles.lableTextStyle}>Date</Text>
                            <Input
                                placeholder="Date"
                                onChangeText={(text) => onChangeText(text, 'currentPassword')}
                                value={currentDate}
                                inputStyle={Style.inputMobile}
                            />
                            <Text style={Styles.lableTextStyle}>Time</Text>
                            <Input
                                placeholder="Time"
                                onChangeText={(text) => onChangeText(text, 'newPassword')}
                                value={currentTime}
                                inputStyle={Style.inputMobile}
                            />
                             <Text style={Styles.lableTextStyle}>Select self or dependent</Text>
        <View style={Styles.inputviewstyle}>
                               
                <Dropdown
                  style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={dependentData}
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
                                 setDependent(item.value);
                                 setIsFocus(true);
                               }}/>
                               
                            </View>
                            <Button
                                title="Next"
                                onPress={() => this.submitVisit()}
                                style={Styles.button} />

                              

                        </View>
                       
                    </View>
                </ScrollView>
            </ImageBackground>

              <SafeAreaView style={styles.container}>
                    <FlatList
                      data={dependentApi}
                      renderItem={({item}) =>  (
                       <View style={styles.listitems}>
                          <Text>
                             Name: {item.dependent_first_name} {"\n"}
                             DOB: {item.dependent_dob}{"\n"}
                             Relation: {item.dependent_relationship}{"\n"}
                          </Text>

                         <TouchableOpacity onPress={()=>choose_dependent(item.id)}><Text>Choose this</Text></TouchableOpacity>
                         
                          <TouchableOpacity onPress={()=>delete_dependent_box(item.id)}>
                            <View style={styles.button_two}>
                              <Text style={styles.buttonTextStyle}>Delete</Text>
                            </View>
                          </TouchableOpacity>
                        </View>)
                      }
                    />
              </SafeAreaView>
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

  card_container: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 0,
    
  },
    paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20
    },
    item: {
    backgroundColor: '#eee',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  item_delete:{
    width:'10%',
    fontSize: 28,
  },

   button_delete:{
   padding: 10,
   backgroundColor: '#eee',
  },

   buttonTextStyle: {
    color: 'red',
    fontWeight: '700',
  },
    buttonText: {
    color: "#FFF",
    fontSize: 12
  },

  listitems: {
    width: "100%",
    flex:1,
    marginTop: 5,
    backgroundColor: "#eee",
    padding: 10,
    flexDirection: 'row',
    justifyContent:'space-between'
},
button_two: {
    width: "100%",
    alignItems: 'flex-end',
}


});

export default DateAndTimeScreen;