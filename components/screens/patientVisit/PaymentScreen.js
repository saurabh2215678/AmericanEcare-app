import React, { useState,useEffect } from 'react';
import {View, Text, Image, StyleSheet,TextInput,StatusBar,ScrollView,TouchableOpacity, Pressable,ImageBackground,Modal} from 'react-native';
import {Container,AppHeader,Input,Button} from '../components';
//import Styles from '../styles/LoginRegiesterStyle/RegisterScreenStyle';
import Styles from '../styles/CreditCard/PayNameScreenStyle';
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

const PaymentScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
    const colorrdata  = '#013220';
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [PatientState, setpatientState] = useState('');
   // const [visitTypes, setuservisitTypes] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [days, setdays] = useState(false);
    const [weeks, setweek] = useState(false);
    const [patientId, setpatientId] = useState("");
    const [modalVisibletwo, setmodalVisibletwo] = useState(false);
    const [ApplyAlert, setApplyAlert] = useState(0);

    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [PatientVisitType, setPatientVisitType] = useState("");

    const [VisitName, setVisitName] = useState("");
    const [VisitPrice, setVisitPrice] = useState(0);
    const [Discount, setDiscount] = useState(0);
    const [CouponId, setCouponId] = useState(0);
    const [visitTotal, setVisitTotal] = useState(0);
    const [coupon_val, setcoupon_val] = useState(0);
    const { request_type} = route.params;




  const getPatientId = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');

        if (value !== null) {
          setpatientId(value);
        }
      } catch (e) {
        alert('Failed to fetch the input from storage');
      }
    };  

 const getPatientVisitType = async () => {
      try {
        const visit_id = await AsyncStorage.getItem('visit_id');

        if (visit_id !== null) {
          setPatientVisitType(visit_id);
        }
      } catch (e) {
        alert('Failed to fetch the visit id from storage');
      }
    };  


  
const getPatientState = () => {
    // Function to get the value from AsyncStorage
    AsyncStorage.getItem('state').then(
      (value) =>
        setpatientState(value),
    );
  };

  const getProfileDetails = async () => {

          let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_detail', body, axiosConfig)
             .then((responseJson) => {

                        //console.log("patientId:"+patientId);
                        const first_name = responseJson.data.data.first_name;
                        const middle_name = responseJson.data.data.middle_name;
                        const last_name = responseJson.data.data.last_name;
                        const email = responseJson.data.data.email;
                        const address = responseJson.data.data.address;
                        const phone = responseJson.data.data.mobile;
                        const state_new = responseJson.data.data.state;
                        const pincode = responseJson.data.data.pincode;
                        const city = responseJson.data.data.city;
                        const zone = responseJson.data.data.zone;
                        const full_name = first_name+ ' '+middle_name+' '+last_name;
  

                        setUsername(full_name);
                        setAddress(address);
                        setMobileNumber(phone);
                       
                    })
               
             .catch(err => console.log('GET PROFILE: ', err));

};



const getVisitName=()=>{

  let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      };
    const body = { visit_id: PatientVisitType };

     axios.post(API_URL+'front/api/get_visit_name', body, axiosConfig)
             .then((responseJson) => {


                    const visit_type_name = responseJson.data.data.visit_type_name;

                    const visit_type_price = responseJson.data.data.visit_type_price;
                   

                    setVisitName(visit_type_name);
                    setVisitPrice(visit_type_price);

                    let visitTotal = 0;
                    if(visit_type_price > 0)
                    {
                      if(Discount > 0)
                      {
                        visitTotal = visit_type_price - Discount;
                      }
                      else
                      {
                        visitTotal = visit_type_price;
                      }
                      
                    }

                  setVisitTotal(visitTotal);

                    
                       
              })
               
             .catch(err => console.log('GET Visit Type: ', err));

    }






const applyCoupon=()=>{

 // alert(coupon_val);
  let axiosConfig = {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          }
        };
        const body = { patient_id: patientId,code:coupon_val,visit_type_id:PatientVisitType };

       

         axios.post(API_URL+'front/api/group_discount', body, axiosConfig)
             .then((responseJson) => {


              if(responseJson.data.status == 'success'){
                alert(responseJson.data.msg);
                setmodalVisibletwo(!modalVisibletwo)
                setDiscount(responseJson.data.discount_amount);
                setCouponId(responseJson.data.coupon_id);
                getVisitName();
                
              }
              else{
                alert(responseJson.data.msg);
              }

              //console.log(responseJson.data.discount_amount);

                    // const visit_type_name = responseJson.data.data.visit_type_name;

                    // const visit_type_price = responseJson.data.data.visit_type_price;
                   

                    // setVisitName(visit_type_name);
                    // setVisitPrice(visit_type_price);
                       
              })
               
             .catch(err => console.log('GROUP DISCOUNT API: ', err));
}


