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

const PharmacyScreen = ({navigation}) => {
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
.catch(err => console.log('Search drug: ', err));   

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
        console.log(error);
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
  
   getPatientAllergy();
   navigation.navigate("AllergyScreen");
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

  setSevertityData([{ label: 'Mild', value: '1' },{ label: 'Moderate', value: '2' },{ label: 'severe', value: '3' }]);  


}, [patientId]);

    
  return (

  	  <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title="Pharmacy"
                        onLeftPress={() => navigation.navigate('AllergyScreen')} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        
                    }}>
                    <View style={Styles.container}>
                        <View style={Style.minviewallcontent}>

                            <Text style={Styles.lableTextStyle}>Zipcode</Text>
                  <Input
                      placeholder="Zipcode"
                      onChangeText={(keyword) => setkeyword(keyword)}
                      value={keyword}
                      inputStyle={Style.inputMobile}
                  />
                            
                 <Text style={Styles.lableTextStyle}>List of Pharmacy</Text>
                       <View style={Styles.inputviewstyle}>
                               
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
                        placeholder={!isFocus ? 'Select Pharmacy' : '...'}
                        placeholderTextColor="#fff" 
                        searchPlaceholder="Select Pharmacy..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setUserAllergy(item.value);
                          setIsFocus(false);
                        }}
                      />
                               
                            </View>
                            <Button
                                title="Next"
                                onPress={() => this.submitVisit()}
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

export default PharmacyScreen;