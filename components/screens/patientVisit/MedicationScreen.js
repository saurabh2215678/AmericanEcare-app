import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground,Alert,TouchableOpacity,SafeAreaView,Modal,FlatList,RefreshControl} from 'react-native';
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
import { Card } from 'react-native-paper';


const MedicationScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [dieaseData, setdieaseData] = useState([]);
    const [diease, setUserdiease] = useState([]);
    const [pastMedicationApi, setpastMedicationApi] = useState([]);
    const [keyword, setkeyword] = useState("");
    const [drugId, setdrugId] = useState(0);
    const [drugData, setdrugData] = useState([]);
    const [drugStrengthData, setdrugStrength] = useState([]);
    const [drugStrength, setUserdrugStrength] = useState([]);
    const [patientId, setpatientId] = useState("");
   
   // const [visitTypes, setuservisitTypes] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const { request_type} = route.params;



const get_all_drug_name = ()=>{

  let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      };
  const body = { search_keywords: keyword };
  
   axios.post(API_URL+'front/api/get_all_drug_name', body, axiosConfig)
             .then((responseJson) => {

    var drug_count = Object.keys(responseJson.data.data).length;
    let drugArray = [];
    for (var i = 0; i < drug_count; i++) {
      drugArray.push({
        label: responseJson.data.data[i].DrugName,
        value: responseJson.data.data[i].drug_id,
      });
    }
  

  setdrugData(drugArray);     

  })
.catch(err => console.log('Search drug: ', err));   

}


const getDrugStrength = (drug_id)=>{

setdrugId(drug_id)



let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      };
  const body = { drug_id: drug_id };
  
   axios.post(API_URL+'front/api/get_drug_strength', body, axiosConfig)
             .then((responseJson) => {
              //console.log(responseJson.data.data);

    var drugs_count = Object.keys(responseJson.data.data).length;
    let drugsArray = [];
    for (var i = 0; i < drugs_count; i++) {
      drugsArray.push({
        label: responseJson.data.data[i].dosage,
       // value: responseJson.data.data[i].DrugID,
        value: responseJson.data.data[i].dosage,
      });
    }
  

  setdrugStrength(drugsArray);     

  })
.catch(err => console.log('Search drug Strength: ', err)); 

}
  


const getPatienMedication = () => {
    // Function to get the value from AsyncStorage
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_medication', body, axiosConfig)
             .then((responseJson) => {

                  var history_count = Object.keys(responseJson.data.data).length;
                  let pastMedicationArray = [];
                  for (var i = 0; i < history_count; i++) {
                    pastMedicationArray.push({
                      id: responseJson.data.data[i].id,
                      medication_for: responseJson.data.data[i].medication_for,
                      name: responseJson.data.data[i].name,
                      external_id: responseJson.data.data[i].external_id,
                      drugs_id: responseJson.data.data[i].drugs_id,
                      drugs_name: responseJson.data.data[i].drugs_name,
                      strength: responseJson.data.data[i].strength,
                    });
                  }
               setRefreshing(false);
               setpastMedicationApi(pastMedicationArray);

                })
             .catch(err => console.log('pastMedicationArray API: ', err));
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




const onRefresh = () => {
    setpastMedicalHistoryApi([]);
    getPatienMedication();
  };

const saveMedicationHistory=()=>{
  //alert(diease);
   // navigation.navigate("ReasonScreen");
   // if(diease=="")
   // {
   //  alert("Please Select diease");
   // }

   // if(onset_age=="")
   // {
   //  alert("Please Enter Age");
   // }

  setLoading(true); // Set loading before sending API request

   let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
     };
   
     const body = {patient_id: patientId, DrugID:drugId, stength:drugStrength};

  

      axios.post(API_URL+'front/api/save_medication', body, axiosConfig)
             .then((responseJson) => {

              if(responseJson.status == 200)
              {
                   setLoading(false); // Stop loading
                   Alert.alert(
                      'Sucess',
                      'Medication has been saved Successfully',
                      [
                        {
                          text: '', 
                          onPress: () => this.refreshMedication()
                        },
                      ],
                      {cancelable: false},
                    );

              }
            })
         .catch(err => console.log('Medication API: ', err));

}

refreshMedication=(is_delete="")=>{
  if(is_delete!=1)
  {
     setShowModal(!showModal);
      setLoading(true); 
  }
  setLoading(false);
  
   getPatienMedication();
   navigation.navigate("MedicationScreen",{request_type: request_type});
}


