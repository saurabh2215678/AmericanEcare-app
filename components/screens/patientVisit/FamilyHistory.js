import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import MedicalHistoryItem from "../components/MedicalHistoryItem";
import { Picker } from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector-searchable";
import { HitApi, focusNextInput } from "../../../utils";
import { useSelector } from "react-redux";
import FamilyHistoryItem from "../components/FamilyHistoryItem";

const FamilyHistory = () => {
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [submitted, setsubmitted] = useState(false);
    const [selectBox, setselectBox] = useState();

    const [familyHistoryList, setFamilyHistoryList] = useState([]);
    const [selectedFamilyRelationship, setSelectedFamilyRelationship] = useState("-1");
    const [familyRelationships, setfamilyRelationships] = useState([]);
    const [dises, setDises] = useState();
    const [age, setAge] = useState();

    const handleUpdate = (data) => {
        const selectedRel = familyRelationships.find((a)=>a.label === data.member);
        setAddMoal(true);
        setDises(data.illness)
        setAge(data.onset_age)
        setSelectedFamilyRelationship(selectedRel?.value ? selectedRel.value : "-1")
        setUpdating({data});
    }

    const getFamilyHistoryList = async () => {
        const apiOptions = {
            endpoint: 'front/api/getPatientFamilyHistory',
            data: {
              patient_id: storeUser.id
            }
        }
        const ApiResp = await HitApi(apiOptions);
        setFamilyHistoryList(ApiResp);
    }

    const getFamilyRelationships = async () => {
        const apiOptions = {
            endpoint: 'front/api/getFamilyRelationship',
            data: {}
        }
        const ApiResp = await HitApi(apiOptions);
        const arr = Object.entries(ApiResp);
        const convertedArr = arr.map(([value, label]) => ({ value, label }));
        setfamilyRelationships(convertedArr);
    }
    const updateFamilyHistory = async () => {
        const selectedRel = familyRelationships.find((a)=>a.value === selectedFamilyRelationship);
        const apiOptions = {
            endpoint: 'front/api/PatientFamilyHistorySave',
            data: {
              patient_id: storeUser.id,
              member : selectedRel.label,
              illness : dises,
              onset_age : age,
              id: updating.data.id
            },
            withStatus : true
        }
        const ApiResp = await HitApi(apiOptions);
        setAddMoal(false);
        getFamilyHistoryList();
    }
    const saveFamilyHistory = async () => {
        const selectedRel = familyRelationships.find((a)=>a.value === selectedFamilyRelationship);
        const apiOptions = {
            endpoint: 'front/api/PatientFamilyHistorySave',
            data: {
              patient_id: storeUser.id,
              member : selectedRel.label,
              illness : dises,
              onset_age : age
            },
            withStatus : true
        }
        const ApiResp = await HitApi(apiOptions);
        setAddMoal(false);
        getFamilyHistoryList();
    }

    const validateAndSaveDises = () => {
        setsubmitted(true);
        if(updating && (selectedFamilyRelationship != "-1") && (dises?.length > 0) && (age?.length > 0)){
            updateFamilyHistory();
            return;
        }
        if((selectedFamilyRelationship != "-1") && (dises?.length > 0) && (age?.length > 0)){
            saveFamilyHistory();
        }
    }
    useEffect(()=>{
        if(storeUser.id){
            getFamilyHistoryList();
        }
    },[storeUser]);

    useEffect(()=>{
        if(!addModal){
            setUpdating(false);
            setsubmitted(false);
            setDises(null);
            setAge(null);
            setSelectedFamilyRelationship("-1");

        }
    },[addModal]);

    useEffect(()=>{
        getFamilyRelationships();
        
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
                {familyHistoryList.map((item, index)=><FamilyHistoryItem key={index} data={item} handleUpdate={handleUpdate} />)}
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
                        <Text style={headlineStyle}>Add Patinent Family History</Text>
                        <View style={spacer}></View>
                        <View style={selectWrapper}>
                        <Picker
                            selectedValue={selectedFamilyRelationship}
                            onValueChange={(itemValue, itemIndex) => setSelectedFamilyRelationship(itemValue)}
                            style={selectStyle}
                        >
                            <Picker.Item label="Select Family Member" value="-1" style={optionStyle} />
                            {familyRelationships.map((item, index)=><Picker.Item key={index} label={item.label} value={item.value} style={optionStyle} />)}
        
                        </Picker>
                        {(submitted && (selectedFamilyRelationship == "-1")) && <Text style={errorStyle}>Family member is Required</Text>}

                        <TextInput placeholder="Dises" value={dises} style={InputStyle} onChangeText={(text)=>setDises(text)}  returnKeyType="next" onSubmitEditing={() => focusNextInput(ageInputRef)}   />
                        {(submitted && !dises) && <Text style={errorStyle}>Dises is Required</Text>}


                        <TextInput placeholder="Onset Age" value={age} style={InputStyle} onChangeText={(text)=>setAge(text)}  returnKeyType="done" ref={(input) => (ageInputRef = input)}/>
                        {(submitted && !age) && <Text style={errorStyle}>Onset Age is Required</Text>}
                        </View>
                        <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                            <TouchableOpacity style={buttonStyle} onPress={validateAndSaveDises}>
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
export default FamilyHistory;
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
const updatingInitialValueStyle = {color: '#000'}