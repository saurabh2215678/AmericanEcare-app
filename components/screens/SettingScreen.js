import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import images from './images';
import { SH, Strings } from './utils';
import Style from './styles/CommonStyle/Style';
import { Card } from 'react-native-paper';


export default function SettingScreen({ navigation }) {
 
  logout=()=>{
    //alert("ok");
   AsyncStorage.clear();
     // AsyncStorage.getAllKeys()
     //    .then(keys => AsyncStorage.multiRemove(keys))
     //    .then(() => console.log("All Key has been cleared"));

    navigation.navigate('Login')
  }

  // const logout = async () => {
  //   try {
  //     const savedUser = await AsyncStorage.clear();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground source={images.full_bg_img_hospital} resizeMode='cover' style={Style.setbgimage}>
      <View style={styles.container}>
        <Card style={styles.cardstyle}>
          <Text style={styles.paragraph}>
            Change Password
          </Text>
        </Card>
      </View>


      <View style={styles.container}>
        <Card style={styles.cardstyle}>
          <Text style={styles.paragraph}>
           Share App
          </Text>
        </Card>
      </View>

      <View style={styles.container}>
        <Card style={styles.cardstyle}>
          <Text style={styles.paragraph}>
           Message
          </Text>
        </Card>
      </View>

      <View style={styles.container}>
        <Card style={styles.cardstyle}>
          <Text style={styles.paragraph} onPress={()=>this.logout()}>
           Logout
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
    // padding: 20,
    // backgroundColor: '#e3f2f0',
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


