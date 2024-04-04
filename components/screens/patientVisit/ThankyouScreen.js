import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground,Alert,Linking,TouchableOpacity,SafeAreaView,Modal,FlatList,RefreshControl,Image} from 'react-native';
import {Container,AppHeader,Input,Button} from '../components';
import Styles from '../styles/ThanksScreenStyle/ThanksScreenStyle';
import Style from '../styles/CommonStyle/Style';
import images from '../images';
//import { useSelector } from "react-redux";
import { SH, Strings } from '../utils';
import { Dropdown } from 'react-native-element-dropdown';
//import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
//import CheckBox from 'react-native-check-box'
import Checkbox from 'expo-checkbox';

const ThankyouScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
    const colorrdata  = '#013220';
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    
    const [insurance_name, setinsurance_name] = useState("");
    const [subscriber_name, setsubscriber_name] = useState("");
    const [identification_no, setidentification_no] = useState("");
    const [group_no, set_group_no] = useState("");
    const [sysbolic_bp, set_sysbolic_bp] = useState("");
    const [rx_bin, set_rx_bin] = useState("");
    const [rx_pcn, set_rx_pcn] = useState("");
    const [rx_grp, set_rx_grp] = useState("");
    // const { request_type} = route.params;


    const [patientId, setpatientId] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const [isChecked, setChecked] = useState(false);


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


const getBMI = (heightinInch)=>{

     let height_inch = heightinInch;
     let axiosConfig = {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          }
        };
      const body = { height_in: height_inch, height_ft:heightinFeet, weight:weight };

      axios.post(API_URL+'front/api/get_bmi', body, axiosConfig)
             .then((responseJson) => {

      var status = responseJson.data.status ;
      if(status == "success")
      {
        let api_bmi = responseJson.data.bmi;
        setbmi(api_bmi);
      }
      else
      {
        alert("Please Enter Hight and Weight value correctly");
      }


    })
    .catch(err => console.log('GET BMI API: ', err));


};  


 submitVital= ()=>{
  // navigation.navigate("DocumentScreen",{request_type: request_type});
}


const onRefresh = () => {
    // setAllergyApi([]);
    // getPatientAllergy();
  };

useEffect(() => {
  getPatientId();
 }, [patientId]);

    
  return (

  	  <Container backgroundColor="#e3f2f0">
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={Style.setheaderspacepadding}>
                
            </View>
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <ScrollView
                    contentContainerStyle={{
                        height: 'auto',
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                    }}>
                    <View style={Styles.container}>
                        <Image source={images.Doctore_width__100}
                            style={Styles.smaili}
                            resizeMode={'stretch'} />
                        <Text style={Styles.title}>{Strings.thankYou.title}</Text>
                        <Text style={Styles.textStyle}>Your Doctor Visit request has been done successfully. Our doctor will send you a video link to start the visit</Text>
                        <View style={Styles.smailitextminview} />

                          <View style={Style.minviewallcontent}>
                         <Button title="Go to Dashboard" onPress={() => navigation.navigate("DashboardScreen")}
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
    color: 'red',
    fontWeight: '700',
  },
dropdown: {
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
 modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e3f2f0',
    padding: 30,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  card_container: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 0,
    
  },
    paragraph: {
      fontSize: 15,
      padding:10
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
},

section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
 checkbox: {
    margin: 0,
  },
});

export default ThankyouScreen;