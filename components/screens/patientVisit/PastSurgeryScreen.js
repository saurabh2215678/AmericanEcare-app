import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { HitApi } from "../../../utils";
import { useSelector } from "react-redux";
import PastsurgeryItem from "../components/Pastsurgeryitem";

const PastSurgeryScreen = () => {
  const storeUser = useSelector((state) => state.user.userData)
  const [addModal, setAddMoal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [submitted, setsubmitted] = useState(false);
  const [selectBox, setselectBox] = useState();
  const [pastSurgeryList, setPastSurgeryList] = useState([]);
  const [surgeryDate, setSurgeryDate] = useState();
  const [surgery, setSurgery] = useState();
  const [other, setOther] = useState();

  const handleDelete = () => {
    console.log('deleting');
  }

  const getPastSurgeryHistory = async () => {
    const apiOptions = {
        endpoint: 'front/api/getPastSurgeryHistory',
        data: {
          patient_id: storeUser.id
        }
    }
    const ApiResp = await HitApi(apiOptions);
    setPastSurgeryList(ApiResp);
  }
  const savePastSurgeryHistory = async () => {
    const apiOptions = {
        endpoint: 'front/api/savePastSurgeryHistory',
        data: {
          patient_id: storeUser.id,
          surgery_confirm : selectBox,
          surgery_date : surgeryDate,
          other : other
        }
    }
    const ApiResp = await HitApi(apiOptions);
    setAddMoal(false);
    getPastSurgeryHistory();
  }

  const handleUpdate = async (data) =>{
    setAddMoal(true);
    setselectBox(data.surgery_confirm);
    setSurgeryDate(data.surgery_date);
    setSurgery(data.surgery_name);
    setOther(data.other);
    setUpdating({data});
  }

  const updatePastSurgeryHistory = async () => {
    console.log('updating..')
  }

  const validateAndSaveSurgery = () => {
    setsubmitted(true);
    if(updating && selectBox &&  surgeryDate && surgery && other){
        updatePastSurgeryHistory();
        return;
    }
    if(selectBox && surgeryDate && surgery && other){
      savePastSurgeryHistory()
    }
  }

  useEffect(()=>{
      if(storeUser.id){
        getPastSurgeryHistory();
      }
  },[storeUser]);

  useEffect(()=>{
      if(!addModal){
          setUpdating(false);
          setsubmitted(false);

          setselectBox("Yes");
          setSurgeryDate(null);
          setSurgery(null);
          setOther(null);
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
            {pastSurgeryList.map((item, index)=><PastsurgeryItem key={index} data={item}  handleDelete={handleDelete} handleUpdate={handleUpdate} />)}
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
                <Text style={headlineStyle}>Add Past Surgery</Text>
                <View style={spacer}></View>
                <View style={selectWrapper}>
                  <Picker
                    selectedValue={selectBox}
                    onValueChange={(itemValue, itemIndex) => setselectBox(itemValue)}
                    style={selectStyle}
                  >
                    <Picker.Item label="Yes" value="Yes" style={optionStyle} />
                    <Picker.Item label="No" value="No" style={optionStyle} /> 
                  </Picker>
                  <View style={spacer}></View>
                  <TextInput placeholder="Date Of Surgery" value={surgeryDate} style={InputStyle} onChangeText={(text)=>setSurgeryDate(text)}  returnKeyType="next" onSubmitEditing={() => focusNextInput(surgeryInputRef)} />
                  {(submitted && !surgeryDate) && <Text style={errorStyle}>Date is Required</Text>}
                  <View style={spacer}></View>
                  <TextInput placeholder="Surgery" value={surgery} style={InputStyle} onChangeText={(text)=>setSurgery(text)}  returnKeyType="next" ref={(input) => (surgeryInputRef = input)} onSubmitEditing={() => focusNextInput(otherInputRef)} />
                  {(submitted && !surgery) && <Text style={errorStyle}>Surgery is Required</Text>}
                  <View style={spacer}></View>
                  <TextInput placeholder="Other" value={other} style={InputStyle} onChangeText={(text)=>setOther(text)}  returnKeyType="done" ref={(input) => (otherInputRef = input)} />
                  {(submitted && !other) && <Text style={errorStyle}>Other is Required</Text>}
                </View>
                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                    <TouchableOpacity style={buttonStyle} onPress={validateAndSaveSurgery}>
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
export default PastSurgeryScreen;

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