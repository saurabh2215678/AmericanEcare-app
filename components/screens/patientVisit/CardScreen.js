import React, { useState,useEffect } from 'react';
import {View, Text, Image, StyleSheet,TextInput,StatusBar,ScrollView,TouchableOpacity, Pressable,ImageBackground,Modal} from 'react-native';
import {Container,AppHeader,Input,Button} from '../components';
//import Styles from '../styles/LoginRegiesterStyle/RegisterScreenStyle';
import Styles from '../styles/CreditCard/SaveCardScreenStyle';
import Style from '../styles/CommonStyle/Style';
import images from '../images';
//import { useSelector } from "react-redux";
import { SH, Strings } from '../utils';
import { Dropdown } from 'react-native-element-dropdown';
//import AntDesign from '@expo/vector-icons/AntDesign';
import Alert from '../components/commonComponents/SweetaelertModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

const CardScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
    const colorrdata  = '#013220';
    const [mobileNumber, setMobileNumber] = useState('');
    const [CvvNumber, setCvvNumber] = useState('')
    const [CardAddress, setCardAddress] = useState('')
    const [PatientState, setpatientState] = useState('');
    const [patientId, setpatientId] = useState("");
    const [dependent_id, setdependent_id] = useState("");

    const [total, set_total] = useState(0);
    const [booking_date, setbooking_date] = useState('');
    const [booking_time, setbooking_time] = useState('');
    const [reason_visit, setreason_visit] = useState('');
    const [current_health_concern,set_current_health_concern] = useState('');
    const [visit_type,set_visit_type] = useState('');
    const [visit_id,set_visit_id] = useState('');
    const [doctor_id,set_doctor_id] = useState('');
    const [duration,set_duration] = useState('');
    const [weight,set_weight] = useState('');
    const [height_in,set_height_in] = useState('');
    const [height_ft,set_height_ft] = useState('');
    const [bmi,set_bmi] = useState('');
    const [bp_low,set_bp_low] = useState('');
    const [bp_high,set_bp_high] = useState('');
    const [temprature,set_temprature] = useState('');
    const [pulse,set_pulse] = useState('');
    const [o2sat,set_o2sat] = useState('');
    const [insurance_name,set_insurance_name] = useState('');
    const [subscriber_name,set_subscriber_name] = useState('');
    const [identification_number,set_identification_number] = useState('');
    const [group_number,set_group_number] = useState('');
    const [rxbin,set_rxbin] = useState('');
    const [rxpcn,set_rxpcn] = useState('');
    const [rxgrp,set_rxgrp] = useState('');
    const [credit_card_number,set_credit_card_number] = useState('');
    const [card_holder_name,set_card_holder_name] = useState('');
    const [billing_address,set_billing_address] = useState('');
    const [expiration,set_expiration] = useState('');
    const [cvc,set_cvc] = useState('');
    const [loading, setLoading] = useState(false);
    const [symptoms, setsymptoms] = useState(false);
    const [coupon_id, setcoupon_id] = useState(false);
    const [discount, setdiscount] = useState(false);

    const [labresult_type, setlabresult_type] = useState(false);
    const [labresult, setlabresult] = useState(false);
    const [labresultFileName, setlabresultFileName] = useState(false);

    const [labimage_type, setlabimage_type] = useState(false);
    const [labimage, setlabimage] = useState(false);
    const [labImageFileName, setlabImageFileName] = useState(false);



    const [other_image_type, setother_image_type] = useState(false);
    const [other_image, setother_image] = useState(false);
    const [OtherImageFileName, setOtherImageFileName] = useState(false);



    const { request_type} = route.params;
    

    // const resetAction = StackActions.reset({
    //   index: 0, // navigate to the first screen in the stack
    //   actions: [
    //     navigation.navigate({ routeName: 'DashboardScreen' }), // replace 'Home' with your desired screen name
    //   ],
    // });



