import React, {useState} from 'react';
import { View, Text, Image,ScrollView, TouchableOpacity, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../images';
import { Strings } from '../../../utils';
import { Container } from '../../commonComponents'
import Styles from '../../../styles/VideocallStyle/AudioCallStyle';
import Style from '../../../styles/CommonStyle/Style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/FontAwesome';
import { useTogglePasswordVisibility } from '../../../utils/MuteandUnMuteCall';
import RouteName from '../../../routes/RouteName';
import { useSelector } from "react-redux";

const VideoCall = ({ navigation }) => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const [pressStatus, setpressStatus] = useState(false);  

  const { rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const OnLoginPress = () => {
    navigation.replace(RouteName.END_CALL);
  }
  const { imageset, handlePasswordVisibilityfive } =
    useTogglePasswordVisibility();

  return (
    <Container>
      <LinearGradient
        start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
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
              <View style={Styles.flexrowsetaudiocall}>
                <View style={Styles.marginrightset}>
                  <Image source={images.Doctore_width__100}
                    style={Styles.seimagstyle}
                    resizeMode={'cover'} />
                </View>
                <View>
                  <Text style={Styles.setharrytext}>John Smith</Text>
                  <Text style={Styles.setwhitetextnornal}>{Strings.video_call_connection.Connecting}</Text>
                </View>
              </View>
              <View style={Styles.setspacediv}>
                <View style={Styles.seticonview}>
                  <View>
                    <TouchableOpacity style={Styles.microphone} onPress={handlePasswordVisibility}>
                      <IconM name={rightIcon} size={25} color={'white'} style={Styles.eyeiconset} />
                    </TouchableOpacity>
                    <Text style={Styles.setmutecolortext}>Mute</Text>
                  </View>
                  <View>
                    <TouchableOpacity style={Styles.iconpositionset} onPress={() => OnLoginPress()}>
                      <Icon name="call" color={'white'} size={30} style={Styles.eyeiconset} />
                    </TouchableOpacity>
                    <Text style={Styles.setmutecolortext}>End Call</Text>
                  </View>
                  <View>
                  <TouchableOpacity style={Styles.microphone} onPress={handlePasswordVisibilityfive}>
                  <Image source={imageset}
                    style={pressStatus ? Styles.setimagstyle : Styles.setimagstyletwo}
                    resizeMode={'stretch'} />
                    </TouchableOpacity>
                    <Text style={Styles.setmutecolortext}>Speaker</Text>
                    </View>
                 
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </Container>
  );
};
export default VideoCall;