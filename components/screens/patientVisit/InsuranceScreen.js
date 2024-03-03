import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View, TextInput } from "react-native"
import { HitApi } from "../../../utils";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

const InsuranceScreen = ()=>{

  const [formData, setFormData] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [patientId, setPatientId] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [saveDataLoading, setSaveDataLoading] = useState(false);

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

  const getInsuranceData = async () => {
    setDataLoading(true);
    const apiOptions = {
      endpoint: 'front/api/patient_insurances',
      data: { patient_id : formData['patient_id'] },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    setFormData({...ApiResp.data});
    setDataLoading(false)
  }

  const SaveInsuranceApi = async () => {
    setSaveDataLoading(true)
    const apiOptions = {
      endpoint: 'front/api/patient_insurance_save',
      data: { ...formData },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);

    Toast.show({
      type: 'success',
      text1: 'Insurance Saved'
    });
    setSaveDataLoading(false)
  }
  
  const SaveInsurance = async () =>{
    setsubmitted(true);
    if(
      formData['patient_id'] && 
      formData['insurance_name'] && 
      formData['subscriber_name'] && 
      formData['identification_no'] && 
      formData['group_number'] && 
      formData['rxbin'] && 
      formData['rxgrp'] && 
      formData['rxpcn']
    ){
      SaveInsuranceApi();

    }
  }


  const focusNextInput = (nextInputRef) => {
    nextInputRef.focus();
  };

  const getInputValue = (inputName) => {
    const InpVal = formData[inputName] ? formData[inputName] : '';
    return InpVal;
}

  return(
    <View style={{flex: 1, paddingHorizontal:7, paddingVertical: 6, margin: 8 }}>
         
          <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '100%', alignItems: 'center', justifyContent: 'flex-start', position:"relative"}}>
            {dataLoading && <View style={formoverlay}><ActivityIndicator size="large" color="#33BAD8" /></View>}          
            
            <TextInput placeholder="Inaurnance Name" value={getInputValue('insurance_name')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'insurance_name')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(suscriberInputRef)} />
            {(submitted && !formData['insurance_name']) && <Text style={errorStyle}>Inaurnance Name is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Suscriber Name" value={getInputValue('subscriber_name')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'subscriber_name')} ref={(input) => (suscriberInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(IdentificationInputRef)} />
            {(submitted && !formData['subscriber_name']) && <Text style={errorStyle}>Suscriber Name is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Identification" value={getInputValue('identification_no')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'identification_no')} ref={(input) => (IdentificationInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(groupInputRef)} />
            {(submitted && !formData['identification_no']) && <Text style={errorStyle}>Identification is Required</Text>}
           
            <View style={spacer}></View>
            <TextInput placeholder="Group Number" value={getInputValue('group_number')}   style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'group_number')} ref={(input) => (groupInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(rxbinInputRef)}/>
            {(submitted && !formData['group_number']) && <Text style={errorStyle}>Group Number is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="RXBIN" value={getInputValue('rxbin')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'rxbin')} ref={(input) => (rxbinInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(rxgrpInputRef)}/>
            {(submitted && !formData['rxbin']) && <Text style={errorStyle}>RXBIN is Required</Text>}
            <View style={spacer}></View>

            <TextInput value={getInputValue('rxgrp')} placeholder="RXGRP" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'rxgrp')} ref={(input) => (rxgrpInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(rxpcnInputRef)}/>
            {(submitted && !formData['rxgrp']) && <Text style={errorStyle}>RXGRP is Required</Text>}
            <View style={spacer}></View>

            <TextInput value={getInputValue('rxpcn')} placeholder="RXPCN" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'rxpcn')} ref={(input) => (rxpcnInputRef = input)} returnKeyType="done"/>
            {(submitted && !formData['rxpcn']) && <Text style={errorStyle}>RXPCN is Required</Text>}
            
 
            <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
              {saveDataLoading ?
              <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
              </TouchableOpacity>:
              <TouchableOpacity style={buttonStyle} onPress={SaveInsurance}>
                <Text style={buttonTextStyle}>Save</Text>
              </TouchableOpacity>}
             
              
             
            </View>
          </View>
         </View>
  )
}

const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10}
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const formoverlay = {position:"absolute", top: 15, left: 0, width:"100%", height: "100%", backgroundColor:"#fff9", zIndex: 9, flex: 1, alignItems: "center", justifyContent: "center"}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};

export default InsuranceScreen;