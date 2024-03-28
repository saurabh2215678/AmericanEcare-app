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


const AllergyScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [dieaseData, setdieaseData] = useState([]);
    const [diease, setUserdiease] = useState([]);
    const [AllergyApi, setAllergyApi] = useState([]);
    const [keyword, setkeyword] = useState("");
    const [notes, setNotes] = useState("");
    const [drugId, setdrugId] = useState(0);
    const [ReactionData, setReactionData] = useState([]);
    const [Reaction, setUserReaction] = useState("");
    const [allergyData, setallergyData] = useState([]);
    const [SevertityData, setSevertityData] = useState([]);
    const [allergy, setUserAllergy] = useState("");
    const [Severtity, setUserSevertity] = useState("");
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



const get_allergy_by_keywords = ()=>{

  let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      };
  const body = { search_keywords: keyword };
  
   axios.post(API_URL+'front/api/get_allergy_by_keywords', body, axiosConfig)
             .then((responseJson) => {

    var allergy_count = Object.keys(responseJson.data.data).length;
    let allergyArray = [];
    for (var i = 0; i < allergy_count; i++) {
      allergyArray.push({
        label: responseJson.data.data[i].description,
        value: responseJson.data.data[i].id,
      });
    }


  setallergyData(allergyArray);     

  })
.catch(err => console.log('Search Allergy: ', err));   

}



const getListOfReaction=()=>{

 
     var config = {
          method: 'get',
          url: API_URL+`front/api/list_of_reaction`,
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          },
        };

        axios(config)
        .then(response => {
      
        var count = Object.keys(response.data.data).length;
     
        let reactionArray = [];
        for (var i = 0; i < count; i++) {
          reactionArray.push({
            label: response.data.data[i].reaction_type,
            value: response.data.data[i].id,
          });
        }
        setReactionData(reactionArray);

        })
      .catch(error => {
        console.log("List of Reaction:",error);
      });


}  


const getPatientAllergy = () => {
    // Function to get the value from AsyncStorage
         let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_allergy', body, axiosConfig)
             .then((responseJson) => {

                  var history_count = Object.keys(responseJson.data.data).length;
                  let allergyArray = [];
                  for (var i = 0; i < history_count; i++) {
                    allergyArray.push({
                      id: responseJson.data.data[i].id,
                      patient_id: responseJson.data.data[i].patient_id,
                      allergy_for: responseJson.data.data[i].allergy_for,
                      medical_allergies: responseJson.data.data[i].medical_allergies,
                      severity_name: responseJson.data.data[i].severity_name,
                      name: responseJson.data.data[i].name,
                      reaction_type: responseJson.data.data[i].reaction_type,
                      notes: responseJson.data.data[i].notes,
                    });
                  }
               setRefreshing(false);
               setAllergyApi(allergyArray);

                })
             .catch(err => console.log('Allergy API: ', err));
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
    setAllergyApi([]);
    getPatientAllergy();
  };

const saveAllergy=()=>{
  //alert(diease);
   // navigation.navigate("ReasonScreen");
   if(allergy=="")
   {
    alert("Please Select Allergy");
    return false;
   }

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
   
     const body = {patient_id: patientId, medical_allergies:allergy, medical_severity:Severtity, reaction_type:Reaction,notes:notes};

      axios.post(API_URL+'front/api/save_allergy', body, axiosConfig)
             .then((responseJson) => {

              if(responseJson.status == 200)
              {
                   setLoading(false); // Stop loading
                   Alert.alert(
                      'Sucess',
                      'Allergy has been saved Successfully',
                      [
                        {
                          text: '', 
                          onPress: () => this.refreshAllergy()
                        },
                      ],
                      {cancelable: false},
                    );

              }
            })
         .catch(err => console.log('Allergy API: ', err));

}

refreshAllergy=(is_delete="")=>{
  if(is_delete!=1)
  {
     setShowModal(!showModal);
      setLoading(true); 
  }

   setLoading(false);
  
   getPatientAllergy();
   navigation.navigate("AllergyScreen",{request_type: request_type});
}


