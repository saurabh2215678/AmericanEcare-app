import { useEffect, useState } from "react";
import { Pressable, ScrollView, TouchableOpacity, View, Text, Modal, TextInput, Keyboard} from 'react-native';
import { Container } from "../components";
import PastsurgeryItem from "../components/Pastsurgeryitem";
// import PastsurgeryItem from "../components/PastsurgeryItem";
import { TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { HitApi } from "../../../utils";

const PastSurgeryScreen = () => {
  const storeUser = useSelector((state) => state.user.userData)
  const [addModal, setAddMoal] = useState(false);
  const [selectedPharmecy, setSelectedPharmecy] = useState(null);
  const [pharmecyList, setPharmecyList] = useState([]);

  const [submitted, setsubmitted] = useState(false);
  const [AddSurgery, setAddSurgery] = useState('');
  const [NewSurgery, setNewSurgery] = useState('');
  const [Other, setOther] = useState('');

  // const [pharmecySelectData, setPharmecySelectData] = useState([defaultSelectOption]);


  const savePharmacy = async () => {
    setsubmitted(true);
    console.log(AddSurgery)

    if(selectedPharmecy && (selectedPharmecy != -1)){
      const apiOptions = {
        endpoint: 'front/api/patient_pharmacy_save',
        data: { patient_id : storeUser.id, pharmacy_id: selectedPharmecy},
        withStatus: true
      }
      const ApiResp = await HitApi(apiOptions);
      setAddMoal(false);
      if(ApiResp.status === "success"){
        getPharmecyList();
        Toast.show({
          type: 'success',
          text1: "Successfully Saved"
        });
      }else{
        Toast.show({
          type: 'error',
          text1: "Something went wrong"
        });
      }
    }
  }

  const getPharmecyList = async () => {
    
    const apiOptions = {
      endpoint: 'front/api/getPastSurgeryHistory',
      data: { patient_id : storeUser.id},
      
    }
   
    const ApiResp = await HitApi(apiOptions);
    setPharmecyList(ApiResp);
    console.log(ApiResp);
    
  }
  useEffect(() => {
    getPharmecyList();
    
  }, []); 
  useEffect(() => {
    console.log(pharmecyList);
   
  }, [pharmecyList]);
  return (
    
    <Container>
    <ScrollView style={fullDependent}>
      <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setAddMoal(true)}>
          <View style={{backgroundColor: '#33BAD8', paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
            <Icon name="plus" size={12} color="#ffffff" />
          </View>
      </TouchableOpacity>
      <View>
        <Text>xfffff</Text>
        {pharmecyList.map((item, index)=><PastsurgeryItem key={index} data={item}/>)}
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
              <TextInput placeholder="Add Surgery" value={AddSurgery} style={InputStyle} onChangeText={(text)=>setAddSurgery(text)}  returnKeyType="done" />
                <View style={spacer}></View>

                <TextInput placeholder="Surgery" value={NewSurgery} style={InputStyle} onChangeText={(text)=>setNewSurgery(text)}  returnKeyType="done" />
                <View style={spacer}></View>

                <TextInput placeholder="Other" value={Other} style={InputStyle} onChangeText={(text)=>setOther(text)}  returnKeyType="done" />
                <View style={spacer}></View>
              
  
           
              {/* {(submitted && (!selectedPharmecy || (selectedPharmecy === -1))) && <Text style={errorStyle}>Pharmacy is Required</Text>} */}
  
              <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                <TouchableOpacity style={buttonStyle} onPress={savePharmacy}>
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
    // <View style={styles.container}>
    //   <Text>Hello World Test</Text>
    // </View>
  );
 
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

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
const selectWrapper = {justifyContent : 'center', width: '90%', position: 'relative', borderBottomWidth:1, borderColor: '#ababab', }