const submitPayment=()=>{
//alert(visitTotal);
    AsyncStorage.setItem("total", JSON.stringify(visitTotal));
    AsyncStorage.setItem("CouponId", JSON.stringify(CouponId));
    AsyncStorage.setItem("Discount", JSON.stringify(Discount));
    navigation.navigate("CardScreen",{request_type: request_type})

}


useEffect(() => {

getPatientId();  
getProfileDetails();
getPatientVisitType();
getVisitName();
//getVisitTotal();
//alert("PatientVisitType:"+VisitPrice);

}, [PatientState,patientId,PatientVisitType,getVisitName]);

    
  return (

  	 <Container>
      <View style={Style.setheaderspacepadding}>
        <AppHeader leftImage={images.back_image} title='Book Now' onLeftPress={() => navigation.navigate('TermScreen',{request_type: request_type})} />
      </View>
      <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover' style={Style.setbgimage}>
        <View style={Styles.minstyleviewphotograpgytwo}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              width: '100%',
              height: 'auto',
            }}>
            <View style={Styles.keybordtopviewstyle}>
              <View style={Styles.minflexview}>
                <View style={Styles.imagetextflex}>
                  <View style={Styles.setimagewidth}>
                    <Image source={images.Doctore_width__100} style={Styles.creditcard} />
                  </View>
                  <View>
                    <Text style={[Styles.settextstyle, { color: colorrdata }]}>{username}</Text>
                    <Text style={[Styles.settextstyle, { color: colorrdata }]}>{address}</Text>
                    <Text style={[Styles.settextstyle, { color: colorrdata }]}>{mobileNumber}</Text>
                  </View>
                </View>
                <TouchableOpacity style={Styles.setwhitecolor}>
                  <Text style={Styles.setstartext}>{VisitName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.flexrowiocntwo} onPress={() => navigation.navigate('TermScreen')}>
                  <TouchableOpacity onPress={() => setmodalVisibletwo(true)}>
                    <Text style={Styles.setapplyacoupon}>Apply a Coupon</Text>
                  </TouchableOpacity>
                 
                  <View style={Styles.centeredView}>
                   
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisibletwo}
                    >
                      <View style={Styles.setbgcolorgrsay}>
                        <View style={Styles.centeredView}>
                          <View style={Styles.modalView}>
                            <TouchableOpacity
                              onPress={() => setmodalVisibletwo(!modalVisibletwo)}
                            >
                              <Icon name="close" size={30} style={Styles.iconclosestyle} />
                            </TouchableOpacity>
                            <View style={Style.setalldetailesminview}>
                              <TextInput
                                placeholder="Enter Coupon Code"
                                onChangeText={(coupon_val) => setcoupon_val(coupon_val)}
                                style={Style.setinputstyleapply}
                              />
                              <View style={Styles.setbutton}>
                                <Button title="Apply"
                                  onPress={() => applyCoupon()}
                                />
                              </View>


                               <View style={Styles.setbutton}>
                                <Button title="Cancel"
                                  onPress={() =>setmodalVisibletwo(!modalVisibletwo)}
                                />
                              </View>

                            </View>
                            <View style={Style.centeredView}>
                             
                              {ApplyAlert !== 0 ?
                                <Alert message='Apply Discount $70 Successful' link={RouteName.HOME_SCREEN} />
                                :
                                null
                              }
                            </View>
                          </View>
                        </View>
                      </View>
                    </Modal>
                  </View>
                  
                </TouchableOpacity>
                <View style={Styles.margintopset}>
                  <TouchableOpacity style={Styles.flexdierationtext}>
                    <Text style={Styles.textcolorblack}>Subtotal</Text>
                    <Text style={Styles.textcolorgrays}>${VisitPrice}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.flexdierationtext}>
                    <Text style={Styles.textcolorblack}>Discount</Text>
                    <Text style={Styles.textcolorgrays}>${Discount}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.flexdierationtextwo}>
                    <Text style={Styles.textcolorblacktwo}>Total</Text>
                    <Text style={Styles.textcolorblacktwo}>${visitTotal}</Text>
                  </TouchableOpacity>
                  <Button title="Pay By Credit Card"
                    onPress={() => { submitPayment() }} />
                </View>
              </View>
            </View>
            <View style={Style.centeredView}>
             
              {DisplayAlert !== 0 ?
                <Alert message='Payment  Successful' link={RouteName.THANK_YOU} />
                :
                null
              }
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </Container>
  );
};


export default PaymentScreen;