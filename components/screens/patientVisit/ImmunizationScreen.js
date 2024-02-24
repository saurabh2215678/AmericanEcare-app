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
  

  const handleTextChange = (text, fieldName) => {
    const newFormData = {...formData, [fieldName] : text};
    setFormData(newFormData);
  }

  const getPatientId = async () =>{
    const value = await AsyncStorage.getItem('user_id');
    setFormData({...formData, 'patient_id': value, id : 1});
    setPatientId(value);
  }


  useEffect(()=>{
    getPatientId();
  },[]);

  useEffect(()=>{
    if(patientId){
      getInsuranceData();
    }
  },[patientId]);

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
    text1: 'Insurance Saved'
  });
}

const SaveInsurance = async () =>{
  setsubmitted(true);
  if(
    formData['Immunzation']
  ){
    immunizationUpdate();
  }
  // console.log(formData)
}


  const getInputValue = (inputName) => {
    const InpVal = formData[inputName] ? formData[inputName] : '';
    return InpVal;
}




  return (
    <View style={styles.container}>
     <TextInput 
  value={getInputValue('Immunzation')} 
  placeholder="Immunzation" 
  style={InputStyle} 
  onChangeText={(text)=> {
    console.log(text); 
    handleTextChange(text, 'Immunzation');
  }} 
  ref={(input) => (rxpcnInputRef = input)} 
  returnKeyType="done"
/>

      <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
              <TouchableOpacity style={buttonStyle} onPress={SaveInsurance}>
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
const buttonTextStyle = {color: '#fff', fontSize: 14};
export default ImmunizationScreen;
