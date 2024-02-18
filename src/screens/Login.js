import React, { useState, createRef } from "react";
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
import Loader from "./Components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }

    if (userEmail) {
      let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
      if (reg.test(userEmail) === false) {
        alert("Email is Not Correct");
        return;
      }
    }

    setLoading(true);
    let dataToSend = { username: userEmail, password: userPassword };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://americanecare.com/front/api/patient_login", {
      method: "POST",
      body: formBody,
      headers: {
        //Header Defination
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        //console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === "success") {
          AsyncStorage.setItem("user_id", responseJson.data.email);
          console.log(responseJson.data.email);
          navigation.replace("DrawerNavigator");
        } else {
          //setErrortext(responseJson.msg);
          alert(responseJson.msg);
          // console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  //const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./doctor_login.png")}
        style={{ width: "100%", height: "100%" }}
        imageStyle={{ opacity: 0.5,backgroundColor: 'black'}}
      >
        <View style={{ flex: 1,justifyContent:'center' }}>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#fff"
                style={styles.input}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              />
            </View>
            <View style={styles.inputWrap}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry
                style={styles.input}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              />
            </View>

            <TouchableOpacity activeOpacity={0.5}>
              <View>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmitPress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Register")}
            >
              <View>
                <Text style={styles.registerText}>
                  Don't have an Account?{" "}
                  <Text style={{ fontWeight: "bold" }}> Signup</Text>
                </Text>
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

export default Login;