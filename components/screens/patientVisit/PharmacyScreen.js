import { useEffect, useState } from "react";
import { Container } from "../components";
import { Pressable, ScrollView, TouchableOpacity, View, Text, Modal, TextInput, Keyboard  } from "react-native";
import { Picker } from "@react-native-picker/picker";
import PharmecyItem from "../components/PharmecyItem";
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from "react-native-dropdown-picker";
import { HitApi } from "../../../utils";
import { TouchableWithoutFeedback } from "react-native";

const PharmacyScreen = () => {
  const [addModal, setAddMoal] = useState(false);
  const [pharmecyList, setPharmecyList] = useState([]);
  const [pharmecySelectData, setPharmecySelectData] = useState([]);
  const [selectedPharmecy, setSelectedPharmecy] = useState(null);
  const [pharmecyDropDownOpened, setPharmecyDropDownOpened] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [selectedValue, setSelectedValue] = useState('option1');

  const getPharmecyDropdownList = async () => {
    const apiOptions = {
      endpoint: 'front/api/getPharmacyByZipcode',
      data: { zipcode : zipCode }
    }
    const ApiResp = await HitApi(apiOptions);
    setPharmecySelectData(ApiResp);
    // console.log(ApiResp);
  }

  useEffect(()=>{
    if(zipCode.length > 4){
      getPharmecyDropdownList();
    }else{
      setSelectedPharmecy(null);
      setPharmecySelectData([]);
    }

  },[zipCode]);


  useEffect(()=>{
    console.log(selectedPharmecy);

  },[selectedPharmecy]);

  return(
    <Container>
      
        <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
        </TouchableOpacity>
        <View>
          {pharmecyList.map((item, index)=><PharmecyItem key={index} data={item}/>)}
        </View>
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
                <Text style={headlineStyle}>Patient Pharmacy</Text>

                <TextInput placeholder="Your Zip Code" style={InputStyle} onChangeText={(text)=>setZipCode(text)}  returnKeyType="done" />
                <View style={spacer}></View>
                <View style={{justifyContent : 'center', width: '90%', position: 'relative' }}>
                    {/* <DropDownPicker
                    schema={{
                      label: 'pharmacy_name',
                      value: 'id'
                    }}
                    items={pharmecySelectData}
                    open={pharmecyDropDownOpened}
                    setOpen={()=>setPharmecyDropDownOpened(!pharmecyDropDownOpened)}
                    value={selectedPharmecy ? selectedPharmecy["id"] : null}
                    onSelectItem={(val)=>setSelectedPharmecy(val)}
                    showTickIcon={true}
                    disableBorderRadius={true}
                    style={{ borderRadius: 0, marginHorizontal:0, borderWidth:0, borderBottomWidth: 1, borderColor: '#ababab', minHeight: 20, paddingHorizontal: 0, paddingVertical: 0}}
                    listItemLabelStyle={{color: '#1c1e21'}}
                    placeholder="Select Gender"
                  /> */}
                  <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="Option 1" value="option1" />
                    <Picker.Item label="Option 2" value="option2" />
                    <Picker.Item label="Option 3" value="option3" />
                  </Picker>
                </View>
                <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                  <TouchableOpacity style={buttonStyle} onPress={()=>{}}>
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

export default PharmacyScreen;


const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};
const buttonTextStyle = {color: '#fff', fontSize: 14};
const saperator = {backgroundColor: '#fff', padding: 10};
const InputStyle = {width: '90%', borderBottomWidth: 1, borderColor: '#ababab'};
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const errorStyle = {textAlign: 'left', width: '100%', paddingLeft: 16, fontSize: 12, color: 'red'}
const spacer = {padding: 10}
const fullDependent = {backgroundColor: '#FEFAEF', flex: 1}
