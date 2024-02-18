import React, { useState,useEffect, createRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SH, Strings } from './utils';
import axios from 'axios';


const SetPassword = ({route, navigation }) => {
  const [userPassword, setuserPassword] = useState("");
  const [userConfirmPassword, setuserConfirmPassword] = useState("");
 
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
    else if(userPassword == "")
    {
      alert("Please Enter Password");
      return;
    }

    else if(userConfirmPassword == "")
    {
      alert("Please Enter Confirm Password");
      return;
    }

     else if(userConfirmPassword != userPassword)
    {
      alert("Password does not match");
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
      const body = { email: email, password:userPassword };
      axios.post(API_URL+'front/api/set_password', body, axiosConfig)
             .then((responseJson) => {

            if(responseJson.data.status == "success")
            {
              setLoading(false);
              alert(responseJson.data.msg);
              navigation.navigate("Login");
            }
            else
            {
              setLoading(false);
              alert(responseJson.data.msg);
            }
        

          })
      .catch(err => console.log('Set Password: ', err));   

    }


  }

useEffect(() => {
 
//alert(email);

}, []);


  //const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/app_images/doctor_login.png")}
        style={{ width: "100%", height: "100%",backgroundColor: 'black' }}
        imageStyle={{ opacity: 0.5}}
      >
        <View style={{ flex: 1,justifyContent:'center' }}>

          <View style={styles.wrapper}>
           <Text style={{ color: '#ffffff' }}>Set Your Password</Text>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#fff"
                style={styles.input}
                secureTextEntry
                onChangeText={(userPassword) => setuserPassword(userPassword)}
              />
            </View>

             <View style={styles.inputWrap}>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#fff"
                style={styles.input}
                secureTextEntry
                onChangeText={(userConfirmPassword) => setuserConfirmPassword(userConfirmPassword)}
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

export default SetPassword;