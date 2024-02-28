import { Keyboard, Modal, Pressable, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput} from "react-native";
import { Container } from "../components/index";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import AllergyItem from "../components/AllergyItem";
import { Picker } from "@react-native-picker/picker";
import { HitApi } from "../../../utils";
import ModalSelector from "react-native-modal-selector-searchable";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";


const AllergyScreen = () => {
  const storeUser = useSelector((state) => state.user.userData)
  const [addModal, setAddMoal] = useState(false);
  const [allergyList, setAllergyList] = useState([]);
  const [selectBox, setselectBox] = useState();
  const [allergyDropDownList, setAllergyDropDownListList] = useState([]);
  const [MedicalSeverityList, setMedicalSeverityList] = useState([]);
  const [reactionList, setReactionList] = useState([]);
  const [selectedAllergy, setselectedAllergy] = useState();
  const [selectedMedicalSeverity, setSelectedMedicalSeverity] = useState();
  const [selectedReaction, setSelectedReaction] = useState();
  const [otherAllergy, setOtherAllergy] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setsubmitted] = useState(false);

  const getAllergyDropdownList = async () => {

    const apiOptions = {
      endpoint: 'front/api/getTwentyAllergyList',
      data: { }
    }
    const ApiResp = await HitApi(apiOptions);
    if(ApiResp.length > 1){
      let index = 0;
      const dpdata = [];
      ApiResp.forEach(element => {
        const modifiedItem = {key: index++, label: element['description '], data: element};
        dpdata.push(modifiedItem);
      });
        setAllergyDropDownListList(dpdata);
    }
    // console.log(ApiResp);
  }

  const getAllergyListByKeyword = async (keyword) => {

    const apiOptions = {
      endpoint: 'front/api/search_allergy_with_keywords',
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
        setAllergyDropDownListList(dpdata);
    }
  }

  const getAllergyList = async () => {
    const apiOptions = {
      endpoint: 'front/api/get_patient_allergy',
      data: {patient_id : storeUser.id}
    }
    const ApiResp = await HitApi(apiOptions);
    setAllergyList(ApiResp);
    // console.log('ApiResp ==', ApiResp);
  }

  const getMedicalSeverity = async () =>{
    const apiOptions = {
      endpoint: 'front/api/get_medical_severity',
      data: {}
    }
    const ApiResp = await HitApi(apiOptions);
    const severityArray = Object.entries(ApiResp).map(([id, label]) => ({
      id: parseInt(id, 10),
      label
    }));
    if(severityArray.length > 1){
      let index = 0;
      const dpdata = [];
      severityArray.forEach(element => {
        const modifiedItem = {key: index++, label: element['label'], data: element};
        dpdata.push(modifiedItem);
      });
      setMedicalSeverityList(dpdata);
    }
    
  }

  const getListOfReaction = async () =>{
    const apiOptions = {
      endpoint: 'front/api/list_of_reaction',
      data: {}
    }
    const ApiResp = await HitApi(apiOptions);
  
    if(ApiResp.length > 1){
      let index = 0;
      const dpdata = [];
      ApiResp.forEach(element => {
        const modifiedItem = {key: index++, label: element['reaction_type'], data: element};
        dpdata.push(modifiedItem);
      });
      setReactionList(dpdata);
      // console.log('reaction list =', dpdata);
    }
  }

  const saveAllergy = async () =>{
    const apiOptions = {
      endpoint: 'front/api/save_allergy',
      data: {
        patient_id: storeUser.id,
        medical_allergies : selectedAllergy.data.id,
        medical_severity : selectedMedicalSeverity.data.id,
        reaction_type : selectedReaction.label,
        notes : note
      },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    getAllergyList();
    setAddMoal(false);
    if(ApiResp?.status == 'success'){
      Toast.show({
        type: 'success',
        text1: "Successfully Added Allergy"
      });
    }else{
      Toast.show({
        type: 'error',
        text1: "Allergy Not Saved"
      });
    }
  }

  const deleteAllergy = async (id) =>{
    const apiOptions = {
      endpoint: 'front/api/delete_allergy',
      data: {id},
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    getAllergyList();
    if(ApiResp?.status == 'success'){
      Toast.show({
        type: 'success',
        text1: "Successfully Deleted Allergy"
      });
    }else{
      Toast.show({
        type: 'error',
        text1: "Allergy Not Deleted"
      });
    }
  }

  const validateAndSaveAllergy = () => {
    setsubmitted(true);
    if(!storeUser?.id){
      setAddMoal(false);
      Toast.show({
        type: 'error',
        text1: "User Id Not Found"
      });
    }
    if(selectedAllergy && selectedMedicalSeverity && selectedReaction && (note.length > 1)){
      saveAllergy();
    }
  }



  const handleSearchChange = (val) => {
    getAllergyListByKeyword(val);
    // console.log('val', val);
  }

  const focusNextInput = (nextInputRef) => {
    nextInputRef.focus();
  };

  useEffect(()=>{
    getAllergyDropdownList();
    getMedicalSeverity();
    getListOfReaction();
  },[]);

  useEffect(()=>{
    if(storeUser?.id){
      getAllergyList();
    }
  },[storeUser]);

  return(
    <Container>
      <ScrollView style={fullDependent}>

      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
        </TouchableOpacity>
        <View>
          {allergyList.map((item, index)=><AllergyItem key={index} data={item} deleteAllergy={deleteAllergy}/>)}
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
                <Text style={headlineStyle}>Add Medication</Text>
                <View style={spacer}></View>
                <View style={selectWrapper}>
                <Picker
                    selectedValue={selectBox}
                    onValueChange={(itemValue, itemIndex) => setselectBox(itemValue)}
                    style={selectStyle}
                  >
                    <Picker.Item label="Self" value="1" style={optionStyle} />
                    <Picker.Item label="ghnb, vhhb" value="2" style={optionStyle} />
                    <Picker.Item label="gjbv, xguhvf" value="3" style={optionStyle} />
 
                  </Picker>
                  <View style={spacer}></View>
                {/* <Picker
                    selectedValue={selectedAllergy}
                    // onValueChange={(itemValue,selectBox itemIndex) => setselectedAllergy(itemValue)}
                    style={selectStyle}
                  >
                    {allergyDropDownList.map((item)=> <Picker.Item key={item['id']} label={item["description "]} value={item['id']} style={optionStyle} />)}
                    
 
                </Picker> */}
                <ModalSelector
                        data={allergyDropDownList}
                        initValue="Select Medical Allergis"
                        supportedOrientations={['landscape']}
                        accessible={true}
                        value={selectedAllergy}
                        placeHolderTextColor="red"
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(val)=>setselectedAllergy(val)}
                        optionContainerStyle = {bgWhiteStyle}
                        optionStyle = {bgWhiteStyle}
                        sectionStyle = {bgWhiteStyle}
                        cancelStyle = {bgWhiteStyle}
                        searchStyle = {bgWhiteStyle}
                        onChangeSearch = {handleSearchChange}
                        >

                    </ModalSelector>
                {(submitted && !selectedAllergy) && <Text style={errorStyle}>Medical Allergy is Required</Text>}
                <View style={spacer}></View>
                <ModalSelector
                        data={MedicalSeverityList}
                        initValue="Select Medical Severity"
                        supportedOrientations={['landscape']}
                        accessible={true}
                        value={selectedMedicalSeverity}
                        placeHolderTextColor="red"
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(val)=>setSelectedMedicalSeverity(val)}
                        optionContainerStyle = {bgWhiteStyle}
                        optionStyle = {bgWhiteStyle}
                        sectionStyle = {bgWhiteStyle}
                        cancelStyle = {bgWhiteStyle}
                        searchStyle = {bgWhiteStyle}
                        >
                    </ModalSelector>
                {(submitted && !selectedMedicalSeverity) && <Text style={errorStyle}>Medical Severity is Required</Text>}
                <View style={spacer}></View>
                <ModalSelector
                        data={reactionList}
                        initValue="Select Reaction"
                        supportedOrientations={['landscape']}
                        accessible={true}
                        value={selectedReaction}
                        placeHolderTextColor="red"
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(val)=>setSelectedReaction(val)}
                        optionContainerStyle = {bgWhiteStyle}
                        optionStyle = {bgWhiteStyle}
                        sectionStyle = {bgWhiteStyle}
                        cancelStyle = {bgWhiteStyle}
                        searchStyle = {bgWhiteStyle}
                        >
                    </ModalSelector>
                    {(submitted && !selectedReaction) && <Text style={errorStyle}>Reaction is Required</Text>}
                </View>
                <View style={spacer}></View>
                <TextInput placeholder="Other Allergy" value={otherAllergy} style={InputStyle} onChangeText={(text)=>setOtherAllergy(text)}  returnKeyType="next" onSubmitEditing={() => focusNextInput(noteRef)} />
                <View style={spacer}></View>
                <TextInput placeholder="Note" value={note} style={InputStyle} onChangeText={(text)=>setNote(text)}  returnKeyType="done" ref={(input) => (noteRef = input)} />
                {(submitted && !note) && <Text style={errorStyle}>Note is Required</Text>}

                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                  <TouchableOpacity style={buttonStyle} onPress={validateAndSaveAllergy}>
                    <Text style={buttonTextStyle}>Save</Text>
                  </TouchableOpacity>
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
export default AllergyScreen;
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const optionStyle = { fontSize: 14 }
const selectStyle = {margin: -16, marginBottom: -8}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative'}
const bgWhiteStyle = {backgroundColor: '#fff'}