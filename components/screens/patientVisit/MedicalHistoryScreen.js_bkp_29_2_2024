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


const MedicalHistoryScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [dieaseData, setdieaseData] = useState([]);
    const [diease, setUserdiease] = useState([]);
    const [pastMedicalHistoryApi, setpastMedicalHistoryApi] = useState([]);
    const [onset_age, setonset_age] = useState('');
    const [comment, set_comment] = useState('');
    const [patientId, setpatientId] = useState("");
   
   // const [visitTypes, setuservisitTypes] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const { request_type} = route.params;


  
const getDieases = () => {
    // Function to get the value from AsyncStorage

         var config = {
          method: 'get',
          url: API_URL+`front/api/all_dieases`,
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
        };

        axios(config)
        .then(response => {
      
        var count = Object.keys(response.data.data).length;
     
        let dieasesArray = [];
        for (var i = 0; i < count; i++) {
          dieasesArray.push({
            label: response.data.data[i].dieases_name,
            value: response.data.data[i].dieases_name,
          });
        }
        setdieaseData(dieasesArray);

        })
      .catch(error => {
        console.log("all dieases API ERROR",error);
      });
  };
  

const getPatienPastMedicalHistory = () => {
    // Function to get the value from AsyncStorage
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_past_medical_history', body, axiosConfig)
             .then((responseJson) => {

                  var history_count = Object.keys(responseJson.data.data).length;
                  let pastMedicalHistoryArray = [];
                  for (var i = 0; i < history_count; i++) {
                    pastMedicalHistoryArray.push({
                      id: responseJson.data.data[i].id,
                      illness: responseJson.data.data[i].illness,
                      onset_age: responseJson.data.data[i].onset_age,
                      comment: responseJson.data.data[i].comment,
                    });
                  }
               setRefreshing(false);
               setpastMedicalHistoryApi(pastMedicalHistoryArray);

                })
             .catch(err => console.log('pastMedicalHistoryArray API: ', err));
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
    //Clear old data of the list
    setpastMedicalHistoryApi([]);
    //Call the Service to get the latest data
    getPatienPastMedicalHistory();
  };

const saveMedicalHistory=()=>{
  //alert(diease);
   // navigation.navigate("ReasonScreen");
   if(diease=="")
   {
    alert("Please Select diease");
   }

   if(onset_age=="")
   {
    alert("Please Enter Age");
   }

  setLoading(true); // Set loading before sending API request

   let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
     };
   
     const body = {patient_id: patientId, illness:diease, onset_age:onset_age,comment:comment};

      axios.post(API_URL+'front/api/save_patient_past_medical_history', body, axiosConfig)
             .then((responseJson) => {

              if(responseJson.status == 200)
              {
                   setLoading(false); // Stop loading
                   Alert.alert(
                      'Sucess',
                      'Past Medical History has been saved Successfully',
                      [
                        {
                          text: '', 
                          onPress: () => this.refreshMedicalHistory()
                        },
                      ],
                      {cancelable: false},
                    );

              }
            })
         .catch(err => console.log('Past Medical History API Save: ', err));

}

refreshMedicalHistory=(is_delete="")=>{
  if(is_delete!=1)
  {
     setShowModal(!showModal);
      setLoading(true); 
  }
  setLoading(false); 
  
   getPatienPastMedicalHistory();
   navigation.navigate("MedicalHistoryScreen",{request_type: request_type});
}


const delete_past_medical_history_confirm =(id)=>{
  return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            delete_past_medical_history(id);
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

const delete_past_medical_history =(id)=>{

  let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
  const body = { id: id };

   axios.post(API_URL+'front/api/delete_patient_past_medical_history', body, axiosConfig)
             .then((responseJson) => {

                if(responseJson.status == 200)
                  {
                    Alert.alert(
                      'Sucess',
                      'Delete Successfully',
                      [
                        {text: '', onPress: () => this.refreshMedicalHistory(1)},
                      ],
                      {cancelable: false},
                    );
                  }
               

            })
             .catch(err => console.log('Delete Past medical history API: ', err));

};

const backPress=()=>{
  navigation.navigate("SymptomsScreen",{
      request_type: request_type,
  });
}




useEffect(() => {
  getPatientId();
  getDieases();
  getPatienPastMedicalHistory();
}, [patientId]);

    
  return (

  	 <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
                <View style={Style.setheaderspacepadding}>
                   <AppHeader
                        leftImage={images.back_image}
                        title="Medical History"
                        onLeftPress={() => backPress()} />
                </View>
               
          <SafeAreaView>
              <View style={styles.container}>
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');

                  }}>
                 
                  <View style={styles.modal}>
                    <Text style={styles.text}>Add Patient Past Medical History</Text>

                     <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={dieaseData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Diease' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="Search Diease..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setUserdiease(item.value);
                          setIsFocus(false);
                        }}
                      />
  

                  <Input
                      placeholder="Onset Age"
                      onChangeText={(onset_age) => setonset_age(onset_age)}
                      value={onset_age}
                      inputStyle={Style.inputMobile}
                  />

                   <Input
                      placeholder="Comment"
                      onChangeText={(comment) => set_comment(comment)}
                      value={comment}
                      inputStyle={Style.inputMobile}
                  />


                    <Button
                      title={loading ? 'Loading...' : 'Save'}
                      onPress={() => {
                        saveMedicalHistory();
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
                <Button
                  title="Add Medical History"
                  onPress={() => {
                    setShowModal(!showModal);
                  }}
                />

                 <Text style={styles.text}></Text>

                 <Button
                  title="Skip and Next"
                  onPress={() => {
                    navigation.navigate("MedicationScreen",{
                      request_type: request_type,
                    });
                  }}
                />



              </View>

            </SafeAreaView>
        

          <SafeAreaView style={styles.container}>
                    <FlatList
                      data={pastMedicalHistoryApi}
                      renderItem={({item}) =>  (
                        <View style={styles.listitems}>
                        <Text> 
                         Diease: {item.illness} {"\n"}
                         Onset Age: {item.onset_age}{"\n"}
                         Comment: {item.comment}{"\n"}
                        </Text> 
                                  <TouchableOpacity onPress={()=>delete_past_medical_history_confirm(item.id)}>
                                  <View style={styles.button_two}>
                                    <Text style={styles.buttonTextStyle}>Delete</Text>
                                  </View>
                                </TouchableOpacity>
                                

                      </View> )
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

export default MedicalHistoryScreen;