const getVarforBooking = async () => {

   const booking_date = await AsyncStorage.getItem('booking_date');
        const booking_time = await AsyncStorage.getItem('booking_time');
        const reason_visit = await AsyncStorage.getItem('reason_visit');
        const current_health_concern = await AsyncStorage.getItem('current_health_concern');
        const visit_type = await AsyncStorage.getItem('visit_type');
        const visit_id = await AsyncStorage.getItem('visit_id');
        const doctor_id = await AsyncStorage.getItem('doctor_id');
        const duration = await AsyncStorage.getItem('duration');
        const weight = await AsyncStorage.getItem('weight');
        const height_in = await AsyncStorage.getItem('height_in');
        const height_ft = await AsyncStorage.getItem('height_ft');
        const bmi = await AsyncStorage.getItem('bmi');
        const bp_low = await AsyncStorage.getItem('bp_low');
        const bp_high = await AsyncStorage.getItem('bp_high');
        const temprature = await AsyncStorage.getItem('temprature');
        const pulse = await AsyncStorage.getItem('pulse');
        const o2sat = await AsyncStorage.getItem('o2sat');
        const insurance_name = await AsyncStorage.getItem('insurance_name');
        const subscriber_name = await AsyncStorage.getItem('subscriber_name');
        const identification_number = await AsyncStorage.getItem('identification_number');
        const group_number = await AsyncStorage.getItem('group_number');
        const rxbin = await AsyncStorage.getItem('rxbin');
        const rxpcn = await AsyncStorage.getItem('rxpcn');
        const rxgrp = await AsyncStorage.getItem('rxgrp');
        const dependent_id = await AsyncStorage.getItem('dependent_id');
        
        const total= JSON.parse(await AsyncStorage.getItem('total'));
        const symptoms= JSON.parse(await AsyncStorage.getItem('symptoms')); 
        const CouponId= JSON.parse(await AsyncStorage.getItem('CouponId')); 
        const Discount= JSON.parse(await AsyncStorage.getItem('Discount')); 

        const labresult_type= await AsyncStorage.getItem('labresult_type');
        const labresult= await AsyncStorage.getItem('labresult');
        const labresultFileName= await AsyncStorage.getItem('labresultFileName');

        const labimage_type= await AsyncStorage.getItem('labimage_type');
        const labimage= await AsyncStorage.getItem('labimage');
        const labImageFileName= await AsyncStorage.getItem('labImageFileName');

        const other_image_type= await AsyncStorage.getItem('other_image_type');
        const other_image= await AsyncStorage.getItem('other_image');
        const OtherImageFileName= await AsyncStorage.getItem('OtherImageFileName');



        //const total = await AsyncStorage.getItem('total');

        setbooking_date(booking_date);
        setbooking_time(booking_time);
        setreason_visit(reason_visit);
        set_current_health_concern(current_health_concern);
        set_visit_type(visit_type);
        set_visit_id(visit_id);
        set_doctor_id(doctor_id);
        set_duration(duration);
        set_weight(weight);
        set_height_in(height_in);
        set_height_ft(height_ft);
        set_bmi(bmi);
        set_bp_low(bp_low);
        set_bp_high(bp_high);
        set_temprature(temprature);
        set_pulse(pulse);
        set_o2sat(o2sat);
        set_insurance_name(insurance_name);
        set_subscriber_name(subscriber_name);
        set_identification_number(identification_number);
        set_group_number(group_number);
        set_rxbin(rxbin);
        set_rxpcn(rxpcn);
        set_rxgrp(rxgrp);
        set_total(total);
        setdependent_id(dependent_id);
        setsymptoms(symptoms);
        setcoupon_id(CouponId);
        setdiscount(Discount);

        setlabresult_type(labresult_type);
        setlabresult(labresult);
        setlabresultFileName(labresultFileName);

        setlabimage_type(labimage_type);
        setlabimage(labimage);
        setlabImageFileName(labImageFileName);

        setother_image_type(other_image_type);
        setother_image(other_image);
        setOtherImageFileName(OtherImageFileName);

}


const getPatientId = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');

       

     // alert(value);  

        if (value !== null) {
          setpatientId(value);
        }
      } catch (e) {
       // alert('Failed to fetch the input from storage for patient id');
      }
    };  

    const getPatientVisitType = async () => {
      try {
        const visit_id = await AsyncStorage.getItem('visit_id');

        if (visit_id !== null) {
          setPatientVisitType(visit_id);
        }
      } catch (e) {
        alert('Failed to fetch the visit id from storage for visit type');
      }
    };  


  
const getPatientState = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('state').then(
      (value) =>
        setpatientState(value),
    );
  };


// const final_submit = ()=>{

