import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import DocumentItem from "../components/DocumentItem";
import * as DocumentPicker from 'expo-document-picker';
import { Strings } from "../utils";
import axios from "axios";

const PatientDocuments = () => {
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [submitted, setsubmitted] = useState(false);
    const [documentList, setDocumentList] = useState([]);

    const [formData, setFormData] = useState({});

    const [dataLoading, setDataLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const getPatientDocuments = async (firstLoading) => {
        setDataLoading(firstLoading);
        const apiOptions = {
            endpoint: 'front/api/getPatientDocuments',
            data: {
              patient_id: storeUser.id
            }
        }
        const ApiResp = await HitApi(apiOptions);
        setDocumentList(ApiResp);
        setDataLoading(false)
    }

    const handleFileSelect = async (name) => {
        try {
            const result = await DocumentPicker.getDocumentAsync();
            if (!result.canceled) {
                setFormData({...formData, [name] : result.assets });
                // console.log('hhjj ==', result)
            } else {
                var copyFormData = {...formData};
                delete copyFormData[name];
                setFormData({...formData });
            }
          } catch (error) {
            console.error('Error picking document:', error);
          }
    }

    const getValue = (name) => {
        let val = "Select Document";
        if(formData[name]){
            val = formData[name][0].name
        }
        return val;
    }

    const validateAndSaveDocument = () => {
        setsubmitted(true);
        if(
            formData['lab_result'] && 
            formData['lab_document'] && 
            formData['lab_picture'] 
        ){
            SavePatientDocuments();
        }
    }

    const SavePatientDocuments = async () => {
        setSaving(true);
        const ppFormData = new FormData();
        ppFormData.append('patient_id', storeUser.id);

        ppFormData.append('lab_result', {
            uri: formData.lab_document[0].uri,
            type: formData.lab_document[0].mimeType,
            name: formData.lab_document[0].name,
          });
        ppFormData.append('lab_picture', {
            uri: formData.lab_picture[0].uri,
            type: formData.lab_picture[0].mimeType,
            name: formData.lab_picture[0].name,
          });
        ppFormData.append('lab_document', {
            uri: formData.lab_document[0].uri,
            type: formData.lab_document[0].mimeType,
            name: formData.lab_document[0].name,
          });

          try {
            const API_URL = Strings.baseUrl.url;
            const response = await axios.post(`${API_URL}front/api/SavePatientDocuments`, ppFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            
            console.log('Document uploaded successfully:', response.data);
          } catch (error) {
            console.error('Error uploading document:', error);
          }

          setAddMoal(false);
          setFormData({});
          getPatientDocuments();
          setSaving(false);
    }



    useEffect(()=>{
        if(storeUser.id){
            getPatientDocuments(true);
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
                    {dataLoading && <ActivityIndicator size="large" color="#33BAD8" />}
                    {documentList.map((item, index)=><DocumentItem key={index} data={item} />)}
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
                            <Text style={headlineStyle}>Add Document</Text>
                            <View style={spacer}></View>
                            <View style={selectWrapper}>
                                <TouchableOpacity style={filepickerStyle} onPress={()=>handleFileSelect('lab_result')}>
                                    <Text>{getValue('lab_result')}</Text>
                                </TouchableOpacity>
                                {(submitted && !formData['lab_result']) && <Text style={errorStyle}>Lab Result is Required</Text>}
                                <View style={spacer}></View>


                                <TouchableOpacity style={filepickerStyle} onPress={()=>handleFileSelect('lab_document')}>
                                    <Text>{getValue('lab_document')}</Text>
                                </TouchableOpacity>
                                {(submitted && !formData['lab_document']) && <Text style={errorStyle}>Lab Document is Required</Text>}
                                <View style={spacer}></View>
                               
                                <TouchableOpacity style={filepickerStyle} onPress={()=>handleFileSelect('lab_picture')}>
                                    <Text>{getValue('lab_picture')}</Text>
                                </TouchableOpacity>
                                {(submitted && !formData['lab_picture']) && <Text style={errorStyle}>Lab Picture is Required</Text>}
                                <View style={spacer}></View>
                                <View style={{flexDirection: 'row', width: '100%', marginTop: 25}}>
                                    {saving ?
                                    <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                                        <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
                                    </TouchableOpacity>:
                                    <TouchableOpacity style={buttonStyle} onPress={validateAndSaveDocument}>
                                        <Text style={buttonTextStyle}>Save</Text>
                                    </TouchableOpacity>}
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
export default PatientDocuments;
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 0, paddingTop: 4, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative'}
const filepickerStyle = {alignSelf: 'flex-start', borderBottomWidth: 1, width: "100%", paddingBottom: 4, borderColor: "#ababab"}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};