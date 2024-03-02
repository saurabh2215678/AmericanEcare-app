import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import MedicalHistoryItem from "../components/MedicalHistoryItem";
import { Picker } from "@react-native-picker/picker";
import ModalSelector from "react-native-modal-selector-searchable";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import FamilyHistoryItem from "../components/FamilyHistoryItem";

const FamilyHistory = () => {
    const storeUser = useSelector((state) => state.user.userData)
    const [addModal, setAddMoal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [submitted, setsubmitted] = useState(false);
    const [selectBox, setselectBox] = useState();

    const [familyHistoryList, setFamilyHistoryList] = useState([]);

    const handleUpdate = (data) => {
        setAddMoal(true);
        console.log('updating data');
        // setAge(data.onset_age);
        // setComment(data.comment);
        setUpdating({data});
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
                            onValueChange={(itemValue, itemIndex) => setselectBox(itemValue)}
                            style={selectStyle}
                        >
                            <Picker.Item label="Select Family Member" value="-1" style={optionStyle} />
                            {familyRelationships.map((item, index)=><Picker.Item key={item.index} label={item.label} value={item.value} style={optionStyle} />)}
        
                        </Picker>

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