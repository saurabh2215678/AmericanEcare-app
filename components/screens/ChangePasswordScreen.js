import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView,ImageBackground, TouchableOpacity, StatusBar, TextInput, Pressable, StyleSheet,Alert} from 'react-native';
import moment from 'moment';
import images from './images';
import { Container, AppHeader, Input, Button, RadioButton } from './components';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Strings } from './utils';
import RouteName from './routes/RouteName';
import Styles from './styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from './styles/CommonStyle/Style';
import { useTogglePasswordVisibility } from './utils/Passwordviseble';
import IconG from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Alert from './components/commonComponents/SweetaelertModal';
import axios from 'axios';

//const EditProfileScreen = ({navigation}) => {
export default function ChangePasswordScreen({ navigation }) {
    //const navigation = useNavigation();
    const API_URL = Strings.baseUrl.url;
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [DisplayAlert, setDisplayAlert] = useState(0);
    const [loading, setLoading] = useState(false);

    const [patientId, setpatientId] = useState("");   

    
    const onChangeText = (text, type) => {
        if (type === 'user_name') setUsername(text);
        if (type === 'emaiId') setEmailId(text);
        if (type === 'mobile') setMobileNumber(text);
        if (type === 'password') setPassword(text);
        if (type === 'address') setAddress(text);
        if (type === 'state') setState(text);
        if (type === 'city') setCity(text);
        if (type === 'pincode') setPincode(text);
    };

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


const submitForm = () =>{
  if(currentPassword == ""){
    alert("Please Enter Current Password");
    return;
  }

  else if(newPassword == ""){
    alert("Please Enter New Password");
    return;
  }

  else if(confirmPassword == ""){
    alert("Please Enter New confirm Password");
    return;
  }


  
  let axiosConfig = {
      headers: {
          "Content-Type": "application/x-www-form-urlencoded",
      }
    };

  const body = { patient_id: patientId, old_password:currentPassword, new_password:newPassword,confirm_new_password:confirmPassword };

  setLoading(true);

  axios.post(API_URL+'front/api/change_password', body, axiosConfig)
             .then((responseJson) => {



      var status = responseJson.data.status ;
      if(status == "success")
      {
       setLoading(false);
       alert(responseJson.data.msg);
       navigation.navigate("AccountScreen")
      }
      else
      {
        setLoading(false);
        alert(responseJson.data.msg);

      }


    })
    .catch(err => console.log('Change Password: ', err));


}

    

    useEffect(() => {
        navigation.addListener('focus', () => {
            setDisplayAlert(0);
        });
       //alert(patientId);
      getPatientId();
   
    }, [navigation,getPatientId]);
    
   return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader
                        leftImage={images.back_image}
                        title={Strings.ChangePassword.title}
                        onLeftPress={() => navigation.goBack()} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        height: '100%'
                    }}>
                    <View style={Styles.container}>
                        <View style={Style.minviewallcontent}>
                            <Input
                                placeholder={Strings.ChangePassword.current_password}
                                onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                                value={currentPassword}
                                secureTextEntry
                                inputStyle={Style.inputMobile}
                            />
                            <Input
                                placeholder={Strings.ChangePassword.new_password}
                                onChangeText={(newPassword) => setNewPassword(newPassword)}
                                value={newPassword}
                                secureTextEntry
                                inputStyle={Style.inputMobile}
                            />
                            <Input
                                placeholder={Strings.ChangePassword.confirm_password}
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                value={confirmPassword}
                                secureTextEntry
                                inputStyle={Style.inputMobile}
                            />
                            <Button
                                title={loading ? 'Loading...' : 'Update'}
                                onPress={() => { submitForm() }}
                                style={Styles.button} />
                        </View>
                        <View style={Style.centeredView}>
                           
                            {DisplayAlert !== 0 ?
                                <Alert message='Password chenge Successful' link={RouteName.HOME_SCREEN} />
                                :
                                null
                            }
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </Container>
    )
};

const styles = StyleSheet.create({

     dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#ffffff',
      borderRadius:10,
      marginTop: 12,
      marginBottom: 12,
      width:'100%'
    },

    Zonedropdown: {
      height: 40,
      borderColor: 'grey',
      borderWidth: 0.5,
      paddingHorizontal: 8,
      backgroundColor: '#fff',
      borderRadius:10,
      marginTop: 0,
      width:'100%'

    },

    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: '#ccc',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },

    placeholderStyle: {
      fontSize: 16,
      color: '#ccc',
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
      
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    label_style:{
      textAlign: 'left'

    },

});    

