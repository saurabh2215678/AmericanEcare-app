import { useEffect, useState } from "react";
import { Container } from "../components";
import { Pressable, ScrollView, TouchableOpacity, View, Text, Modal, TextInput, Keyboard, ActivityIndicator  } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PharmecyItem from "../components/PharmecyItem";
import Icon from 'react-native-vector-icons/FontAwesome';
import { HitApi } from "../../../utils";
import { TouchableWithoutFeedback } from "react-native";
import { useSelector } from 'react-redux';
import Toast from "react-native-toast-message";


const defaultSelectOption = {"id": -1, "pharmacy_name": "Select Pharmacy"};
const defaultSelectLoadOption = {"id": -1, "pharmacy_name": "Loading..."};
const defaultSelectNoOption = {"id": -1, "pharmacy_name": "No Pharmacy"};


const PharmacyScreenStep = ({nextbuttonShown}) => {
  const storeUser = useSelector((state) => state.user.userData)
  const [addModal, setAddMoal] = useState(false);
  const [pharmecyList, setPharmecyList] = useState([]);

  const [pharmecySelectData, setPharmecySelectData] = useState([defaultSelectOption]);
  const [selectedPharmecy, setSelectedPharmecy] = useState(null);
  const [zipCode, setZipCode] = useState('');
  const [submitted, setsubmitted] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteModal, setDeleteMoal] = useState(false); //DeleteConfirm 1

  const getPharmecyDropdownList = async () => {
    setPharmecySelectData([defaultSelectLoadOption]);
    const apiOptions = {
      endpoint: 'front/api/getPharmacyByZipcode',
      data: { zipcode : zipCode }
    }
    const ApiResp = await HitApi(apiOptions);
    // console.log(ApiResp);

    setPharmecySelectData([defaultSelectOption, ...ApiResp]);
  }

  useEffect(()=>{
    if(zipCode.length > 4){
      getPharmecyDropdownList();
    }else{
      setSelectedPharmecy(null);
      setPharmecySelectData([defaultSelectNoOption]);
    }

  },[zipCode]);

  const getPharmecyList = async (firstLoading) => {
    setDataLoading(firstLoading)
    const apiOptions = {
      endpoint: 'front/api/patient_pharmacy',
      data: { patient_id : storeUser.id},
    }
    const ApiResp = await HitApi(apiOptions);
    setDataLoading(false)
    setPharmecyList(ApiResp);
    // console.log('getPharmecyList ==', ApiResp);
  }


  const savePharmacy = async () => {
    setsubmitted(true);
    setSaveLoading(true);
      const apiOptions = {
        endpoint: 'front/api/patient_pharmacy_save',
        data: { patient_id : storeUser.id, pharmacy_id: selectedPharmecy},
        withStatus: true
      }
      const ApiResp = await HitApi(apiOptions);
      
      if(ApiResp.status === "success"){
        getPharmecyList();
        Toast.show({
          type: 'success',
          text1: "Successfully Saved"
        });
      }else{
        Toast.show({
          type: 'error',
          text1: "Something went wrong"
        });
      }
      setAddMoal(false);
      setSaveLoading(false);
  }

  const handleDelete = async (id) => {
    setDeleteLoading(id);
    const apiOptions = {
      endpoint: 'front/api/patient_pharmacy_delete',
      data: { id },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    setDeleteMoal(false) //DeleteConfirm 3
    getPharmecyList();
  }

  useEffect(()=>{
    getPharmecyList(true);
  },[]);

  return(
    <Container>
      <ScrollView style={fullDependent}>
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
        </TouchableOpacity>
        
        <View>
      
        {dataLoading && <ActivityIndicator size="large" color="#33BAD8" />}
          {pharmecyList.map((item, index)=><PharmecyItem key={index} data={item} handleDelete={handleDelete} deleteLoading={deleteLoading}/>)}
        </View>
        {nextbuttonShown && <Text>next btn</Text>}
      </ScrollView>
      <Modal
        visible={addModal}
        animationType="fade"
        onRequestClose={()=>setAddMoal(false)}
        useNativeDriver={true}
        transparent>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Pressable style={{height: 100, backgroundColor: '#000', opacity: 0.5, position: 'absolute', width: '100%', height: '100%'}} onPress={()=>setAddMoal(false)}/>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={headlineStyle}>Patient Pharmacy</Text>

                <TextInput placeholder="Your Zip Code" value={zipCode} style={InputStyle} onChangeText={(text)=>setZipCode(text)}  returnKeyType="done" />
                <View style={spacer}></View>

                <View style={selectWrapper}>
                  <Picker
                    selectedValue={selectedPharmecy}
                    onValueChange={(itemValue, itemIndex) => setSelectedPharmecy(itemValue)}
                    style={selectStyle}
                  >
                    {pharmecySelectData.map((item, index)=> <Picker.Item key={index} label={item.pharmacy_name} value={item.id} style={optionStyle} />)}
 
                  </Picker>
                </View>
                {(submitted && (!selectedPharmecy || (selectedPharmecy === -1))) && <Text style={errorStyle}>Pharmacy is Required</Text>}

                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                  {saveLoading ?
                  <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                    <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
                  </TouchableOpacity>:
                  <TouchableOpacity style={buttonStyle} onPress={savePharmacy}>
                    <Text style={buttonTextStyle}>Save</Text>
                  </TouchableOpacity>}
                  <View style={saperator}></View>
                  <TouchableOpacity style={buttonStyle} onPress={()=>setAddMoal(false)}>
                    <Text style={buttonTextStyle}>Cancel</Text>
                  </TouchableOpacity>
                
                </View>
              </View>
          </TouchableWithoutFeedback>
            </View>

      </Modal>
    </Container>
  )
}

export default PharmacyScreenStep;


const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const loadingtext ={fontSize:18, fontWeight:500, textAlign:'center' };
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const optionStyle = { fontSize: 14 }
const selectStyle = {margin: -16, marginBottom: -8}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative', borderBottomWidth:1, borderColor: '#ababab', }
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};