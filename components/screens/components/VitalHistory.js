import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View, Modal, Pressable, TouchableWithoutFeedback, Keyboard, Text, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container } from "./commonComponents";
import { HitApi, focusNextInput } from "../../../utils";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";

const VitalHistory = () => {
    const storeUser = useSelector((state) => state.user.userData)
    const [updating, setUpdating] = useState(false);
    const [formData, setFormData] = useState({});
    const [submitted, setsubmitted] = useState(false);
    const [bmi, setBmi] = useState("");

    const handleTextChange = (text, fieldName) => {
        const newFormData = {...formData, [fieldName] : text};
        setFormData(newFormData);
        if(fieldName === "weight" || fieldName === "height_in" || fieldName === "height_ft"){
            getBmi();
        }
    }

    const saveVitalSign = async () => {
        const apiOptions = {
            endpoint: 'front/api/save_vital_sign',
            data: formData,
            withStatus: true
        }
        const ApiResp = await HitApi(apiOptions);
        getVitalSign();
        Toast.show({
            type: 'success',
            text1: ApiResp.msg
        });
    }

    const validateAndSave = () => {
        setsubmitted(true);
        if(
            formData["height_ft"] &&
            formData["height_in"] &&
            formData["height_in_cm"] &&
            formData["bp_low"] &&
            formData["bp_high"] &&
            formData["temprature"] &&
            formData["weight"] &&
            formData["bmi"] &&
            formData["pulse"] &&
            formData["o2sat"]
        ){
            saveVitalSign()
        }
    }

    const getVitalSign = async () => {
        const apiOptions = {
            endpoint: 'front/api/get_vital_sign',
            data: {
                patient_id: storeUser.id
            }
        }
        const ApiResp = await HitApi(apiOptions);
        setFormData({...ApiResp, patient_id: storeUser.id})
        setBmi(ApiResp.bmi)
    }

    const getBmi = async () => {
        if(formData.weight && formData.height_in && formData.height_ft){
            const apiOptions = {
                endpoint: 'front/api/get_bmi',
                data: formData,
                withStatus: true
            }
            const ApiResp = await HitApi(apiOptions);
            setBmi(`${ApiResp.bmi}`);
        }

    }
    useEffect(()=>{
        if(storeUser){
            getVitalSign();
        }
    },[storeUser]);

    useEffect(()=>{
        setFormData({...formData, bmi});
    },[bmi]);



    const getValue = (name) => {
        const value = formData[name] ? formData[name] : "";
        return value;
    }

    return(
        <Container>
            <ScrollView style={fullDependent}>
                <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={()=>setUpdating(!updating)}>
                    <View style={{paddingHorizontal:7, paddingVertical: 6, margin: 8, borderRadius: 3 }}>
                        {updating ? <Icon name="times" size={18} color="#030303" /> :<Icon name="pencil" size={18} color="#030303" />}
                    </View>
                </TouchableOpacity>

                <View style={{paddingHorizontal: 16}}>
                    <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '100%', alignItems: 'center', justifyContent: 'center'}}>

                        <Text style={labelStyle}>Weight</Text>
                        <TextInput placeholder="Weight" value={getValue('weight')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'weight')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(bmiInputRef)} ref={(input) => (weightInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['weight']) && <Text style={errorStyle}>Weight is Required</Text>}
                        <View style={spacer}></View>

                        <Text style={labelStyle}>Height (ft)</Text>
                        <TextInput placeholder="Height ft" value={getValue('height_ft')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'height_ft')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(heightInInputRef)} keyboardType="numeric" editable={updating}/>
                        {(submitted && !formData['height_ft']) && <Text style={errorStyle}>Height in ft is Required</Text>}
                        <View style={spacer}></View>
            
                        <Text style={labelStyle}>Height (Inch)</Text>
                        <TextInput placeholder="Height Inch" value={getValue('height_in')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'height_in')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(heightCmInputRef)} ref={(input) => (heightInInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['height_in']) && <Text style={errorStyle}>Height in Inch is Required</Text>}
                        <View style={spacer}></View>

                        <Text style={labelStyle}>Height(cm)</Text>
                        <TextInput placeholder="Height cm" value={getValue('height_in_cm')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'height_in_cm')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(bpLowInputRef)} ref={(input) => (heightCmInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['height_in_cm']) && <Text style={errorStyle}>Height in cm is Required</Text>}
                        <View style={spacer}></View>

                        <Text style={labelStyle}>BMI</Text>
                        <TextInput placeholder="Bmi" value={bmi} style={InputStyle} onChangeText={(text)=>setBmi(text)}  returnKeyType="next" onSubmitEditing={() => focusNextInput(pulseInputRef)} ref={(input) => (bmiInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !bmi) && <Text style={errorStyle}>Bmi is Required</Text>}
                        <View style={spacer}></View>

                        <Text style={labelStyle}>Sysbolic BP</Text>
                        <TextInput placeholder="BP High" value={getValue('bp_high')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'bp_high')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(tempratureInputRef)} ref={(input) => (bpHighInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['bp_high']) && <Text style={errorStyle}>BP High is Required</Text>}
                        <View style={spacer}></View>

                        <Text style={labelStyle}>Diastolic BP</Text>
                        <TextInput placeholder="BP Low" value={getValue('bp_low')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'bp_low')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(bpHighInputRef)} ref={(input) => (bpLowInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['bp_low']) && <Text style={errorStyle}>BP Low is Required</Text>}
                        <View style={spacer}></View>
                    
                       

                        <Text style={labelStyle}>Temprature</Text>
                        <TextInput placeholder="Temprature" value={getValue('temprature')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'temprature')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(weightInputRef)} ref={(input) => (tempratureInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['temprature']) && <Text style={errorStyle}>Temprature is Required</Text>}
                        <View style={spacer}></View>

                        

                        

                        <Text style={labelStyle}>Pulse</Text>
                        <TextInput placeholder="Pulse" value={getValue('pulse')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'pulse')}  returnKeyType="next" onSubmitEditing={() => focusNextInput(o2satInputRef)} ref={(input) => (pulseInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['pulse']) && <Text style={errorStyle}>Pulse is Required</Text>}
                        <View style={spacer}></View>
                    
                        <Text style={labelStyle}>o2sat</Text>
                        <TextInput placeholder="o2sat" value={getValue('o2sat')} style={InputStyle} onChangeText={(text)=>handleTextChange(text, 'o2sat')}  returnKeyType="done"  ref={(input) => (o2satInputRef = input)} keyboardType="numeric" editable={updating} />
                        {(submitted && !formData['o2sat']) && <Text style={errorStyle}>o2sat is Required</Text>}

                        {updating && <View style={{flexDirection: 'row', width: '90%', marginTop: 25}}>
                            <TouchableOpacity style={buttonStyle} onPress={validateAndSave}>
                                <Text style={buttonTextStyle}>Update</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}
export default VitalHistory;
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
const labelStyle = {fontSize: 14, color: '#616161', width: "90%"}