import { ScrollView, Modal, View, Pressable, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from "react-native";
import { Container } from "../components";
import DiagnosisItem from "../components/DiagnosisItem";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalSelector from "react-native-modal-selector-searchable";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";


const DiagnosisScreen = () => {
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [diagnoseList, setDiagnoseList] = useState([]);
    const [diagnosisDropDownList, setDiagnosisDropDownList] = useState([]);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState();
    const [note, setNote] = useState('');
    const [submitted, setsubmitted] = useState(false);

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

    const handleDiagnoseSearchChange = (val) => {
        getDiaognsisListByKeyword(val);
    }

    const SaveDiagnosis = async () => {
        console.log('selectedDiagnosis =', selectedDiagnosis);
        // console.log('save diagnosis');
        // console.log('patient_id =', storeUser.id);
        // console.log('diagnosis =', selectedDiagnosis.label);
        // console.log('notes =', note);
        // console.log('id =', selectedDiagnosis.data.id);
        // const apiOptions = {
        //     endpoint: 'front/api/SaveDiagnosis',
        //     data: {
        //         patient_id: storeUser.id,
        //         diagnosis: selectedDiagnosis.label,
        //         notes: note,
        //         id: selectedDiagnosis.data.id
        //     },
        //     withStatus: true
        //   }
        //   const ApiResp = await HitApi(apiOptions);
        //   console.log('ApiResp', ApiResp);
    }

    const validateAndSaveDiagnosis = () =>{
        setsubmitted(true);
        if(selectedDiagnosis && note.length > 0){
            SaveDiagnosis()
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
                    {diagnoseList.map((item, index)=><DiagnosisItem key={index} data={item} />)}
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
                                <Text style={headlineStyle}>Add Diagnosis</Text>
                                <View style={spacer}></View>
                                <View style={selectWrapper}>
                                <ModalSelector
                                    data={diagnosisDropDownList}
                                    initValue="Select Diagnosis"
                                    supportedOrientations={['landscape']}
                                    accessible={true}
                                    value={selectedDiagnosis}
                                    placeHolderTextColor="red"
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    onChange={(val)=>setSelectedDiagnosis(val)}
                                    optionContainerStyle = {bgWhiteStyle}
                                    optionStyle = {bgWhiteStyle}
                                    sectionStyle = {bgWhiteStyle}
                                    cancelStyle = {bgWhiteStyle}
                                    searchStyle = {bgWhiteStyle}
                                    onChangeSearch = {handleDiagnoseSearchChange}
                                    >

                                </ModalSelector>
                                {(submitted && !selectedDiagnosis) && <Text style={errorStyle}>Diagnosis is Required</Text>}
                                </View>
                                <View style={spacer}></View>
                                <TextInput placeholder="Note" value={note} style={InputStyle} onChangeText={(text)=>setNote(text)}  returnKeyType="done" />
                                {(submitted && !note) && <Text style={errorStyle}>Note is Required</Text>}
                                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                                    <TouchableOpacity style={buttonStyle} onPress={validateAndSaveDiagnosis}>
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
const optionStyle = { fontSize: 14 }
const selectStyle = {margin: -16, marginBottom: -8}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative'}
const bgWhiteStyle = {backgroundColor: '#fff'}