import { ScrollView, Modal, View, Pressable, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { Container } from "../components";
import DiagnosisItem from "../components/DiagnosisItem";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from "react-native-modal-selector-searchable";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";


const DiagnosisScreen = () => {
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [diagnoseList, setDiagnoseList] = useState([]);
    const [diagnosisDropDownList, setDiagnosisDropDownList] = useState([]);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState();
    const [note, setNote] = useState('');
    const [submitted, setsubmitted] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const getDiaognsisListByKeyword = async (keyword) => {
        const apiOptions = {
            endpoint: 'front/api/search_diaognsis_with_keywords',
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
            setDiagnosisDropDownList(dpdata);
          }
    }

    const getTwentyDiaognisList = async () => {
        const apiOptions = {
            endpoint: 'front/api/getTwentyDiaognisList',
            data: {}
        }
        const ApiResp = await HitApi(apiOptions);
        if(ApiResp.length > 1){
            let index = 0;
            const dpdata = [];
            ApiResp.forEach(element => {
              const modifiedItem = {key: index++, label: element['name'], data: element};
              dpdata.push(modifiedItem);
            });
            setDiagnosisDropDownList(dpdata);
          }
    }

    const getDiagnosis = async (firstLoading) => {
        setDataLoading(firstLoading);
        const apiOptions = {
            endpoint: 'front/api/getDiagnosis',
            data: {
                patient_id : storeUser.id
            }
        }
        const ApiResp = await HitApi(apiOptions);
        setDataLoading(false);
        setDiagnoseList(ApiResp);
    }

    const handleDiagnoseSearchChange = (val) => {
        getDiaognsisListByKeyword(val);
    }

    const createDiagnosis = async () => {
        setSaving(true);
        const apiOptions = {
            endpoint: 'front/api/SaveDiagnosis',
            data: {
                patient_id: storeUser.id,
                diagnosis: selectedDiagnosis.label,
                notes: note
            },
            withStatus: true
          }
          const ApiResp = await HitApi(apiOptions);
          setAddMoal(false);
          getDiagnosis();
          setSaving(false);
    }

    const validateAndSaveDiagnosis = () =>{
        setsubmitted(true);
        if(updating && note.length > 0){
            updateDiagnosis();
            return;
        }
        if(selectedDiagnosis && note.length > 0){
            createDiagnosis()
        }
    }

    const updateDiagnosis = async () => {
        setSaving(true);
        const diagnosisName = selectedDiagnosis ? selectedDiagnosis.label : updating.data.diagnosis;
        const apiOptions = {
            endpoint: 'front/api/SaveDiagnosis',
            data: {
                patient_id: storeUser.id,
                diagnosis: diagnosisName,
                notes: note,
                id: updating.data.id
            },
            withStatus: true
          }
          const ApiResp = await HitApi(apiOptions);
          Toast.show({
            type: 'success',
            text1: "successfully update"
          })
          setAddMoal(false);
          getDiagnosis();
          setSaving(false);
    }

    useEffect(()=>{
        getTwentyDiaognisList();
    },[]);

    useEffect(()=>{
        if(storeUser.id){
            getDiagnosis(true);
        }
    },[storeUser]);

    const handleUpdate = (data) => {
        setAddMoal(true);
        setNote(data.notes);
        setUpdating({data});
    }


    useEffect(()=>{
        if(!addModal){
            setUpdating(false);
            setSelectedDiagnosis(null);
            setsubmitted(false);
            setNote(null);
            getTwentyDiaognisList();
        }
    },[addModal]);

    const deleteDiagnose = async (id) => {
        setDeleting(id);
        const apiOptions = {
            endpoint: 'front/api/DeleteDiagnosis',
            data: {
                patient_id: storeUser.id,
                id
            },
            withStatus: true
          }
          const ApiResp = await HitApi(apiOptions);
          Toast.show({
            label: "success",
            text1: 'Successfully deleted'
          })
          setAddMoal(false);
          getDiagnosis();
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
                    {dataLoading && <ActivityIndicator size="large" color="#33BAD8" />}
                    {diagnoseList.map((item, index)=><DiagnosisItem key={index} data={item} handleUpdate={handleUpdate} handleDelete={deleteDiagnose} deleting={deleting} />)}
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
                                <Text style={headlineStyle}>{updating ? 'Edit' : 'Add'} Diagnosis</Text>
                                <View style={spacer}></View>
                                <View style={selectWrapper}>
                                <ModalSelector
                                    data={diagnosisDropDownList}
                                    initValue={updating?.data?.diagnosis ? updating.data.diagnosis : "Select Diagnosis"}
                                    supportedOrientations={['landscape']}
                                    accessible={true}
                                    value={selectedDiagnosis}
                                    placeHolderTextColor="#666666"
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    onChange={(val)=>setSelectedDiagnosis(val)}
                                    optionContainerStyle = {bgWhiteStyle}
                                    optionStyle = {bgWhiteStyle}
                                    sectionStyle = {bgWhiteStyle}
                                    cancelStyle = {bgWhiteStyle}
                                    searchStyle = {bgWhiteStyle}
                                    initValueTextStyle = {updating ? updatingInitialValueStyle : selectTextStyle}
                                    selectTextStyle={selectTextStyle}
                                    onChangeSearch = {handleDiagnoseSearchChange}
                                    selectStyle={ selectBoxStyle }
                                    >

                                </ModalSelector>
                                {(submitted && !selectedDiagnosis && !updating) && <Text style={errorStyle}>Diagnosis is Required</Text>}
                                </View>
                                <View style={spacer}></View>
                                <TextInput placeholder="Note" value={note} style={InputStyle} onChangeText={(text)=>setNote(text)}  returnKeyType="done" />
                                {(submitted && !note) && <Text style={errorStyle}>Note is Required</Text>}
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
    );
}
export default DiagnosisScreen;
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative'}
const bgWhiteStyle = {backgroundColor: '#fff'}
const updatingInitialValueStyle = {color: '#000', fontSize: 14, width:"100%", textAlign:"left"}
const selectBoxStyle = {borderWidth: 0, borderBottomWidth: 1, borderColor: "#ababab", borderRadius:0, padding:0, paddingBottom: 4}
const selectTextStyle = {fontSize: 14, width:"100%", textAlign:"left"}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};