const delete_allergy_confirm =(id)=>{
  return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            delete_allergy(id);
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

const delete_allergy =(id)=>{

  let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
  const body = { id: id };

 
   axios.post(API_URL+'front/api/delete_allergy', body, axiosConfig)
             .then((responseJson) => {

                if(responseJson.status == 200)
                  {
                    Alert.alert(
                      'Sucess',
                      'Delete Successfully',
                      [
                        {text: '', onPress: () => this.refreshAllergy(1)},
                      ],
                      {cancelable: false},
                    );
                  }
               

            })
             .catch(err => console.log('Delete Allergy API: ', err));

};



useEffect(() => {
  getPatientId();
  getPatientAllergy();
  get_allergy_by_keywords();
  getListOfReaction();

  setSevertityData([{ label: 'Unknown', value: '1' },{ label: 'Mild', value: '2' },{ label: 'Moderate', value: '3' },{ label: 'severe', value: '4' }]);  


}, [patientId]);

    
  return (

  	 <Container>
        <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          
                <View style={Style.setheaderspacepadding}>
                   <AppHeader
                        leftImage={images.back_image}
                        title="Allergy"
                        onLeftPress={() => navigation.navigate('MedicationScreen',{request_type: request_type})} />
                </View>
               
          
              
                <Modal
                  animationType={'slide'}
                  transparent={false}
                  visible={showModal}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');

                  }}>
                 
                  <View style={styles.modal}>
                    <Text style={styles.text}>Add Allergy</Text>

                  <Text></Text>

                  <Input
                      placeholder="Search Allergy By Keyword"
                      onChangeText={(keyword) => setkeyword(keyword)}
                      value={keyword}
                      inputStyle={Style.inputMobile}
                  />

                <TouchableOpacity onPress={()=>get_allergy_by_keywords()}>
             
                <Text style={styles.buttonTextStyle}>Click to Search Allergy</Text>
             
            </TouchableOpacity>




                     <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={allergyData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'List of allergies' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="List of allergies..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setUserAllergy(item.value);
                          setIsFocus(false);
                        }}
                      />


                       <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={SevertityData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'List of severity' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="List of severity..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setUserSevertity(item.value);
                          setIsFocus(false);
                        }}
                      />

                      <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={ReactionData}
                        search
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Reaction' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="List of Reaction..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setUserReaction(item.value);
                          setIsFocus(false);
                        }}
                      />


                  <Input
                      placeholder="Notes"
                      onChangeText={(notes) => setNotes(notes)}
                      value={notes}
                      inputStyle={Style.inputMobile}
                  />
  

                    <Button
                      title={loading ? 'Loading...' : 'Save'}
                      onPress={() => {
                        saveAllergy();
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
                      title="Add Allergy"
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
                      navigation.navigate("VitalScreen",{request_type: request_type});
                      }}
                    />
                  </View>
                </View>
  
                    <FlatList
                      data={AllergyApi}
                      style={styles.flatListStyle}
                      renderItem={({item}) =>  (
                        <Card style={styles.cardStyle}>
                          <View style={styles.listitems}>
                              <Text> 
                              Allergy: {item.medical_allergies} {"\n"}
                              Severity: {item.severity_name}{"\n"}
                              Reaction: {item.reaction_type}{"\n"}
                              Note: {item.notes}{"\n"}
                              </Text> 
                                        <TouchableOpacity onPress={()=>delete_allergy_confirm(item.id)}>
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



// const styles = StyleSheet.create({
//   screenContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 32,
//   },
//   buttonStyle: {
//     height: 54,
//     width: '80%',
//     marginTop: 32,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#2EE59D',
//     shadowRadius: 5,
//     shadowOpacity: 0.7,
//     shadowColor: 'rgba(46, 229, 157, 0.5)',
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//   },
//   buttonTextStyle: {
//     color: 'red',
//     fontWeight: '700',
//   },
// dropdown: {
//       height: 40,
//       borderColor: 'grey',
//       borderWidth: 0.5,
//       paddingHorizontal: 8,
//       backgroundColor: '#fff',
//       borderRadius:10,
//       marginTop: 10,
//       marginBottom: 15,
//       width:'100%'

//     },
//     symptomsText:{
//        fontSize: 18,
//        marginBottom: 15,
//        color:'#152549',
//     },
//  modal: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#e3f2f0',
//     padding: 30,
//   },
//   text: {
//     color: '#3f2949',
//     marginTop: 10,
//   },
//   card_container: {
//     flex: 0.5,
//     justifyContent: 'center',
//     padding: 0,
    
//   },
//     paragraph: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       padding: 20
//     },
//     item: {
//     backgroundColor: '#eee',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,

//   },
//   item_delete:{
//     width:'10%',
//     fontSize: 28,
//   },
//   listitems: {
//     width: "100%",
//     flex:1,
//     marginTop: 5,
//     backgroundColor: "#eee",
//     padding: 10,
//     flexDirection: 'row',
//     justifyContent:'space-between'
// },
// button_two: {
//     width: "100%",
//     alignItems: 'flex-end',
// }
// });

export default AllergyScreen;