//   let status  = "success";
//   let phi_id  = "23";


//   if(status == "success")
//   {
//     update_documents(phi_id);
//   }


// }


const update_documents = async (phi_id)=>{

     

    const labresult_type= await AsyncStorage.getItem('labresult_type');
    const labresult= await AsyncStorage.getItem('labresult');
    const labresultFileName= await AsyncStorage.getItem('labresultFileName');

    const labimage_type= await AsyncStorage.getItem('labimage_type');
    const labimage= await AsyncStorage.getItem('labimage');
    const labImageFileName= await AsyncStorage.getItem('labImageFileName');

    const other_image_type= await AsyncStorage.getItem('other_image_type');
    const other_image= await AsyncStorage.getItem('other_image');
    const OtherImageFileName= await AsyncStorage.getItem('OtherImageFileName');

    // alert(API_URL);
    // return;

    let formData = new FormData();
    
     formData.append('patient_id', patientId); 

     formData.append('phi_id', phi_id);
     formData.append('lab_result', { uri: labresult, name: labresultFileName, type:labresult_type }); 

     formData.append('lab_picture', { uri: labimage, name: labImageFileName, type:labimage_type }); 

     formData.append('lab_document', { uri: other_image, name: OtherImageFileName, type:other_image_type });

    

    // console.log(formData) ;

   await axios.post(API_URL+'front/api/update_visit_demographic', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(responseJson => {

         // alert(responseJson.data.status);

         if(responseJson.data.status == "success")
         {
             navigation.navigate("ThankyouScreen",{
                request_type: request_type,
              });
         }
         else
         {
          alert("File Upload Error");
         }


       }).catch(err => {
         // console.log(err);
            alert(err.response);
             setLoading(false)
        }); 

}


const final_submit = ()=>{

  if(!card_holder_name)
  {
    alert("Enter Card holder name");
    return;
  }

  if(!credit_card_number)
  {
    alert("Enter Card number");
    return;
  }

  if(!expiration)
  {
    alert("Enter Card Expiry date");
    return;
  }

  if(!cvc)
  {
    alert("Enter Cvv number");
    return;
  }

  if(!billing_address)
  {
    alert("Enter Billing Address");
    return;
  }

  let expiration_arr = expiration.split('/');
  let month = expiration_arr[0];
  let year = expiration_arr[1];
  const formdata = new FormData();
  formdata.append("patient_id",  patientId);
  formdata.append("dependent_id",  dependent_id);
  formdata.append("total", total);
  formdata.append("card_holder_name", card_holder_name);
  formdata.append("credit_card_number", credit_card_number);
  formdata.append("expiration_month", month);
  formdata.append("expiration_year", year);
  formdata.append("cvc", cvc);
  formdata.append("billing_address", billing_address);
  formdata.append("booking_date", booking_date);
  formdata.append("booking_time", booking_time);
  formdata.append("reason_visit", reason_visit);
  formdata.append("current_health_concern", current_health_concern);
  formdata.append("visit_type", visit_type);
  formdata.append("request_type", request_type);
  formdata.append("doctor_id", doctor_id);
  formdata.append("duration", duration);
  formdata.append("weight", weight);
  formdata.append("height_in", height_in);
  formdata.append("height_ft", height_ft);
  formdata.append("bmi", bmi);
  formdata.append("bp_low", bp_low);
  formdata.append("bp_high", bp_high);
  formdata.append("temprature", temprature);
  formdata.append("pulse", pulse);
  formdata.append("o2sat", o2sat);
  formdata.append("insurance_name", insurance_name);
  formdata.append("subscriber_name", subscriber_name);
  formdata.append("identification_number", identification_number);
  formdata.append("group_number", group_number);
  formdata.append("rxbin", rxbin);
  formdata.append("rxpcn", rxpcn);
  formdata.append("rxgrp", rxgrp);
  formdata.append("device", 'ios');
  formdata.append("coupon_id", coupon_id);
  formdata.append("discount", discount);
  if(labresult && labimage && other_image){
    formdata.append("lab_result", { uri: labresult, name: labresultFileName, type:labresult_type });
    formdata.append("lab_picture", { uri: labimage, name: labImageFileName, type:labimage_type });
    formdata.append("lab_document", { uri: other_image, name: OtherImageFileName, type:other_image_type });
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
  };

  fetch(API_URL+"front/api/booking_visit", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log('result ==', result);
      clearLabFilesFromAsyncStorage();
    })
    .catch((error) => console.error(error));
}
const clearLabFilesFromAsyncStorage = async () => {
  const labresult_type= await AsyncStorage.removeItem('labresult_type');
  const labresult= await AsyncStorage.removeItem('labresult');
  const labresultFileName= await AsyncStorage.removeItem('labresultFileName');

  const labimage_type= await AsyncStorage.removeItem('labimage_type');
  const labimage= await AsyncStorage.removeItem('labimage');
  const labImageFileName= await AsyncStorage.removeItem('labImageFileName');

  const other_image_type= await AsyncStorage.removeItem('other_image_type');
  const other_image= await AsyncStorage.removeItem('other_image');
  const OtherImageFileName= await AsyncStorage.removeItem('OtherImageFileName');
 
  navigation.reset({
    index: 0,
    routes: [{ name: 'ThankyouScreen' }],
  });

  console.log('ceared');

}

