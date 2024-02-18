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
  TextInput,
  ImageBackground,
  StatusBar
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Styles from './styles/DefoltScreenStyle/DoctoreListingStyle';
import { Card } from 'react-native-paper';
import images from './images';
import { Rating } from 'react-native-ratings';
import { Container,AppHeader } from './components';
import { SH, Strings } from './utils';
import Style from './styles/CommonStyle/Style';
import axios from 'axios';

export default function MyVisitScreen({ navigation }) {
 

 const colorrdata  = '#013220';
 const API_URL = Strings.baseUrl.url;
 const [patientId, setpatientId] = useState("");
 const [visitData, setvisitData] = useState("");
 


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

      try {
        const MyvisitData = JSON.parse(await AsyncStorage.getItem('MyvisitData')) ;

       // console.log(MyvisitData);

        if (MyvisitData !== null) {
         // console.log(MyvisitData);
          setvisitData(MyvisitData);
        }
      } catch (e) {
        alert('Failed to fetch the input from storage');
      }


};  

useEffect(() => {
 getPatientId();  
 my_all_visit();
});



  const visitDataList = (item,) => {
        return (
            <TouchableOpacity>
                <View style={Styles.setwhitebox}>
                    <View style={Styles.flexrowsetimage}>
                       
                        <View style={Styles.imagecenterstyleset}>
                            <Text  style={[Styles.textsetdoctore,{color:colorrdata}]}>{item.reason}</Text>
                            <View style={Styles.setwidth}>
                                <Text style={Styles.textsetdoctoretwo}>{item.date_time}</Text>
                                <Text style={Styles.textsetdoctoretwo}>{item.expireddate} <Text style={Styles.blackcolorsettext}>{item.accepted} {item.accepted=='Accepted' ? '('+item.doctor_name+')' : ''}</Text></Text>
                            </View>
                            <View style={Styles.flexrowsettextview}>
                                <View>
                                    <Text style={Styles.textsetdoctoretwo}>{item.disease}</Text>
                                </View>
                                
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
         <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover'>
          <View style={Style.setheaderspacepadding}>
            <AppHeader leftImage={images.back_image} title={"My Visit Details"} onLeftPress={() => navigation.navigate('DashboardScreen')} />
          </View>
            <View style={Styles.minstyleviewphotograpgy}>
                
                    <View style={Styles.container}>
                        <View style={Styles.minviewallcontent}>
                           
                            <FlatList
                                data={visitData}
                                renderItem={({ item, index }) => visitDataList(item, index)}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                b741 style={Styles.setflex}
                            />
                        </View>
                    </View>
                
            </View>
            </ImageBackground>
        </Container>
    );


  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eee',
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
