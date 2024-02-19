import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground,Alert,TouchableOpacity,SafeAreaView,Modal,FlatList,RefreshControl} from 'react-native';
import {Container,AppHeader,Input,Button} from '../components';
import Styles from '../styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from '../styles/CommonStyle/Style';
import images from '../images';
//import { useSelector } from "react-redux";
import { SH, Strings } from '../utils';
import { Dropdown } from 'react-native-element-dropdown';
//import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const InsuranceScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
    const [DisplayAlert, setDisplayAlert] = useState(0)
    
    const [insurance_name, setinsurance_name] = useState("");
    const [subscriber_name, setsubscriber_name] = useState("");
    const [identification_no, setidentification_no] = useState("");
    const [group_no, set_group_no] = useState("");
    const [sysbolic_bp, set_sysbolic_bp] = useState("");
    const [rx_bin, set_rx_bin] = useState("");
    const [rx_pcn, set_rx_pcn] = useState("");
    const [rx_grp, set_rx_grp] = useState("");


    const [patientId, setpatientId] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const { request_type} = route.params || '1';


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





 submitInsurance= ()=>{

  AsyncStorage.setItem("insurance_name", insurance_name);
  AsyncStorage.setItem("subscriber_name", subscriber_name);
  AsyncStorage.setItem("identification_number", identification_no);
  AsyncStorage.setItem("group_number", group_no);
  AsyncStorage.setItem("rxbin", rx_bin);
  AsyncStorage.setItem("rxpcn", rx_pcn);
  AsyncStorage.setItem("rxgrp", rx_grp);
  
  navigation.navigate("TermScreen",{request_type: request_type});
}

skipInsurance= ()=>{
  navigation.navigate("TermScreen",{request_type: request_type});
}


const onRefresh = () => {
    // setAllergyApi([]);
    // getPatientAllergy();
  };

useEffect(() => {
  getPatientId();
 }, [patientId]);

    
  return (

  	  <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title="Insurance Information"
                        onLeftPress={() => navigation.navigate('DocumentScreen',{request_type: request_type})} />
                </View>
                <ScrollView>
                    <View style={Styles.container_insurance}>
                        <View style={Style.minviewallcontent}>

                          <Input
                              placeholder="Insurance Name"
                              onChangeText={(insurance_name) => setinsurance_name(insurance_name)}
                              value={insurance_name}
                              inputStyle={Style.inputMobile}
                          />
                            
                 
                    <View style={Styles.inputviewstyle}>
                         <Input
                              placeholder="Subscriber Name"
                              onChangeText={(subscriber_name) => setsubscriber_name(subscriber_name)}
                              value={subscriber_name}
                              inputStyle={Style.inputMobile}
                           />
                      </View>

                      <View style={Styles.inputviewstyle}>
                        <Input
                              placeholder="Identification number"
                              onChangeText={(identification_no) => setidentification_no(identification_no)}
                              value={identification_no}
                              inputStyle={Style.inputMobile}
                          />
                       </View>   

                      <View style={Styles.inputviewstyle}> 
                        <Input
                            placeholder="Group Number"
                            onChangeText={(group_no) => set_group_no(group_no)}
                            value={group_no}
                            inputStyle={Style.inputMobile}
                        />
                     </View>

                     <View style={Styles.inputviewstyle}>
                      <Input
                          placeholder="RxBIN"
                          onChangeText={(rx_bin) => set_rx_bin(rx_bin)}
                          value={rx_bin}
                          inputStyle={Style.inputMobile}
                       />
                      </View> 

                     <View style={Styles.inputviewstyle}> 
                      <Input
                          placeholder="RxPCN"
                          onChangeText={(rx_pcn) => set_rx_pcn(rx_pcn)}
                          value={rx_pcn}
                          inputStyle={Style.inputMobile}
                      />
                     </View> 

                    <View style={Styles.inputviewstyle}>  
                      <Input
                          placeholder="RxGrp"
                          onChangeText={(rx_grp) => set_rx_grp(rx_grp)}
                          value={rx_grp}
                          inputStyle={Style.inputMobile}
                      />
                        </View> 
    
                      <Button
                          title="Save and Next"
                          onPress={() => this.submitInsurance()}
                          style={Styles.button} />

                        <Text></Text>  


                        <Button
                          title="Skip"
                          onPress={() => this.skipInsurance()}
                          style={Styles.button} />
                       
                    </View>
                    </View>
                </ScrollView>
            </ImageBackground>

             
        </Container>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: '80%',
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EE59D',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: 'red',
    fontWeight: '700',
  },
dropdown: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
      borderRadius:10,
      marginTop: 0,
      marginBottom: 15,
      width:'100%'

    },
    symptomsText:{
       fontSize: 18,
       marginBottom: 15,
       color:'#152549',
    },
 modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e3f2f0',
    padding: 30,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  card_container: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 0,
    
  },
    paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20
    },
    item: {
    backgroundColor: '#eee',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  item_delete:{
    width:'10%',
    fontSize: 28,
  },
  listitems: {
    width: "100%",
    flex:1,
    marginTop: 5,
    backgroundColor: "#eee",
    padding: 10,
    flexDirection: 'row',
    justifyContent:'space-between'
},
button_two: {
    width: "100%",
    alignItems: 'flex-end',
}
});

export default InsuranceScreen;