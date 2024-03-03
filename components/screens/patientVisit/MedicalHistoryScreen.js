import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import MedicalHistoryItem from "../components/MedicalHistoryItem";
import { Picker } from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector-searchable";
import { HitApi, focusNextInput } from "../../../utils";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";


const MedicalHistoryScreen = () => {
  const storeUser = useSelector((state) => state.user.userData)
  const [addModal, setAddMoal] = useState(false);
  const [selectBox, setselectBox] = useState();
  const [updating, setUpdating] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [dieasesDropDownList, setDieasesDropDownList] = useState([]);
  const [selectedDieases, setSelectedDieases] = useState();
  const [age, setAge] = useState();
  const [comment, setComment] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getDieasesListByKeyword = async (keyword) => {
    const apiOptions = {
        endpoint: 'front/api/search_dieases_with_keywords',
        data: { searchTerm :  keyword},
        withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    if(ApiResp.length > 1){
        let index = 0;
        const dpdata = [];
        ApiResp.forEach(element => {
          const modifiedItem = {key: index++, label: element['text'], data: element};
          dpdata.push(modifiedItem);
        });
        setDieasesDropDownList(dpdata);
      }
  }

  const getTwentyDieasesList = async () => {
    const apiOptions = {
        endpoint: 'front/api/getTwentydieasesList',
        data: {},
        withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    if(ApiResp.length > 1){
        let index = 0;
        const dpdata = [];
        ApiResp.forEach(element => {
          const modifiedItem = {key: index++, label: element['text'], data: element};
          dpdata.push(modifiedItem);
        });
        setDieasesDropDownList(dpdata);
      }
  }

  const getPastMedicalHistory = async (firstLoading) => {
    setDataLoading(firstLoading);
    const apiOptions = {
        endpoint: 'front/api/get_patient_past_medical_history',
        data: {
          patient_id: storeUser.id
        }
    }
    const ApiResp = await HitApi(apiOptions);
    setMedicalHistoryList(ApiResp);
    setDataLoading(false);
  }

  const handleDieasesSearchChange = (val) => {
    getDieasesListByKeyword(val);
  }

  const updatePastMedicalHistory = async () => {
    setSaving(true);
    const diagnosisName = selectedDieases ? selectedDieases.label : updating.data.illness;
    const apiOptions = {
        endpoint: 'front/api/save_patient_past_medical_history',
        data: {
          patient_id: storeUser.id,
          illness : diagnosisName,
          onset_age : age,
          comment : comment,
          id : updating.data.id
        }
    }
    const ApiResp = await HitApi(apiOptions);
    setAddMoal(false);
    getPastMedicalHistory();
    setSaving(false);
  }

  const savePastMedicalHistory = async () => {
    setSaving(true);
    const apiOptions = {
        endpoint: 'front/api/save_patient_past_medical_history',
        data: {
          patient_id: storeUser.id,
          illness : selectedDieases.label,
          onset_age : age,
          comment : comment
        }
    }
    const ApiResp = await HitApi(apiOptions);
    setAddMoal(false);
    getPastMedicalHistory();
    setSaving(false);
    }


  const validateAndSaveDiagnosis = () =>{
      setsubmitted(true);
      if(updating && (age?.length > 0) && (comment?.length > 0)){
          updatePastMedicalHistory();
          return;
      }
      if(selectedDieases && (age?.length > 0) && (comment?.length > 0)){
        savePastMedicalHistory()
      }
  }

  const handleUpdate = (data) => {
      setAddMoal(true);
      setAge(data.onset_age);
      setComment(data.comment);
      setUpdating({data});
  }

  const handleDelete = async (id) => {
    setDeleting(id);
    const apiOptions = {
      endpoint: 'front/api/delete_patient_past_medical_history',
      data: {id},
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    setAddMoal(false);
    getPastMedicalHistory();
  }

  useEffect(()=>{
      if(storeUser.id){
          getPastMedicalHistory(true);
      }
  },[storeUser]);

  useEffect(()=>{
    getTwentyDieasesList();
  },[]);

  useEffect(()=>{
      if(!addModal){
          setUpdating(false);
          setSelectedDieases(null);
          setsubmitted(false);
          setAge(null);
          setComment(null);
          getTwentyDieasesList();
      }
  },[addModal]);



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
            {medicalHistoryList.map((item, index)=><MedicalHistoryItem key={index} data={item} handleUpdate={handleUpdate} handleDelete={handleDelete} deleting={deleting} />)}
          </View>
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
                <Text style={headlineStyle}>{updating ? 'Edit' : 'Add'} Patinent Past Medical History</Text>
                <View style={spacer}></View>
                <View style={selectWrapper}>
                  <View style={selStyle}>
                    <Picker
                      selectedValue={selectBox}
                      onValueChange={(itemValue, itemIndex) => setselectBox(itemValue)}
                      style={selectStyle}
                    >
                      <Picker.Item label="Self" value="1" style={optionStyle} />
                      <Picker.Item label="ghnb, vhhb" value="2" style={optionStyle} />
                      <Picker.Item label="gjbv, xguhvf" value="3" style={optionStyle} />
  
                    </Picker>
                  </View>
                  <View style={spacer}></View>
                  <ModalSelector
                        data={dieasesDropDownList}
                        initValue={updating?.data?.illness ? updating.data.illness : "Select Dieases"}
                        supportedOrientations={['landscape']}
                        accessible={true}
                        value={selectedDieases}
                        placeHolderTextColor="#666666"
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(val)=>setSelectedDieases(val)}
                        optionContainerStyle = {bgWhiteStyle}
                        optionStyle = {bgWhiteStyle}
                        sectionStyle = {bgWhiteStyle}
                        cancelStyle = {bgWhiteStyle}
                        searchStyle = {bgWhiteStyle}
                        initValueTextStyle = {updating ? updatingInitialValueStyle : selectTextStyle}
                        selectTextStyle={selectTextStyle}
                        onChangeSearch = {handleDieasesSearchChange}
                        selectStyle={ selectBoxStyle }
                        >
                    </ModalSelector>
                    {(submitted && !selectedDieases && !updating) && <Text style={errorStyle}>Dieases is Required</Text>}
                    <View style={spacer}></View>
                    <TextInput placeholder="Onset Age" value={age} style={InputStyle} onChangeText={(text)=>setAge(text)}  returnKeyType="next" onSubmitEditing={() => focusNextInput(commentInputRef)} />
                    {(submitted && !age) && <Text style={errorStyle}>Onset Age is Required</Text>}
                    <View style={spacer}></View>
                    <TextInput placeholder="Comment" value={comment} style={InputStyle} onChangeText={(text)=>setComment(text)}  returnKeyType="done" ref={(input) => (commentInputRef = input)} />
                    {(submitted && !comment) && <Text style={errorStyle}>Comment is Required</Text>}
                </View>
                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                    {saving ?
                    <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                      <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
                    </TouchableOpacity>:
                    <TouchableOpacity style={buttonStyle} onPress={validateAndSaveDiagnosis}>
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
export default MedicalHistoryScreen;
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const InputStyle = {width: '100%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 0, paddingTop:4, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const optionStyle = { fontSize: 14 }
const selectStyle = {margin: -16, marginBottom: -8}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative'}
const bgWhiteStyle = {backgroundColor: '#fff'}
const updatingInitialValueStyle = {color: '#000', fontSize: 14, width:"100%", textAlign:"left"}
const selectBoxStyle = {borderWidth: 0, borderBottomWidth: 1, borderColor: "#ababab", borderRadius:0, padding:0, paddingBottom: 4}
const selectTextStyle = {fontSize: 14, width:"100%", textAlign:"left"}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const selStyle = {borderBottomWidth:1, borderColor: '#ababab'}