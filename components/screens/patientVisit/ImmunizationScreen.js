import React from 'react';
import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HitApi } from '../../../utils';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { Container } from '../components';

const ImmunizationScreen = () => {
  const storeUser = useSelector((state) => state.user.userData)
  const [formData, setFormData] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataUpdating, setDataUpdating] = useState(false);

  const handleTextChange = (text, fieldName) => {
    const newFormData = {...formData, [fieldName] : text};
    setFormData(newFormData);
  }

const immunizationUpdate = async () => {
  setDataUpdating(true)
  const apiOptions = {
    endpoint: 'front/api/patient_immunization_update',
    data: {
      patient_id: storeUser.id,
      imunization: formData.imunization
    },
    withStatus: true
  }
  
  const ApiResp = await HitApi(apiOptions);
  Toast.show({
    type: 'success',
    text1: 'Imunization Saved'
  });
  setUpdating(false)
  setDataUpdating(false)
}

const SaveImmunzation = async () =>{
  setsubmitted(true);
  if(
    formData['imunization']
  ){
    immunizationUpdate();
  }

}

const getPatientImmunization = async () => {
  setDataLoading(true);
  const apiOptions = {
    endpoint: 'front/api/patient_immunization',
    data: {patient_id: storeUser.id}
  }
  
  const ApiResp = await HitApi(apiOptions);
  setFormData({imunization: ApiResp.imunization})
  setDataLoading(false)
}

useEffect(()=>{
  if(!updating){
    getPatientImmunization();
  }
},[updating])

useEffect(()=>{
  if(storeUser.id){
      getPatientImmunization();
  }
},[storeUser]);

  const getInputValue = (inputName) => {
    const InpVal = formData[inputName] ? formData[inputName] : '';
    return InpVal;
}

  return (
<Container>
  <ScrollView style={fullDependent}>
    <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setUpdating(!updating)}>
        <View style={{paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
            {updating ? <Icon name="times" size={18} color="#030303" /> :<Icon name="pencil" size={18} color="#030303" />}
        </View>
    </TouchableOpacity>
    <View style={{paddingHorizontal: 16}}>
      <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '100%', alignItems: 'center', justifyContent: 'center',  position:"relative"}}>
        <Text style={labelStyle}>Patient Immunization</Text>

        {dataLoading && <View style={formoverlay}><ActivityIndicator size="large" color="#33BAD8" /></View>}     

        <TextInput value={getInputValue('imunization')}  placeholder="Immunzation" style={InputStyle}  onChangeText={(text)=> { handleTextChange(text, 'imunization'); }} returnKeyType="done" editable={updating}/>
        {(submitted && !formData['imunization']) && <Text style={errorStyle}>Imunization Name is Required</Text>}

        {updating && <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                            {dataUpdating ? 
                            <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                              <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
                            </TouchableOpacity>:
                            <TouchableOpacity style={buttonStyle} onPress={SaveImmunzation}>
                                <Text style={buttonTextStyle}>Update</Text>
                            </TouchableOpacity>}
                        </View>}

      </View>
    </View>
  </ScrollView>
</Container>



  );
};

export default ImmunizationScreen;
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const labelStyle = {fontSize: 14, color: '#616161', width: "90%"}
const formoverlay = {position:"absolute", top: 15, left: 0, width:"100%", height: "100%", backgroundColor:"#fff9", zIndex: 9, flex: 1, alignItems: "center", justifyContent: "center"}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
