import React from 'react';
import { View, Text, Image, ScrollView, } from 'react-native';
import images from '../../../images';
import { Container, Button } from '../../commonComponents'
import Styles from '../../../styles/VideocallStyle/AudioCallStyle';
import Style from '../../../styles/CommonStyle/Style';
import LinearGradient from 'react-native-linear-gradient';
import RouteName from '../../../routes/RouteName';
import { useSelector } from "react-redux";

const AudioCallConnected = ({ navigation }) => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  return (
    <Container>
      <LinearGradient
        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
        colors={[colorrdata, colorrdata]}
        style={Styles.item} >
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}>
          <View style={Styles.container}>
            <View style={Style.minviewaudioacall}>
              <View style={Styles.setflexview}>
              <Text style={Styles.callendtext}>Apointment Ended</Text>
                <Text style={Styles.callendtext}>13:43</Text>
                <View style={Styles.flexrowsetcenter}>
                  <Image source={images.Doctore_width__100}
                    style={Styles.seimagstyleendcall}
                    resizeMode={'cover'} />
                </View>
              </View>
              <View style={Styles.flexcentertext}>
                <Text style={Styles.callendtext}>Dr. Jane Cooper</Text>
              </View>
              <Button title="Write a review" buttonStyle={Styles.setbuttoncolor} buttonTextStyle={{color:colorrdata}}
                onPress={() => navigation.navigate(RouteName.REVIEWS_SCREEN)} />
              <View style={Styles.marginbottomspace}>
                <Button title="Go to dashboard" buttonStyle={Styles.setbuttoncolor} buttonTextStyle={{color:colorrdata}}
                  onPress={() => navigation.navigate(RouteName.HOME_SCREEN)} />
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
}
export default AudioCallConnected;