import { Keyboard, Modal, Pressable, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import { Container } from "../components/index";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";
import AllergyItem from "../components/AllergyItem";
import { Picker } from "@react-native-picker/picker";
import { HitApi } from "../../../utils";
import ModalSelector from "react-native-modal-selector-searchable";

const AllergyScreen = () => {
  const [addModal, setAddMoal] = useState(false);
  const [allergyList, setAllergyList] = useState([]);
  const [selectBox, setselectBox] = useState();
  const [allergyDropDownList, setAllergyDropDownListList] = useState([]);
  const [selectedAllergy, setselectedAllergy] = useState();

  const getAllergyList = async () => {

    const apiOptions = {
      endpoint: 'front/api/getTwentyAllergyList',
      data: { }
    }
    const ApiResp = await HitApi(apiOptions);
    if(ApiResp.length > 1){
      let index = 0;
      const dpdata = [];
      ApiResp.forEach(element => {
        const modifiedItem = {key: index++, label: element['description '], data: element};
        dpdata.push(modifiedItem);
      });
        setAllergyDropDownListList(dpdata);
    }
    // console.log(ApiResp);
  }

  const getAllergyListByKeyword = async (keyword) => {

    const apiOptions = {
      endpoint: 'front/api/search_allergy_with_keywords',
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
        setAllergyDropDownListList(dpdata);
    }
  }



  const handleSearchChange = (val) => {
    getAllergyListByKeyword(val);
    // console.log('val', val);
  }

  useEffect(()=>{
    getAllergyList();
  },[]);

  return(
    <Container>
      <ScrollView style={fullDependent}>

      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
            <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
              <Icon name="plus" size={12} color="#ffffff" />
            </View>
        </TouchableOpacity>
        <View>
          {allergyList.map((item, index)=><AllergyItem key={index} data={item}/>)}
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
                  <View style={spacer}></View>
                {/* <Picker
                    selectedValue={selectedAllergy}
                    // onValueChange={(itemValue,selectBox itemIndex) => setselectedAllergy(itemValue)}
                    style={selectStyle}
                  >
                    {allergyDropDownList.map((item)=> <Picker.Item key={item['id']} label={item["description "]} value={item['id']} style={optionStyle} />)}
                    
 
                </Picker> */}
                <View style={spacer}></View>
                <ModalSelector
                        data={allergyDropDownList}
                        initValue="Select Drugs"
                        supportedOrientations={['landscape']}
                        accessible={true}
                        value={selectedAllergy}
                        placeHolderTextColor="red"
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(val)=>setselectedAllergy(val)}
                        optionContainerStyle = {bgWhiteStyle}
                        optionStyle = {bgWhiteStyle}
                        sectionStyle = {bgWhiteStyle}
                        cancelStyle = {bgWhiteStyle}
                        searchStyle = {bgWhiteStyle}
                        onChangeSearch = {handleSearchChange}
                        >

                    </ModalSelector>
                </View>


             

              </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </Container>
  )
}
export default AllergyScreen;
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