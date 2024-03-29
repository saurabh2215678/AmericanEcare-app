import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Button,
  ImageBackground
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-paper';
import images from './images';
import { SH, Strings } from './utils';
import Style from './styles/CommonStyle/Style';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { hideHeader } from "../store/headerSlice";

export default function DashboardScreen({ navigation }) {
 const API_URL = Strings.baseUrl.url;
 const dispatch = useDispatch();
  const [patientId, setpatientId] = useState("");

   const startVisitNow = () => {
    dispatch(hideHeader())
      navigation.navigate("DateAndTimeScreen")
   }

   const scheduleVisitNow = () => {
    dispatch(hideHeader())
      navigation.navigate("ScheduleScreen")
   }

   const MyVisitScreen = () => {
    dispatch(hideHeader())
      navigation.navigate("MyVisitScreen")
   }


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

const my_all_visit = async ()=>{

 // const MyvisitData= JSON.parse(await AsyncStorage.getItem('MyvisitData')) ;
 // if (MyvisitData == null) {
     let axiosConfig = {
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          }
        };
      const body = { patient_id: patientId};

      axios.post(API_URL+'front/api/my_all_visit', body, axiosConfig)
             .then((responseJson) => {

             

      var count = Object.keys(responseJson.data.data).length;

       let visitArray = [];
        for (var i = 0; i < count; i++) {
          visitArray.push({
            disease: responseJson.data.data[i].disease,
            subdisease: responseJson.data.data[i].subdisease,
            doctor_name: responseJson.data.data[i].doctor_name,
            date_time: responseJson.data.data[i].date_time,
            accepted: responseJson.data.data[i].accepted,
            patient_name: responseJson.data.data[i].patient_name,
            dependent_name: responseJson.data.data[i].dependent_name,
            dependent_relationship: responseJson.data.data[i].dependent_relationship,
            reason: responseJson.data.data[i].reason,
          });
        }

       // setvisitData(visitArray);
       // setvisitData(visitArray);
        AsyncStorage.setItem("MyvisitData", JSON.stringify(visitArray));

         //console.log(visitArray);
       
    })
    .catch(err => console.log('My Visit API: ', err));
  //}

}; 



const get_symtoms_with_subsymtoms = async () => {
   
     const SymptomsData= JSON.parse(await AsyncStorage.getItem('SymptomsData')) ;

       if (SymptomsData == null) {
              var config = {
              method: 'get',
              url: API_URL+`front/api/symtoms_with_subsymtoms`,
              headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
                },
              };

              axios(config)
              .then(response => {
            
              let data =response.data.data;

               //AsyncStorage.setItem('SymptomsData', data);
               AsyncStorage.setItem("SymptomsData", JSON.stringify(data));

              //setData(data);

              })
            .catch(error => {
              console.log(error);
            });

       }
   
 };

const getProfileDetails = async () => {

    const patientData= JSON.parse(await AsyncStorage.getItem('patientData')) ;

       if (patientData == null) {

     let axiosConfig = {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
              }
            };
            const body = { patient_id: patientId };

            axios.post(API_URL+'front/api/get_patient_detail', body, axiosConfig)
             .then((responseJson) => {

                 AsyncStorage.setItem("patientData", responseJson.data.data);

                        // //console.log("patientId:"+patientId);
                        // const first_name = responseJson.data.data.first_name;
                        // const middle_name = responseJson.data.data.middle_name;
                        // const last_name = responseJson.data.data.last_name;
                        // const email = responseJson.data.data.email;
                        // const address = responseJson.data.data.address;
                        // const phone = responseJson.data.data.mobile;
                        // const state_new = responseJson.data.data.state;
                        // const pincode = responseJson.data.data.pincode;
                        // const city = responseJson.data.data.city;
                        // const zone = responseJson.data.data.zone;
                        // const full_name = first_name+ ' '+middle_name+' '+last_name;

                        // setUsername(first_name);
                        // setUserlastname(last_name);
                        // setEmailId(email);
                        // setAddress(address);
                        // setMobileNumber(phone);
                        // setUserState(state_new);
                        // setCity(city);
                        // setPincode(state_new);
                        // setUserZone(zone);


                    })
               
             .catch(err => console.log('GET PROFILE: ', err));

           }  

};


useEffect(() => {
  getPatientId();  
  get_symtoms_with_subsymtoms();
  my_all_visit();
});

  return (
    <SafeAreaView>
    <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover' style={Style.setbgimage}>
     
      <View style={styles.container}>
        <Card style={styles.cardstyle}  onPress={() => startVisitNow()}>
         <Image
          style={{ alignSelf: 'center',top: 10 }}
          source={require('../../assets/app_images/start_visit_now.png')}
        />
          <Text style={styles.paragraph}>
            Start Visit Now
          </Text>
        </Card>
        
      </View>




      <View style={styles.container}>
        <Card style={styles.cardstyle}  onPress={() => scheduleVisitNow()}>
         <Image
          style={{ alignSelf: 'center',top: 10 }}
          source={require('../../assets/app_images/medical-history.png')}
        />
          <Text style={styles.paragraph}>
            Schedule a visit
          </Text>
        </Card>
      </View>

      <View style={styles.container}>
        <Card style={styles.cardstyle} onPress={() => MyVisitScreen()}>
         <Image
          style={{ alignSelf: 'center',top: 10 }}
          source={require('../../assets/app_images/appointment.png')}
        />
          <Text style={styles.paragraph}>
           My visits/Requests
          </Text>
        </Card>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    top: 10
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
  },

   cardstyle: {
     backgroundColor: '#fff',
  },
});
