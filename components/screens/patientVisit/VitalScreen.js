import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground,Alert,Keyboard,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableOpacity,SafeAreaView,Modal,FlatList,RefreshControl} from 'react-native';
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

const VitalScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [AllergyApi, setAllergyApi] = useState([]);
    const [keyword, setkeyword] = useState("");
    const [weight, setWeight] = useState("");
    const [heightinFeet, setheightinFeet] = useState("");
    const [heightinInch, setheightinInch] = useState("");
    const [HightinFeetData, setHightinFeetData] = useState([]);
    const [HightinInchData, setHightinInchData] = useState([]);
    const [heightinCm, setheightinCm] = useState("");
    const [bmi, setbmi] = useState("");
    const [sysbolic_bp, set_sysbolic_bp] = useState("");
    const [diastolic_bp, set_diastolic_bp] = useState("");
    const [temp, set_temp] = useState("");
    const [pulse, set_pulse] = useState("");
    const [o2set, set_o2set] = useState("");
    const [patientId, setpatientId] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const { request_type} = route.params;


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
        let height_in_cm = responseJson.data.height_in_cm;
        //alert(api_bmi);
        setbmi(api_bmi);
        setheightinCm(height_in_cm);
        



      }
      else
      {
        alert("Please Enter Hight and Weight value correctly");
      }


    })
    .catch(err => console.log('GET BMI API: ', err));


};  


 submitVital= ()=>{

  AsyncStorage.setItem("weight", weight);
  AsyncStorage.setItem("height_in", heightinInch);
  AsyncStorage.setItem("height_ft", heightinFeet);
  AsyncStorage.setItem("bmi", JSON.stringify(bmi));
  AsyncStorage.setItem("bp_low", sysbolic_bp);
  AsyncStorage.setItem("bp_high", diastolic_bp);
  AsyncStorage.setItem("temprature", temp);
  AsyncStorage.setItem("pulse", pulse);
  AsyncStorage.setItem("o2sat", o2set);


  navigation.navigate("DocumentScreen",{request_type: request_type});
}


const onRefresh = () => {
    // setAllergyApi([]);
    // getPatientAllergy();
  };



useEffect(() => {
  getPatientId();
  //getBMI();
  // get_allergy_by_keywords();
  // getListOfReaction();

  setHightinFeetData([{ label: '1', value: '1' },{ label: '2', value: '2' },{ label: '3', value: '3' },{ label: '4', value: '4' },{ label: '5', value: '5' },{ label: '6', value: '6' },{ label: '7', value: '7' },{ label: '8', value: '8' },{ label: '9', value: '9' }]); 

  setHightinInchData([{ label: '1', value: '1' },{ label: '2', value: '2' },{ label: '3', value: '3' },{ label: '4', value: '4' },{ label: '5', value: '5' },{ label: '6', value: '6' },{ label: '7', value: '7' },{ label: '8', value: '8' },{ label: '9', value: '9' },{ label: '10', value: '10' },{ label: '11', value: '11' }]);  


}, [patientId]);

    
  return (

  	  <Container>
        
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>

                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title="Add vital signs if available"
                        onLeftPress={() => navigation.navigate('AllergyScreen',{request_type: request_type})} />
                </View>

       
               
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        
                    }}>
                    <View style={Styles.container_vital}>
                        <View style={Style.minviewallcontent}>

                          <Input
                              placeholder="Weight in Pound (lb)"
                              onChangeText={(weight) => setWeight(weight)}
                              value={weight}
                              inputStyle={Style.inputMobile}
                          />
                            
                 
                       <View style={Styles.inputviewstyle}>
                               
                         <Dropdown
                              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                              placeholderStyle={styles.placeholderStyle}
                              selectedTextStyle={styles.selectedTextStyle}
                              inputSearchStyle={styles.inputSearchStyle}
                              iconStyle={styles.iconStyle}
                              data={HightinFeetData}
                              search
                              maxHeight={200}
                              labelField="label"
                              valueField="value"
                              placeholder={!isFocus ? 'Select Hight in Feet' : '...'}
                              placeholderTextColor="#fff" 
                              searchPlaceholder="Select Hight in Feet..."
                              value={value}
                              onFocus={() => setIsFocus(true)}
                              onBlur={() => setIsFocus(false)}
                              onChange={item => {
                                setheightinFeet(item.value);
                                setIsFocus(false);
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
                        data={HightinInchData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Hight in Inch' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="Select Hight in Inch..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          getBMI(item.value);
                          setIsFocus(false);
                        }}
                      />
              </View> 
              

              
               <Input
                    placeholder="Height in CM"
                    onChangeText={(heightinCm) => setheightinCm(heightinCm)}
                    value={String(heightinCm)}
                    inputStyle={Style.inputMobile}
                 />

                <Input
                      placeholder="BMI"
                      onChangeText={(bmi) => setbmi(bmi)}
                      value={String(bmi)}
                      inputStyle={Style.inputMobile}
                  />

                  <Input
                      placeholder="Sysbolic BP"
                      onChangeText={(sysbolic_bp) => set_sysbolic_bp(sysbolic_bp)}
                      value={sysbolic_bp}
                      inputStyle={Style.inputMobile}
                  />

                  <Input
                      placeholder="Diastolic BP"
                      onChangeText={(diastolic_bp) => set_diastolic_bp(diastolic_bp)}
                      value={diastolic_bp}
                      inputStyle={Style.inputMobile}
                  />

                  <Input
                      placeholder="Temp"
                      onChangeText={(temp) => set_temp(temp)}
                      value={temp}
                      inputStyle={Style.inputMobile}
                  />

                  <Input
                      placeholder="Pulse"
                      onChangeText={(pulse) => set_pulse(pulse)}
                      value={pulse}
                      inputStyle={Style.inputMobile}
                  />

                  <Input
                      placeholder="O2Sat"
                      onChangeText={(o2set) => set_o2set(o2set)}
                      value={o2set}
                      inputStyle={Style.inputMobile}
                  />

                           
                  <Button
                      title="Next"
                      onPress={() => this.submitVital()}
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

export default VitalScreen;