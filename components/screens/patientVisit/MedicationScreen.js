import { Container } from "../components";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import MedicationItem from "../components/MedicationItem";
import { useEffect, useState } from "react";
import ModalSelector from 'react-native-modal-selector-searchable'
import { Picker } from "@react-native-picker/picker";


const MedicationScreen = () => {
  const [addModal, setAddMoal] = useState(false);
  const [medicationList, setMedicationList] = useState([]);
  const [medicationDropdownList, setMedicationDropdownList] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [selectBox, setselectBox] = useState();


  let index = 0;
  const data = [
      { key: index++, section: true, label: 'Fruits' },
      { key: index++, label: 'Red Apples' },
      { key: index++, label: 'Cherries' },
      { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
      { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
  ];

  useEffect(()=>{
    console.log('txt value', textInputValue)
  },[textInputValue]);



  return(
    <Container>
      <ScrollView style={fullDependent}>

        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
        </TouchableOpacity>

        <View>
          {medicationList.map((item, index)=><MedicationItem key={index} data={item}/>)}
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
                <Text style={headlineStyle}>Add Medication</Text>

                {/* <TextInput placeholder="Your Zip Code" value={zipCode} style={InputStyle} onChangeText={(text)=>setZipCode(text)}  returnKeyType="done" /> */}
                <View style={spacer}></View>
                <View style={selectWrapper}>

                  <Picker
                    selectedValue={selectBox}
                    onValueChange={(itemValue, itemIndex) => setselectBox(itemValue)}
                    style={selectStyle}
                  >
                    <Picker.Item label="Self" value="1" style={optionStyle} />
                    <Picker.Item label="ghnb, vhhb" value="2" style={optionStyle} />
                    <Picker.Item label="gjbv, xguhvf" value="3" style={optionStyle} />
 
                  </Picker>
                  <ModalSelector
                      data={medicationDropdownList}
                      initValue="Select Medication"
                      supportedOrientations={['landscape']}
                      accessible={true}
                      scrollViewAccessibilityLabel={'Scrollable options'}
                      cancelButtonAccessibilityLabel={'Cancel Button'}
                      onChange={(option)=>{ setTextInputValue(option.label)}}
                      optionContainerStyle = {bgWhiteStyle}
                      optionStyle = {bgWhiteStyle}
                      sectionStyle = {bgWhiteStyle}
                      cancelStyle = {bgWhiteStyle}
                      searchStyle = {bgWhiteStyle}
                      >

                      <TextInput
                          style={{borderWidth:1, borderColor:'#ccc', padding:10}}
                          editable={false}
                          placeholder="Select something yummy!"
                          value={textInputValue} />

                  </ModalSelector>
                  
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
      </Modal>
    </Container>
  )
}
export default MedicationScreen;

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
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative', borderBottomWidth:1, borderColor: '#ababab', }
const bgWhiteStyle = {backgroundColor: '#fff'}
// const dropdownStyle = {width: 'calc(100% - 0.5)'}
