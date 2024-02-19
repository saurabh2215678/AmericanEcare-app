import { Text, View,TouchableOpacity, Modal, Pressable, TextInput, Platform } from "react-native";
import { HitApi, calculateAge } from "../../../utils";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from "react-native-paper";

const DependentItem = ({data, selected, setSelected, getDependentApi}) => {

    const [updateModal, setUpdateMoal] = useState(false);
    const [formData, setFormData] = useState({...data});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [genderDropDownOpened, setGenderDropDownOpened] = useState(false);
    const [submitted, setsubmitted] = useState(false);

    const updateDependentApi = async () => {
        console.log('updating started now');
        const apiOptions = {
          endpoint: 'front/api/save_dependent',
          data: { ...formData, id: data.id },
          withStatus: true
        }
        const ApiResp = await HitApi(apiOptions);
        setUpdateMoal(false);
        getDependentApi(formData.patient_id);
        Toast.show({
          type: 'success',
          text1: ApiResp.msg
        });
      }

    const UpdatePatientDependent = async () =>{
        setsubmitted(true);
        if(
          formData['patient_id'] && 
          formData['dependent_first_name'] && 
          formData['dependent_middle_name'] && 
          formData['dependent_last_name'] && 
          formData['dependent_dob'] && 
          formData['dependent_relationship'] && 
          formData['gender'] && 
          formData['patient_phone']
        ){
            
          updateDependentApi();
        }
    }

    const focusNextInput = (nextInputRef) => {
        nextInputRef.focus();
      };

    const genders = [
        {label: 'Male', value:'male'},
        {label: 'Female', value:'female'}
      ];

    const handleTextChange = (text, fieldName) => {
        const newFormData = {...formData, [fieldName] : text};
        setFormData(newFormData);
      }

    useEffect(()=>{
        if(!updateModal){
          setShowDatePicker(false);
        }
      },[updateModal]);

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }

    const onDateChange = ({type}, selectedDate) => {
        if(type == 'set'){
          const currentDate = selectedDate;
          const newFormData = {...formData, ['dependent_dob'] : currentDate};
          setFormData(newFormData);
          if(Platform.OS === 'android'){
            toggleDatePicker();
          }
        }else{
          toggleDatePicker();
        }
    }

    const getPatientId = async () =>{
        const value = await AsyncStorage.getItem('user_id');
        setFormData({...formData, 'patient_id': value});
    }

    useEffect(()=>{
     getPatientId();
    },[]);

    const getDOBValue = () =>{
        let dobNewValue = new Date().toDateString();
        try{
            dobNewValue = new Date(formData['dependent_dob']).toDateString();
        }catch (err){
            dobNewValue = new Date().toDateString();
        }
        return dobNewValue;
      }
    
    const getInputValue = (inputName) => {
        const InpVal = formData[inputName] ? formData[inputName] : '';
        return InpVal;
    }

    return(
        <Card style={dependentItemStyle}>
            <View style={viewSidebySide}>
                <View style={boxLeftStyle}>
                    <Text>Dependent Name: {data['dependent_first_name']}</Text>
                    <TouchableOpacity onPress={()=>setSelected(data.id)} style={ageRadioStyle}>
                        <View style={radioStyle}>{selected && <View style={selectedRadioStyle}></View>}</View>
                        <Text style={AgeTextStyle}>Age : {calculateAge({AgeString: data['dependent_dob']})}</Text>
                    </TouchableOpacity>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Relation: {data['dependent_relationship']}</Text>
                        <Text style={halfWidth}>Cell Phone: {data['patient_phone']}</Text>
                    </View>
                </View>
                <View style={boxRightStyle}>
                    <TouchableOpacity onPress={()=>setUpdateMoal(true)}>
                        <Icon name="pencil" size={18} color="#030303" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 12}} onPress={()=>{}}>
                        <Icon name="trash" size={18} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

        <Modal
          visible={updateModal}
          animationType="fade"
          onRequestClose={()=>setUpdateMoal(false)}
          transparent
        >
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Pressable style={{height: 100, backgroundColor: '#000', opacity: 0.5, position: 'absolute', width: '100%', height: '100%'}} onPress={()=>setUpdateMoal(false)}/>
          <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={headlineStyle}>Add Patient Dependent</Text>
            
            <TextInput placeholder="First Name" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_first_name')} value={getInputValue('dependent_first_name')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(middleNameInputRef)} />
            {(submitted && !formData['dependent_first_name']) && <Text style={errorStyle}>First Name is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Middle Name" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_middle_name')} value={getInputValue('dependent_middle_name')} ref={(input) => (middleNameInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(lastNameInputRef)} />
            {(submitted && !formData['dependent_middle_name']) && <Text style={errorStyle}>Middle Name is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Last Name" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_last_name')} value={getInputValue('dependent_last_name')} ref={(input) => (lastNameInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(dobInputRef)} />
            {(submitted && !formData['dependent_last_name']) && <Text style={errorStyle}>Last Name is Required</Text>}
            <View style={spacer}></View>
            {showDatePicker && <DateTimePicker
              mode="date"
              display="spinner"
              value={new Date(formData['dependent_dob'])}
              onChange={onDateChange}
            />}
            <TextInput placeholder="DOB" style={InputStyle} value={getDOBValue()} onFocus={()=>setShowDatePicker(true)} ref={(input) => (dobInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(relationshipInputRef)} />
            {(submitted && !formData['dependent_dob']) && <Text style={errorStyle}>DOB is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Relationship" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_relationship')} value={getInputValue('dependent_relationship')} ref={(input) => (relationshipInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(phoneInputRef)}/>
            {(submitted && !formData['dependent_relationship']) && <Text style={errorStyle}>Relationship is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Phone Number" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'patient_phone')} value={getInputValue('patient_phone')} ref={(input) => (phoneInputRef = input)} returnKeyType="done"/>
            {(submitted && !formData['patient_phone']) && <Text style={errorStyle}>Phone No is Required</Text>}
            <View style={spacer}></View>
            <View style={{justifyContent : 'center', width: '90%'}}>
            <DropDownPicker
              items={genders}
              open={genderDropDownOpened}
              setOpen={()=>setGenderDropDownOpened(!genderDropDownOpened)}
              value={formData['gender']}
              onSelectItem={(val)=>handleTextChange(val.value, 'gender')}
              showTickIcon={true}
              disableBorderRadius={true}
              style={{ borderRadius: 0, marginHorizontal:0, borderWidth:0, borderBottomWidth: 1, borderColor: '#ababab', minHeight: 20, paddingHorizontal: 0, paddingVertical: 0,  paddingBottom:5}}
              textStyle={{color: formData['gender'] ? '#000' : '#adadad'}}
              listItemLabelStyle={{color: '#1c1e21'}}
              placeholder="Select Gender"
            />
            </View>
            {/* <TextInput placeholder="Gender" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'gender')} ref={(input) => (genderInputRef = input)} returnKeyType="done" onSubmitEditing={AddPatientDependent}/> */}
            {(submitted && !formData['gender']) && <Text style={errorStyle}>Gender is Required</Text>}
            <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
              <TouchableOpacity style={buttonStyle} onPress={UpdatePatientDependent}>
                <Text style={buttonTextStyle}>Save</Text>
              </TouchableOpacity>
              <View style={saperator}></View>
              <TouchableOpacity style={buttonStyle} onPress={()=>setUpdateMoal(false)}>
                <Text style={buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
             
            </View>
          </View>
         </View>
        </Modal>

        </Card>
    )
}
export default DependentItem;
const boxLeftStyle = {flex: 1}
const boxRightStyle = {alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}
const radioStyle = {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#33BAD8',
    alignItems: 'center',
    justifyContent: 'center',
}
const selectedRadioStyle = {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: '#33BAD8',
    alignItems: 'center',
    justifyContent: 'center',
}
const ageRadioStyle = {
    flexDirection : 'row',
    alignItems: 'center',
    marginVertical: 5
}
const AgeTextStyle = {
    marginLeft: 5
}
const saperator = {backgroundColor: '#fff', padding: 10}
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const buttonTextStyle = {color: '#fff', fontSize: 14};
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const dependentItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const viewSidebySide = {flexDirection: 'row'}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'42%'}