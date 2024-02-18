import React, { useState,useEffect, createRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from './styles/LoginRegiesterStyle/OtpScreenStyle';
//import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from './components/commonComponents/Button';
import {Container,AppHeader,Input} from './components';
import { SH, Strings } from './utils';
import images from './images';
import Style from './styles/CommonStyle/Style';
import axios from 'axios';


const OTPScreen = ({route, navigation }) => {
  const colorrdata  = '#013220';
  const [userOTP, setuserOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");


  const passwordInputRef = createRef();
  const API_URL = Strings.baseUrl.url;
  const { email} = route.params;



  const handleSubmitPress = ()=>{
    if(email == "")
    {
      alert("Please Enter Email");
      return;
    }
    else if(userOTP == "")
    {
      alert("Please Enter OTP");
      return;
    }

    else
    {
      setLoading(true); 
      let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
      };
      const body = { email: email, otp:userOTP };
      axios.post(API_URL+'front/api/otp_match', body, axiosConfig)
             .then((responseJson) => {

            if(responseJson.data.status == "success")
            {
              setLoading(false);
             navigation.navigate("SetPassword",{email: email});
            }
            else
            {
              setLoading(false);
              alert(responseJson.data.msg);
            }
        

          })
      .catch(err => console.log('OTP verification: ', err));   

    }


  }

useEffect(() => {
 


}, []);


  //const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1,justifyContent:'center' }}>
       <ImageBackground
        source={require("../../assets/app_images/doctor_login.png")}
        style={{ width: "100%", height: "100%",backgroundColor: 'black' }}
        imageStyle={{ opacity: 0.5}}
      >
        <View style={{ flex: 1,justifyContent:'center' }}>
       
          <View style={styles.wrapper}>
           <Text style={{ color: '#ffffff' }}>OTP has been sent to you email</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor="#fff"
                style={styles.input}
                onChangeText={(userOTP) => setuserOTP(userOTP)}
              />
            </View>
           

            <TouchableOpacity onPress={handleSubmitPress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{loading ? 'Loading..' : 'Submit'}</Text>
              </View>
            </TouchableOpacity>

          
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  innerContainer: {
    flex: 1,
  },
  background: {
    width: null,
    height: null,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#ccc",
    borderRadius: 10,
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#831c81",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "right",
  },

  registerText: {
    color: "#fff",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 18,
  },
});

export default OTPScreen;