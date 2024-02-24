import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from "react-native";
import { HitApi } from '../../../utils';
import Toast from 'react-native-toast-message';




const ImmunizationScreen = () => {
  const [formData, setFormData] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [patientId, setPatientId] = useState(false);
  const [imunization, setImunization] = useState(false);
  
  

  const handleTextChange = (text, fieldName) => {
    const newFormData = {...formData, [fieldName] : text};
    setFormData(newFormData);
  }
  
  const getPatientId = async () =>{
    const value = await AsyncStorage.getItem('user_id');
    setFormData({...formData, 'patient_id': value, 'imunization' : value,});
    setPatientId(value);
    setImunization(value);
  }

  

  useEffect(()=>{
    getPatientId();
  },[]);

  

// NEW COME


const immunizationUpdate = async () => {
  const apiOptions = {
    endpoint: 'front/api/patient_immunization_update',
    data: {...formData},
    withStatus: true
  }
  
  const ApiResp = await HitApi(apiOptions);// Log the API response
  setFormData({...ApiResp.data});
  Toast.show({
    type: 'success',
    text1: 'Imunization Saved'
  });
}
const SaveImmunzation = async () =>{
  setsubmitted(true);
  if(
    formData['imunization']
  ){
    immunizationUpdate();
  }
  // console.log(formData)
  // console.log(getInputValue('immunzation') + 'sss')
}

  const getInputValue = (inputName) => {
    console.log("Input name:", inputName);
    const InpVal = formData[inputName] ? formData[inputName] : '';
    console.log("Value of InpVal:", InpVal);
    return InpVal;
}

// console.log(immunzation + "ty")
// console.log(getInputValue('immunzation' + 'dddd'));
  return (
    <View style={styles.container}>
    <TextInput value={getInputValue('imunization')}  placeholder="Immunzation" style={InputStyle}  onChangeText={(text)=> { handleTextChange(text, 'imunization'); }} 
    returnKeyType="done"
    />

{(submitted && !formData['imunization']) && <Text style={errorStyle}>Imunization Name is Required</Text>}
      <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
              <TouchableOpacity style={buttonStyle} onPress={SaveImmunzation}>
                <Text style={buttonTextStyle}>Save</Text>
              </TouchableOpacity>
            </View>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const buttonTextStyle = {color: '#fff', fontSize: 14};
export default ImmunizationScreen;
