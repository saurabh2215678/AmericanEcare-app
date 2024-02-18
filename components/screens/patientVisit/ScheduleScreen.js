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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import IconG from 'react-native-vector-icons/Ionicons';
import { Card,RadioButton } from 'react-native-paper';
const ScheduleScreen = ({navigation}) => {
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
    const [visitDate, setvisitDate] = useState("");

    const [isChecked1, setChecked1] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timeData, setTimeData] = useState([]);
    const [timeval, setTimeval] = useState([]);

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

    const navigation_url = 'DashboardScreen';

    const DATA = [
      {
        label: '01:00 AM',
        value: '01:00:00',
      },
      {
        label: '02:00 AM',
        value: '02:00:00',
      },
      {
        label: '03:00 AM',
        value: '03:00:00',
      },
      {
        label: '04:00 AM',
        value: '04:00:00',
      },
      {
        label: '05:00 AM',
        value: '05:00:00',
      },
      {
        label: '06:00 AM',
        value: '06:00:00',
      },
      {
        label: '07:00 AM',
        value: '07:00:00',
      },
      {
        label: '08:00 AM',
        value: '08:00:00',
      },
      {
        label: '09:00 AM',
        value: '09:00:00',
      },
      {
        label: '10:00 AM',
        value: '10:00:00',
      },
      {
        label: '11:00 AM',
        value: '11:00:00',
      },
      {
        label: '12:00 PM',
        value: '12:00:00',
      },
      {
        label: '01:00 PM',
        value: '13:00:00',
      },
      {
        label: '02:00 PM',
        value: '14:00:00',
      },
      {
        label: '03:00 PM',
        value: '15:00:00',
      },
      {
        label: '04:00 PM',
        value: '16:00:00',
      },
      {
        label: '05:00 PM',
        value: '17:00:00',
      },
      {
        label: '06:00 PM',
        value: '18:00:00',
      },
      {
        label: '07:00 PM',
        value: '19:00:00',
      },
      {
        label: '08:00 PM',
        value: '20:00:00',
      },
      {
        label: '09:00 PM',
        value: '21:00:00',
      },
      {
        label: '10:00 PM',
        value: '22:00:00',
      },
      {
        label: '11:00 PM',
        value: '23:00:00',
      },
       {
        label: '12:00 AM',
        value: '00:00:00',
      },
    ];

const Item = ({title,dob}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

useEffect(() => {
     setDependentData([{ label: 'Self', value: '0' },{ label: 'Spouse', value: 'Spouse' },{ label: 'Daughter', value: 'Daughter' },{ label: 'Son', value: 'Son'}]);

     setTimeData(DATA)

     getCurrentDateTime();
     getPatientId();
     getPatientDependent();
   // alert(patientId)
     //alert(Dependent);

}, [patientId]);


 const getPatientDependent = () => {
    // Function to get the value from AsyncStorage
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
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
             .catch(err => console.log('Dependent API (Schedule Screen): ', err));
        };



 submitVisit=()=>{
    if(Dependent != 0)
    {
        navigation.navigate("DependentScreen",{
          dependent_val: Dependent,
        });
    }
    else
    {
    // navigation.navigate("SelectProviderScreen");

     var year = selectedDate.getFullYear();
     var month = selectedDate.getMonth()+1;
     var date = selectedDate.getDate();

     if(month < 10)
     {
      month = '0'+month;
     }


     //var dob = year + '-'+month+'-'+date;
     var appointment_date = year+'-'+month+'-'+date+' '+timeval;
    // alert(appointment_date);
     navigation.navigate("SelectProviderScreen",{
          request_type: 0,
          appointment_date: appointment_date,
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



const delete_dependent =(id)=>{

  let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
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
             .catch(err => console.log('CITY API: ', err));
};


refreshDependent=(is_delete="")=>{
   getPatientDependent();
   navigation.navigate("DateAndTimeScreen")
}


const choose_dependent=(dependent_id)=>{
  AsyncStorage.setItem("dependent_id", dependent_id);
  navigation.navigate("SelectProviderScreen",{
          request_type: 0,
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
                        title="Schedule Visit"
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
                                placeholder="Appointment Date"
                                onChangeText={(visitDate) => setvisitDate(visitDate)}
                                value={selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                                inputStyle={Style.inputMobile}
                            />
                        
                    
              <TouchableOpacity onPress={()=>showDatePicker()}>
                <Text style={styles.buttonTextStyle}>Open Calender</Text>
             
            </TouchableOpacity>


                            <DateTimePickerModal
                             date={selectedDate}
                             isVisible={datePickerVisible}
                             mode="date"
                             onConfirm={handleConfirm}
                             onCancel={hideDatePicker}
                          />


                           <Text style={Styles.lableTextStyle}>Time</Text>
                         <View style={Styles.inputviewstyle}>
                               
                            <Dropdown
                              style={[styles.Zonedropdown, isFocus && { borderColor: 'blue' }]}
                               placeholderStyle={styles.placeholderStyle}
                               selectedTextStyle={styles.selectedTextStyle}
                               inputSearchStyle={styles.inputSearchStyle}
                               iconStyle={styles.iconStyle}
                               data={timeData}
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
                                 setTimeval(item.value);
                                 setIsFocus(true);
                               }}/>
                               
                            </View>


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

export default ScheduleScreen;