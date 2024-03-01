import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import MedicalHistoryItem from "../components/MedicalHistoryItem";
import { Picker } from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector-searchable";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import PatientHistoryItem from "../components/PatientHistoryItem";
import Radios from "../components/Radios";

const radiosOption = ["Yes", "No", "Quit", "Never", "Unknown"];

const PatientSocialHistory = () =>{
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [selectBox, setSelectBox] = useState();
    const [updating, setUpdating] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [patientHistory, setPatientHistory] = useState();
    const [tobacco, setTobacco] = useState();
    const [tobaccoNote, setTobaccoNote] = useState();
    const [alcohol, setAlcohol] = useState();
    const [alcoholNote, setAlcoholNote] = useState();
    const [recreationalDrugs, setRecreationalDrugs] = useState();
    const [drugNote, setDrugNote] = useState();
    const [travelOutOfCountry, setTravelOutOfCountry] = useState();
    const [outCountryNotes, setOutCountryNotes] = useState();

    const PastSocialHistoryUpdate = async () => {
        const apiOptions = {
            endpoint: 'front/api/PastSocialHistoryUpdate',
            data: {
              patient_id: storeUser.id,
              use_tobacco : tobacco,
              tobacco_notes : tobaccoNote,
              use_alcohal : alcohol,
              alcohal_notes : alcoholNote,
              use_recreational_drugs: recreationalDrugs,
              drugs_notes : drugNote,
              travel_out_of_country : travelOutOfCountry,
              out_country_notes : outCountryNotes
            },
            withStatus: true
        }
        const ApiResp = await HitApi(apiOptions);
        setAddMoal(false);
        getPastSocialHistory();
        console.log('updated...', ApiResp);
    }

    const handleUpdate = (data) => {
        setAddMoal(true);
        setTobacco(data.use_tobacco)
        setTobaccoNote(data.tobacco_notes)
        setAlcohol(data.use_alcohal)
        setAlcoholNote(data.alcohal_notes)
        setRecreationalDrugs(data.use_recreational_drugs)
        setDrugNote(data.drugs_notes)
        setTravelOutOfCountry(data.travel_out_of_country)
        setOutCountryNotes(data.out_country_notes)
        setUpdating({data});
        // PastSocialHistoryUpdate();
    }

    const validateAndSaveSocialHistory = () =>{
        setSubmitted(true);
        if(tobacco && tobaccoNote && alcohol && alcoholNote && recreationalDrugs && drugNote && travelOutOfCountry && outCountryNotes){
            PastSocialHistoryUpdate()
        }
    }

    const getPastSocialHistory = async () =>{
        const apiOptions = {
            endpoint: 'front/api/getPastSocialHistory',
            data: {patient_id: storeUser.id}
        }
        const ApiResp = await HitApi(apiOptions);
        setPatientHistory(ApiResp);
    }

    useEffect(()=>{
        if(storeUser.id){
            getPastSocialHistory();
        }
    },[storeUser]);

    useEffect(()=>{
        if(!addModal){
            setUpdating(false);
            setSubmitted(false);
            setTobacco(null)
            setTobaccoNote(null)
            setAlcohol(null)
            setAlcoholNote(null)
            setRecreationalDrugs(null)
            setDrugNote(null)
            setTravelOutOfCountry(null)
            setOutCountryNotes(null)
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
                    {patientHistory && <PatientHistoryItem data={patientHistory} handleUpdate={handleUpdate}/>}
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
                            <Text style={headlineStyle}>Add Patinent Social History</Text>
                            <View style={spacer}></View>
                            <View style={selectWrapper}>
                                <Text>Did you use tobacco?</Text>
                                <Radios onChange={(val)=>setTobacco(val)} value={tobacco} options={radiosOption}/>
                                {(submitted && !tobacco) && <Text style={errorStyle}>Tobacco is Required</Text>}
                                <TextInput placeholder="Notes" value={tobaccoNote} style={InputStyle} onChangeText={(text)=>setTobaccoNote(text)} />
                                {(submitted && !tobaccoNote) && <Text style={errorStyle}>Note is Required</Text>}
                                <View style={spacer}></View>

                                <Text>Did you use alcohol?</Text>
                                <Radios onChange={(val)=>setAlcohol(val)} value={alcohol} options={radiosOption}/>
                                {(submitted && !alcohol) && <Text style={errorStyle}>Alcohol is Required</Text>}
                                <TextInput placeholder="Notes" value={alcoholNote} style={InputStyle} onChangeText={(text)=>setAlcoholNote(text)} />
                                {(submitted && !alcoholNote) && <Text style={errorStyle}>Note is Required</Text>}
                                <View style={spacer}></View>

                                <Text>Did you use recreational drugs?</Text>
                                <Radios onChange={(val)=>setRecreationalDrugs(val)} value={recreationalDrugs} options={radiosOption}/>
                                {(submitted && !recreationalDrugs) && <Text style={errorStyle}>Recreational drugs is Required</Text>}
                                <TextInput placeholder="Notes" value={drugNote} style={InputStyle} onChangeText={(text)=>setDrugNote(text)} />
                                {(submitted && !drugNote) && <Text style={errorStyle}>Note is Required</Text>}
                                <View style={spacer}></View>

                                <Text>Recent travel out of country?</Text>
                                <Radios onChange={(val)=>setTravelOutOfCountry(val)} value={travelOutOfCountry} options={radiosOption}/>
                                {(submitted && !travelOutOfCountry) && <Text style={errorStyle}>This field is Required</Text>}
                                <TextInput placeholder="Notes" value={outCountryNotes} style={InputStyle} onChangeText={(text)=>setOutCountryNotes(text)} />
                                {(submitted && !outCountryNotes) && <Text style={errorStyle}>Note is Required</Text>}
                                <View style={spacer}></View>

                            </View>
                            <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                                <TouchableOpacity style={buttonStyle} onPress={validateAndSaveSocialHistory}>
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
export default PatientSocialHistory;
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