import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground,Alert,Linking,TouchableOpacity,SafeAreaView,Modal,FlatList,RefreshControl} from 'react-native';
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
//import CheckBox from 'react-native-check-box'
import Checkbox from 'expo-checkbox';

const HippaScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    
    const [insurance_name, setinsurance_name] = useState("");
    const [subscriber_name, setsubscriber_name] = useState("");
    const [identification_no, setidentification_no] = useState("");
    const [group_no, set_group_no] = useState("");
    const [sysbolic_bp, set_sysbolic_bp] = useState("");
    const [rx_bin, set_rx_bin] = useState("");
    const [rx_pcn, set_rx_pcn] = useState("");
    const [rx_grp, set_rx_grp] = useState("");
    const { request_type} = route.params;


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
  navigation.navigate("DocumentScreen",{request_type: request_type});
}


const onRefresh = () => {
    // setAllergyApi([]);
    // getPatientAllergy();
  };

useEffect(() => {
  getPatientId();
 }, [patientId]);

    
  return (

  	  <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
           
                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title="Hippa Authorisation"
                        onLeftPress={() => navigation.navigate('TermScreen',{request_type: request_type})} />
                </View>
                <ScrollView>
                    <View style={Styles.screenContainer}>
                      
                          
                          <Text style={styles.paragraph}>1.  Provide you services and treatment</Text>
                      

                        <Text style={styles.paragraph}>2.  Release your records to insurance company(ies), when applicable. Some insurance plans require medical records before paying for services.</Text>

                        <Text style={styles.paragraph}>3. Release information to those assigned to manage the patient's billing.</Text>

                        <Text style={styles.paragraph}>4. Release records to accrediting and quality organizations, regulatory agencies, or other persons or entities for health care operations to ensure quality care is being delivered.</Text>

                         <Text style={styles.paragraph}>5. Release records to share information with providers or staff involved with the patient's care.</Text>

                          <Text style={styles.paragraph}>6. Release information to American Ecare marketing individuals or affiliates who can provide the patient with information regarding available services and goods.</Text>

                           <Text style={styles.paragraph}>7. Work with your insurance company(ies) to share past, current and future information strictly for the purposes of managing and coordinating your care or improving the quality of that care.</Text>

                           <Text style={styles.paragraph}>8.  Elect to opt in or out of the health information exchange (HIE).</Text>

                           <Text style={styles.paragraph}>9. Receive payment directly from you if you don’t have insurance or your insurance is not listed in our website.</Text>

                            <Text style={styles.paragraph}>10. Receive copayment directly from you.</Text>

                            <Text style={styles.paragraph}>11. Receive discounted payment directly from you.</Text>

                            <Text style={styles.paragraph}>12. Receive payment directly from insurers, when applicable.</Text>

                            <Text style={styles.paragraph}>13. Send request to your insurer for insurance approvals, pre-certification and prior authorization.</Text>

                            <Text style={styles.paragraph}>14. Give you a pre-estimate before your doctor visit..</Text>



                       

                   
                       
                   
                    </View>
                </ScrollView>
            

             
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

export default HippaScreen;