const delete_past_medication_confirm =(id)=>{
  return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            delete_past_medication_history(id);
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

const delete_past_medication_history =(id)=>{

  let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
  const body = { id: id };

   axios.post(API_URL+'front/api/delete_medication', body, axiosConfig)
             .then((responseJson) => {

                if(responseJson.status == 200)
                  {
                    Alert.alert(
                      'Sucess',
                      'Delete Successfully',
                      [
                        {text: '', onPress: () => this.refreshMedication(1)},
                      ],
                      {cancelable: false},
                    );
                  }
               

            })
             .catch(err => console.log('Delete Medication API: ', err));

};



useEffect(() => {
//  alert(patientId);
  getPatientId();
  getPatienMedication();
  get_all_drug_name();
  getDrugStrength();
}, [patientId]);

    
  return (

  	 <Container  style={styles.fullContainer}>
          <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
                <View style={Style.setheaderspacepadding}>
                   <AppHeader
                        leftImage={images.back_image}
                        title="Medication"
                        onLeftPress={() => navigation.navigate('MedicalHistoryScreen',{request_type: request_type})} />
                </View>
               
          
             
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');

                  }}>
                 
                  <View style={styles.modal}>
                    <Text style={styles.text}>Add Medication</Text>

                  <Text></Text>

                  <Input
                      placeholder="Search Medication"
                      onChangeText={(keyword) => setkeyword(keyword)}
                      value={keyword}
                      inputStyle={Style.inputMobile}
                  />

                <TouchableOpacity onPress={()=>get_all_drug_name()}>
             
                <Text style={styles.buttonTextStyle}>Click to Search Drug</Text>
             
            </TouchableOpacity>




                     <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={drugData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Drugs' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="Search Drugs..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          getDrugStrength(item.value);
                          setIsFocus(false);
                        }}
                      />


                       <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={drugStrengthData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Strength' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="Search Strength..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setUserdrugStrength(item.value);
                          setIsFocus(false);
                        }}
                      />
  

                 


                    <Button
                      title={loading ? 'Loading...' : 'Save'}
                      onPress={() => {
                        saveMedicationHistory();
                      }}
                    />

                    <Text style={styles.text}></Text>


                    <Button
                      title="Cancel"
                      onPress={() => {
                        setShowModal(!showModal);
                      }}
                    />
                  </View>
                </Modal>
                {/*Updating the state to make Modal Visible*/}
                <View style={styles.btnWrapper}>
                  <View style={styles.btnInner}>
                    <Button
                      style={styles.buttonStyle}
                      buttonTextStyle={styles.buttonTextStyle}
                      title="Add Medication"
                      onPress={() => {
                        setShowModal(!showModal);
                      }}
                    />
                  </View>
                  <View style={styles.btnInner}>
                    <Button
                      style={styles.buttonStyle}
                      buttonTextStyle={styles.buttonTextStyle}
                      title="Skip and Next"
                      onPress={() => {
                        navigation.navigate("AllergyScreen",{
                              request_type: request_type,
                          });
                      }}
                    />
                  </View>
                </View>
                
                 
              

           
                    <FlatList
                      style={styles.flatListStyle}
                      data={pastMedicationApi}
                      renderItem={({item}) =>  (
                        <Card style={styles.cardStyle}>
                        <View style={styles.listitems}>
                          <Text> 
                          Drug: {item.drugs_name} {"\n"}
                          Strength: {item.strength}{"\n"}
                          </Text> 
                                    <TouchableOpacity onPress={()=>delete_past_medication_confirm(item.id)}>
                                    <View style={styles.button_two}>
                                      <Text style={styles.deleteTextStyle}>Delete</Text>
                                    </View>
                                  </TouchableOpacity>
                        </View>
                        </Card>
                         )
                      }
                       refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                      }/>
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
  container:{
    backgroundColor: "red",
  },
  flatListStyle:{
    backgroundColor: "#e3f2f0",
    height: "100%"
  },
  fullContainer:{
    backgroundColor: "blue",
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  cardStyle:{
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: "#fff"
  },
  btnWrapper: {
    backgroundColor :  "#e3f2f0",
    flexDirection : "row",
    justifyContent: "space-between",
    padding: 10
  },
  btnInner:{
    width: '48%'
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
    fontSize: 15,
    fontWeight: '400',
  },
  deleteTextStyle: {
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
      marginTop: 10,
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
    padding: 10,
    flexDirection: 'row',
    justifyContent:'space-between'
},
button_two: {
    width: "100%",
    alignItems: 'flex-end',
}
});
export default MedicationScreen;