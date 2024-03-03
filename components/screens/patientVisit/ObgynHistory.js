import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput, ActivityIndicator } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import ObgynHistoryItem from "../components/ObgynHistoryItem";

const ObgynHistory = () =>{
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectBox, setSelectBox] = useState();
    
    const [obgynHistory, setObgynHistory] = useState();
    const [lastPeriod, setLastPeriod] = useState();
    const [pregnacyChance, setPregnacyChance] = useState("Yes");
    const [medicationConfirm, setMedicationConfirm] = useState("Yes");
    const [birthControlMedication, setBirthControlMedication] = useState("Yes");
    const [other, setOther] = useState();

    const [dataLoading, setDataLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const ObgynHistoryUpdate = async () => {
        setSaving(true);
        const apiOptions = {
            endpoint: 'front/api/ObgynHistoryUpdate',
            data: {
              patient_id: storeUser.id,
              last_period_date : lastPeriod,
              pregnacy_change : pregnacyChance,
              medication_confirm : medicationConfirm,
              birth_control_medication : birthControlMedication,
              other: other
            },
            withStatus: true
        }
        const ApiResp = await HitApi(apiOptions);
        setAddMoal(false);
        getObgynHistory();
        setSaving(false);
    }

    const validateAndSaveObgynHistory = () => {
        setSubmitted(true);
        if(lastPeriod && other){
            ObgynHistoryUpdate()
        }
    }

    const handleUpdate = (data) => {
        setAddMoal(true);
        setLastPeriod(data.last_period_date)
        setPregnacyChance(data.pregnacy_change)
        setMedicationConfirm(data.medication_confirm)
        setBirthControlMedication(data.birth_control_medication)
        setOther(data.other)
        setUpdating({data});
    }

    const getObgynHistory = async (firstLoading) =>{
        setDataLoading(firstLoading)
        const apiOptions = {
            endpoint: 'front/api/getObgynHistory',
            data: {patient_id: storeUser.id}
        }
        const ApiResp = await HitApi(apiOptions);
        setObgynHistory(ApiResp);
        setDataLoading(false)
    }

    useEffect(()=>{
        if(storeUser.id){
            getObgynHistory(true);
        }
    },[storeUser]);

    useEffect(()=>{
        if(!addModal){
            setUpdating(false);
            setSubmitted(false);
            
            setLastPeriod(null)
            setPregnacyChance("Yes")
            setMedicationConfirm("Yes")
            setBirthControlMedication("Yes")
            setOther(null)
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
                    {obgynHistory && <ObgynHistoryItem data={obgynHistory} handleUpdate={handleUpdate}/>}
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
                                <Text style={headlineStyle}>{updating ? 'Edit' : 'Add'} Obgyn History</Text>
                                <View style={spacer}></View>
                                <View style={selectWrapper}>
                                    <View style={selStyle}>
                                    <Picker
                                        selectedValue={selectBox}
                                        onValueChange={(itemValue, itemIndex) => setSelectBox(itemValue)}
                                        style={selectStyle}
                                    >
                                        <Picker.Item label="Self" value="1" style={optionStyle} />
                                        <Picker.Item label="ghnb, vhhb" value="2" style={optionStyle} />
                                        <Picker.Item label="gjbv, xguhvf" value="3" style={optionStyle} />
                    
                                    </Picker>
                                    </View>
                                    <View style={spacer}></View>
                                    <TextInput placeholder="Last Period" value={lastPeriod} style={InputStyle} onChangeText={(text)=>setLastPeriod(text)} />
                                    {(submitted && !lastPeriod) && <Text style={errorStyle}>Last Period is Required</Text>}


                                    <View style={spacer}></View>
                                    <Text style={labelStyle}>Any chance to be pregnant ?</Text>
                                    <View style={selStyle}>
                                        <Picker
                                            selectedValue={pregnacyChance}
                                            onValueChange={(itemValue, itemIndex) => setPregnacyChance(itemValue)}
                                            style={selectStyle}
                                        >
                                            <Picker.Item label="Yes" value="Yes" style={optionStyle} />
                                            <Picker.Item label="No" value="No" style={optionStyle} />                    
                                        </Picker>
                                    </View>

                                    <View style={spacer}></View>
                                    <Text style={labelStyle}>Are you using any medication ?</Text>
                                    <View style={selStyle}>
                                        <Picker
                                            selectedValue={medicationConfirm}
                                            onValueChange={(itemValue, itemIndex) => setMedicationConfirm(itemValue)}
                                            style={selectStyle}
                                        >
                                            <Picker.Item label="Yes" value="Yes" style={optionStyle} />
                                            <Picker.Item label="No" value="No" style={optionStyle} />                    
                                        </Picker>
                                    </View>

                                    <View style={spacer}></View>
                                    <Text style={labelStyle}>Are you using birth control medication ?</Text>
                                    <View style={selStyle}>
                                        <Picker
                                            selectedValue={birthControlMedication}
                                            onValueChange={(itemValue, itemIndex) => setBirthControlMedication(itemValue)}
                                            style={selectStyle}
                                        >
                                            <Picker.Item label="Yes" value="Yes" style={optionStyle} />
                                            <Picker.Item label="No" value="No" style={optionStyle} />                    
                                        </Picker>
                                    </View>
                                    <View style={spacer}></View>
                                    <TextInput placeholder="Other" value={other} style={InputStyle} onChangeText={(text)=>setOther(text)} />
                                    {(submitted && !other) && <Text style={errorStyle}>Other is Required</Text>}

                                </View>
                                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                                    {saving ?
                                    <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                                        <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
                                    </TouchableOpacity>:
                                    <TouchableOpacity style={buttonStyle} onPress={validateAndSaveObgynHistory}>
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
export default ObgynHistory;
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const InputStyle = {width: '100%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 0, paddingTop: 4, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const optionStyle = { fontSize: 14 }
const selectStyle = {margin: -16, marginBottom: -8}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative'}

const labelStyle = {fontSize: 14, color: '#616161'}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const selStyle = {borderBottomWidth:1, borderColor: '#ababab'}