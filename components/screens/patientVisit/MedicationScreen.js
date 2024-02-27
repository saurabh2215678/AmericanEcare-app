import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import MedicationItem from "../components/MedicationItem";
import { useEffect, useState } from "react";
import ModalSelector from 'react-native-modal-selector-searchable'
import { Picker } from "@react-native-picker/picker";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";


const MedicationScreen = () => {
  const storeUser = useSelector((state) => state.user.userData)
  const [addModal, setAddMoal] = useState(false);
  const [medicationList, setMedicationList] = useState([]);
  const [medicationDropdownList, setMedicationDropdownList] = useState([]);
  const [medicationDropdownListState, setMedicationDropdownListState] = useState('loaded');
  const [drugDropdownList, setDrugDropdownList] = useState([]);
  const [drugDropdownListState, setDrugDropdownListState] = useState('loaded');
  const [selectBox, setselectBox] = useState();
  const [searchText, setSearchText] = useState('');
  const [selectedDrug, setSelectedDrug] = useState();
  const [selectedStrength, setSelectedStrength] = useState();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [submitted, setsubmitted] = useState(false);

  const populateDrugsDropDown = async () => {
    setMedicationDropdownListState('loading')
    const apiOptions = {
      endpoint: 'front/api/search_medication_with_keywords',
      data: { searchTerm : searchText}
    }
    const ApiResp = await HitApi(apiOptions);

    if(ApiResp.length > 1){
      let index = 0;
      const dpdata = [];
      ApiResp.forEach(element => {
        const modifiedItem = {key: index++, label: element.text, data: element};
        dpdata.push(modifiedItem);
      });
      // console.log('ApiResp ==', dpdata);
        setMedicationDropdownList(dpdata);
    }
    setMedicationDropdownListState('loaded')
  }

  const populateStrengthDropDown = async () => {
    setDrugDropdownListState('loading')
    const apiOptions = {
      endpoint: 'front/api/getDrugStrength',
      data: { DrugNameID : selectedDrug.data.id}
    }
    const ApiResp = await HitApi(apiOptions);

    if(ApiResp.length > 0){
      let index = 0;
      const dpdata = [];
      ApiResp.forEach(element => {
        const modifiedItem = {key: index++, label: element.text, data: element};
        dpdata.push(modifiedItem);
      });
      setDrugDropdownList(dpdata);
    }
    setDrugDropdownListState('loaded')
  }

  const deleteMedication = async (id) => {

    const apiOptions = {
      endpoint: 'front/api/deleteMedication',
      data: {patient_id : storeUser.id, id},
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    getMedicationList(storeUser.id);
  }

  const getMedicationList = async (userId) => {
    const apiOptions = {
      endpoint: 'front/api/getMedication',
      data: {patient_id : userId },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    if(ApiResp?.status === 'success'){
      Toast.show({
        type: 'success',
        text1: "Successfully Get List"
      });

      setMedicationList(ApiResp.data);
    }else{
      Toast.show({
        type: 'error',
        text1: "Something went wrong"
      });
    }
  }

  const saveMedicationApi = async () =>{
    const apiOptions = {
      endpoint: 'front/api/saveMedication',
      data: { 
        patient_id : storeUser.id,
        drug_id: selectedDrug.data.id,
        strength: selectedStrength.label
      },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    setAddMoal(false);
    setMedicationDropdownList([]);
    setDrugDropdownList([]);
    setSearchText('');
    if(ApiResp?.status === 'success'){
      Toast.show({
        type: 'success',
        text1: "Successfully Saved"
      });
      getMedicationList(storeUser.id);
    }else{
      Toast.show({
        type: 'error',
        text1: "Something went wrong"
      });
    }
  }

  useEffect(()=>{
    if(searchText.length > 1){
      populateDrugsDropDown();
    }else{
      setDrugDropdownList([]);
      setMedicationDropdownList([]);
    }
  },[searchText]);

  useEffect(()=>{
    if (!isFirstRender) {
      populateStrengthDropDown();
    } else {
      setIsFirstRender(false);
    }
  },[selectedDrug]);

  useEffect(()=>{
    if(storeUser){
      getMedicationList(storeUser.id);
    }
  },[storeUser]);


  const saveMedication = async () => {
    setsubmitted(true);
    const submitCondition = selectedDrug && selectedStrength && (medicationDropdownList.length > 0) && (drugDropdownList.length > 0) && (searchText.length > 1)
    if(submitCondition){
      saveMedicationApi();
    }else{
      Toast.show({
        type: 'error',
        text1: "Something went wrong"
      })
    }
  }



  return(
    <Container>
      <ScrollView style={fullDependent}>

        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
        </TouchableOpacity>

        <View>
          {medicationList.map((item, index)=><MedicationItem key={index} data={item} deleteMedication={deleteMedication}/>)}
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

                    <TextInput placeholder="Select medication" value={searchText} style={InputStyle} onChangeText={(text)=>setSearchText(text)}  returnKeyType="done" />
                  <View style={spacer}></View>
                  {(medicationDropdownListState === 'loading') && <Text>Loading...</Text>}
                   {((medicationDropdownList.length > 0) && (searchText.length > 1) && (medicationDropdownListState !== 'loading')) && 
                   <>
                      <ModalSelector
                        data={medicationDropdownList}
                        initValue="Select Drugs"
                        supportedOrientations={['landscape']}
                        accessible={true}
                        value={selectedDrug?.data?.text}
                        placeHolderTextColor="red"
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(val)=>setSelectedDrug(val)}
                        optionContainerStyle = {bgWhiteStyle}
                        optionStyle = {bgWhiteStyle}
                        sectionStyle = {bgWhiteStyle}
                        cancelStyle = {bgWhiteStyle}
                        searchStyle = {bgWhiteStyle}
                        >

                    </ModalSelector>
                    <View style={spacer}></View>
                   </>
                   }

                  {(drugDropdownListState === 'loading') && <Text>Loading...</Text>}
                   {((drugDropdownList.length > 0) && (drugDropdownListState !== 'loading')) && 
                    <>
                    <ModalSelector
                      data={drugDropdownList}
                      initValue="Select Strength"
                      supportedOrientations={['landscape']}
                      accessible={true}
                      placeHolderTextColor="red"
                      scrollViewAccessibilityLabel={'Scrollable options'}
                      cancelButtonAccessibilityLabel={'Cancel Button'}
                      value={selectedStrength}
                      onChange={(val)=>setSelectedStrength(val)}
                      optionContainerStyle = {bgWhiteStyle}
                      optionStyle = {bgWhiteStyle}
                      sectionStyle = {bgWhiteStyle}
                      cancelStyle = {bgWhiteStyle}
                      searchStyle = {bgWhiteStyle}
                      >
                    </ModalSelector>
                    <View style={spacer}></View>
                    </>
                  }

                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                  <TouchableOpacity style={buttonStyle} onPress={saveMedication}>
                    <Text style={buttonTextStyle}>Save</Text>
                  </TouchableOpacity>
                  <View style={saperator}></View>
                  <TouchableOpacity style={buttonStyle} onPress={()=>setAddMoal(false)}>
                    <Text style={buttonTextStyle}>Cancel</Text>
                  </TouchableOpacity>
                
                </View>
                  
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
      </Modal>
    </Container>
  )
}
export default MedicationScreen;

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
// const dropdownStyle = {width: 'calc(100% - 0.5)'}
