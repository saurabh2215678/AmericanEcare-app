import { TouchableOpacity, View, Text, Modal, Pressable, TextInput, Platform, ActivityIndicator } from "react-native";
import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';
import { HitApi } from "../../../utils";
import DependentItem from "../components/DependentItem";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";


const DependentScreen = () =>{
  const [addModal, setAddMoal] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitted, setsubmitted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [genderDropDownOpened, setGenderDropDownOpened] = useState(false);
  const [relationshipDropDownOpened, setRelationshipDropDownOpened] = useState(false);
  const [DependentList, setDependentList] = useState([]);
  const [selectedAgeDependent, setSelectedAgeDependent] = useState(-1);
  const [selectedDate, setSelectedDate] = useState(); 

  const [listLoading, setListLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);


  const genders = [
    {label: 'Male', value:'male'},
    {label: 'Female', value:'female'}
  ];

  const relationship = [
    {label: 'Spouse', value:'spouse'},
    {label: 'Daughter', value:'daughter'},
    {label: 'Son', value:'son'}
  ];

  const addDependentApi = async () => {
    setAddLoading(true);
    const apiOptions = {
      endpoint: 'front/api/save_dependent',
      data: { ...formData },
      withStatus: true
    }
    const ApiResp = await HitApi(apiOptions);
    setAddMoal(false);
    getDependentApi(formData.patient_id);
    Toast.show({
      type: 'success',
      text1: ApiResp.msg
    });
    setAddLoading(false);
  }

  const getDependentApi = async (patientId, firstLoading) => {
      setListLoading(firstLoading);
    const apiOptions = {
      endpoint: 'front/api/get_patient_dependent',
      data: { patient_id : patientId }
    }
    const ApiResp = await HitApi(apiOptions);
    setDependentList(ApiResp);
    setListLoading(false);
  }

  const AddPatientDependent = async () =>{
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
      addDependentApi();
    }
  }

  const focusNextInput = (nextInputRef) => {
    nextInputRef.focus();
  };

  const handleTextChange = (text, fieldName) => {
    const newFormData = {...formData, [fieldName] : text};
    setFormData(newFormData);
  }

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  }

  const onDateChange = ({type}, selectedDate) => {
    if(type == 'set'){
      setSelectedDate(selectedDate)
      // const currentDate = selectedDate;
      // const newFormData = {...formData, ['dependent_dob'] : currentDate};
      // setFormData(newFormData);
      if(Platform.OS === 'android'){
        toggleDatePicker();
      }
    }else{
      toggleDatePicker();
    }
  }

  useEffect(()=>{
    var formattedDateString = moment(selectedDate).format("MM/DD/YYYY");
    setFormData({...formData, dependent_dob : formattedDateString});
  },[selectedDate])

  const getPatientId = async () =>{
    const value = await AsyncStorage.getItem('user_id');
    setFormData({...formData, 'patient_id': value});
    getDependentApi(value, true)
  }

  useEffect(()=>{
    getPatientId();
  },[]);
  useEffect(()=>{
    if(!addModal){
      setShowDatePicker(false);
      setsubmitted(false);
      setFormData({patient_id : formData.patient_id});
      setSelectedDate(null);
    }
  },[addModal]);


  return (
    <Container>
        <ScrollView style={fullDependent}>
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <View>
            {listLoading && <ActivityIndicator size="large" color="#33BAD8" />}
            {DependentList.map((item, index)=><DependentItem key={index} data={item} selected={selectedAgeDependent === item.id} setSelected={setSelectedAgeDependent} getDependentApi={getDependentApi}/>)}
            
          </View>
        </ScrollView>
        <Modal
          visible={addModal}
          animationType="fade"
          onRequestClose={()=>setAddMoal(false)}
          transparent
        >
         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Pressable style={{height: 100, backgroundColor: '#000', opacity: 0.5, position: 'absolute', width: '100%', height: '100%'}} onPress={()=>setAddMoal(false)}/>
          <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={headlineStyle}>Add Patient Dependent</Text>
            
            <TextInput placeholder="First Name" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_first_name')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(middleNameInputRef)} />
            {(submitted && !formData['dependent_first_name']) && <Text style={errorStyle}>First Name is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Middle Name" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_middle_name')} ref={(input) => (middleNameInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(lastNameInputRef)} />
            {(submitted && !formData['dependent_middle_name']) && <Text style={errorStyle}>Middle Name is Required</Text>}
            <View style={spacer}></View>
            <TextInput placeholder="Last Name" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_last_name')} ref={(input) => (lastNameInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(dobInputRef)} />
            {(submitted && !formData['dependent_last_name']) && <Text style={errorStyle}>Last Name is Required</Text>}
            <View style={spacer}></View>
            {showDatePicker && <DateTimePicker
              mode="date"
              display="default"
              maximumDate = {new Date()}
              value={selectedDate || new Date() }
              onChange={onDateChange}
            />}
            <TextInput placeholder="DOB" style={InputStyle} value={selectedDate ? selectedDate.toDateString() : ''} onFocus={()=>setShowDatePicker(true)} ref={(input) => (dobInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(relationshipInputRef)} />
            {(submitted && !formData['dependent_dob']) && <Text style={errorStyle}>DOB is Required</Text>}
            <View style={spacer}></View>

            {/* <TextInput placeholder="Relationship" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'dependent_relationship')} ref={(input) => (relationshipInputRef = input)} returnKeyType="next" onSubmitEditing={() => focusNextInput(phoneInputRef)}/>
            {(submitted && !formData['dependent_relationship']) && <Text style={errorStyle}>Relationship is Required</Text>} */}
            <View style={{justifyContent : 'center', width: '90%', zIndex: relationshipDropDownOpened ? 1 : 0 }}>
            <DropDownPicker
              items={relationship}
              open={relationshipDropDownOpened}
              setOpen={()=>setRelationshipDropDownOpened(!relationshipDropDownOpened)}
              value={formData['dependent_relationship']}
              onSelectItem={(val)=>handleTextChange(val.value, 'dependent_relationship')}
              showTickIcon={true}
              disableBorderRadius={true}
              style={{ borderRadius: 0,  marginHorizontal:0, borderWidth:0, borderBottomWidth: 1, borderColor: '#ababab', minHeight: 20, paddingHorizontal: 0, paddingVertical: 0,  paddingBottom:5}}
              textStyle={{color: formData['dependent_relationship'] ? '#000' : '#adadad'}}
              listItemLabelStyle={{color: '#1c1e21'}}
              placeholder="Select Relationship"
            />
          </View>
            <View style={spacer}></View>
            <TextInput placeholder="Phone Number" style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'patient_phone')} ref={(input) => (phoneInputRef = input)} returnKeyType="done"/>
            {(submitted && !formData['patient_phone']) && <Text style={errorStyle}>Phone No is Required</Text>}
            <View style={spacer}></View>
            <View style={{justifyContent : 'center', width: '90%', zIndex: genderDropDownOpened ? 1 : 0 }}>
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
              {addLoading ? 
              <TouchableOpacity style={loadingbuttonStyle} onPress={()=>{}}>
                <Text style={buttonTextStyle}><ActivityIndicator size="small" color="#33BAD8" /></Text>
              </TouchableOpacity>:
              <TouchableOpacity style={buttonStyle} onPress={AddPatientDependent}>
                <Text style={buttonTextStyle}>Save</Text>
              </TouchableOpacity>}
              <View style={saperator}></View>
              <TouchableOpacity style={buttonStyle} onPress={()=>setAddMoal(false)}>
                <Text style={buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>
             
            </View>
          </View>
         </View>
        </Modal>
    </Container>
  )
};

const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10}
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
const loadingbuttonStyle = {backgroundColor: '#87e3f8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
export default DependentScreen;