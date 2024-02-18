import React, { useState,useEffect } from 'react';
import {View, Text, StyleSheet,TextInput,StatusBar,ScrollView, Pressable,ImageBackground,Alert,TouchableOpacity,SafeAreaView,Modal,FlatList,RefreshControl,Image} from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';

const DocumentScreen = ({route,navigation}) => {
    const API_URL = Strings.baseUrl.url;
   
   
    const [patientId, setpatientId] = useState("");
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [labresult, setlabresult] = useState(null);
    const [labimage, setlabimage] = useState(null);
    const [other_image, setother_image] = useState(null);
    const [labresultFileName, setlabresultFileName] = useState(null);
    const [labImageFileName, setlabImageFileName] = useState(null);
    const [OtherImageFileName, setOtherImageFileName] = useState(null);
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

  const pickLabImage = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            filename:true
          });

          if (!result.canceled) {

            let filename_labImage = result.assets[0].uri.replace(/^.*[\\\/]/,"");
            setlabimage(result.assets[0].uri);
            setlabImageFileName(filename_labImage);
          }
  };


   const pickLabResult = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            filename:true
          });

          if (!result.canceled) {

            let filename_labResult = result.assets[0].uri.replace(/^.*[\\\/]/,"");
            
            setlabresult(result.assets[0].uri);
            setlabresultFileName(filename_labResult);
          }
  };

    const pickOtherDocument = async () => {
          // No permissions request is necessary for launching the image library
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            filename:true
          });

          if (!result.canceled) {

            let filename_other = result.assets[0].uri.replace(/^.*[\\\/]/,"");
            setother_image(result.assets[0].uri);
            setOtherImageFileName(filename_other);
          }
  };



const submitDocuments = () =>{

   let formData = new FormData();
   let type = "image";
   formData.append('patient_picture', { uri: labresult, name: labresultFileName, type }); 

   axios.post(API_URL+'front/api/chk_file', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => {
            console.log(res.data.status);
        }).catch(err => {
            console.log(err.response);
        });

  navigation.navigate("InsuranceScreen",{request_type: request_type});
}


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
                        title="Upload Documents"
                        onLeftPress={() => navigation.navigate('VitalScreen',{request_type: request_type})} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        
                    }}>
            <View style={Styles.container}>
                <View style={Style.minviewallcontent}>


       <Text> Do you have any lab result</Text>   
        <TouchableOpacity onPress={pickLabResult}>       
        <Image
          style={{ alignSelf: 'center',top: 10 }}
          source={require('../../../assets/app_images/camera.png')}
        />
         {labresult && <Image source={{ uri: labresult }} style={{ width: 70, height: 70 }} />}
        </TouchableOpacity>

      <Text></Text>

          <Text> Do you have any lab image</Text>   
          <TouchableOpacity onPress={pickLabImage}>       
            <Image
              style={{ alignSelf: 'center',top: 10 }}
              source={require('../../../assets/app_images/camera.png')}
            />
        </TouchableOpacity>
         {labimage && <Image source={{ uri: labimage }} style={{ width: 70, height: 70 }} />}

        <Text></Text>

          <Text> Do you have any document</Text> 
          <TouchableOpacity onPress={pickOtherDocument}>         
        <Image
          style={{ alignSelf: 'center',top: 10 }}
          source={require('../../../assets/app_images/camera.png')}
        />
        </TouchableOpacity>
         {other_image && <Image source={{ uri: other_image }} style={{ width: 70, height: 70 }} />}
               
             
           
                 
               <Text></Text>
                   
                  <Button
                      title="Upload Documents"
                      onPress={() => submitDocuments()}
                      style={Styles.button} />

                       <Text></Text>

                         <Button
                      title="Skip And Next"
                      onPress={() => submitDocuments()}
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

export default DocumentScreen;