useEffect(() => {

getPatientId(); 
getVarforBooking() 
//alert(visit_type);
//getVisitTotal();
//alert("PatientVisitType:"+VisitPrice);

}, [PatientState,patientId]);

    
  return (

  	<Container>
      <View style={Style.setheaderspacepadding}>
        <AppHeader leftImage={images.back_image} title={"Card Details"} onLeftPress={() => navigation.navigate('PaymentScreen',{request_type: request_type})} />
      </View>
      <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover' style={Style.setbgimage}>
      <View style={Styles.minstyleviewphotograpgy}>
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            contentContainerStyle={{
              width: '100%',
              height: 'auto',
            }}>
            <View style={Styles.keybordtopviewstyle}>
              <View style={Styles.minflexview}>
                <View style={Styles.minviewsigninscreen}>
                  <View style={Styles.setwidthimage}>
                    <Image source={images.Crideit_card} resizeMode='cover' style={Styles.creditcard} />
                  </View>
                  <View style={Styles.setstyleinputtext}>
                    <Text style={Styles.textstyle}>Name</Text>
                    <TextInput
                        placeholder="Devid Warner"
                        onChangeText={(card_holder_name) => set_card_holder_name(card_holder_name)}
                        value={card_holder_name}
                        style={Styles.inputstyle}
                      />
                  </View>
                  <Text></Text>
                  <View style={Styles.setstyleinputtext}>
                    <View style={Styles.flexrowsetcemera}>
                      <View>
                        <Text style={Styles.textstyle}>Card Number</Text>
                        <TextInput
                        placeholder="1234567812345678"
                        keyboardType="numeric"
                        onChangeText={(credit_card_number) => set_credit_card_number(credit_card_number)}
                        value={credit_card_number}
                        style={Styles.inputstyle}
                      />
                      </View>
                    </View>
                  </View>
                  <View style={Styles.flexrowsetinput}>
                    <View style={Styles.setstyleinputtexttwo}>
                      <Text style={Styles.textstyle}>mm/yy</Text>
                      <TextInput
                        placeholder="00/00"
                        onChangeText={(expiration) => set_expiration(expiration)}
                        value={expiration}
                        style={Styles.inputstyle}
                      />
                      
                    </View>
                    <View style={Styles.setstyleinputtexttwo}>
                      <Text style={Styles.textstyle}>cvv</Text>
                      <TextInput
                        placeholder="502"
                        onChangeText={(cvc) => set_cvc(cvc)}
                        value={cvc}
                        keyboardType="numeric"
                        style={Styles.inputstyle}
                      />
                    </View>
                  </View>

                  <Text></Text>

                   <View style={Styles.setstyleinputtext}>
                    <View style={Styles.flexrowsetcemera}>
                      <View>
                        <Text style={Styles.textstyle}>Card Address</Text>
                        <TextInput
                        placeholder="Address"
                       onChangeText={(billing_address) => set_billing_address(billing_address)}
                        value={billing_address}
                        style={Styles.inputstyle}
                      />
                      </View>
                    </View>
                  </View>

                  <View style={Styles.setbuttonstyle}>
                    <Button  title={loading ? 'Processing, Please Wait...' : 'Pay Now'} onPress={() => final_submit()} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </Container>
  );
};


export default CardScreen;