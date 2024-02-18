import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import images from '../../../images';
import { Container } from '../../commonComponents'
import Styles from '../../../styles/VideocallStyle/VideocallStyle';
import Style from '../../../styles/CommonStyle/Style';
import Icon from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/FontAwesome';
import IconL from 'react-native-vector-icons/AntDesign';
import IconV from 'react-native-vector-icons/MaterialCommunityIcons';
import IconC from 'react-native-vector-icons/MaterialIcons';
import { useTogglePasswordVisibility } from '../../../utils/MuteandUnMuteCall';
import RouteName from '../../../routes/RouteName';
import { useSelector } from "react-redux";

const VideoCall = ({ navigation }) => {
    const { colorrdata } = useSelector(state => state.commonReducer) || {};
    const { rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    const { rightIconfour, text, handlePasswordVisibilityfour } =
        useTogglePasswordVisibility();
    const { imageset, handlePasswordVisibilityfive } =
        useTogglePasswordVisibility();
    const OnLoginPress = () => {
        navigation.replace(RouteName.END_CALL);
    }
    const [SmallScreen, setSmallScreen] = useState(images.Doctore_width__225);
    const [BigScreen, setBigScreen] = useState(images.Doctore_width__370);
    const [item, setitem] = useState(true);
    const changescreen = (data) => {
        setitem(data);
        if (data === false) {
            setSmallScreen(images.Doctore_width__370);
            setBigScreen(images.Doctore_width__225);
        } else {
            setBigScreen(images.Doctore_width__370);
            setSmallScreen(images.Doctore_width__225);
        }
    }
    return (
        <Container>
            <ScrollView
                contentContainerStyle={{
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#046665',
                }}>
                <ImageBackground source={BigScreen} resizeMode='stretch' style={Styles.setbgimage} />
                <View style={Styles.container}>
                    <View style={Style.minviewaudioacall}>
                        <View style={Styles.flexrowsetaudiocall}>
                            <View style={Styles.seticonandtextflex}>
                                <IconL name="lock" color={'white'} size={20} style={Styles.setlockicon} />
                                <Text style={Styles.calldirationstyle}>End-to-end encrypted</Text>
                            </View>
                            <View style={Styles.flexrowtextimage}>
                                <TouchableOpacity onPress={() => changescreen(!item)}>
                                    <Image source={SmallScreen}  style={[Styles.setusertopimage,{borderColor:colorrdata}]} />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.setspacediv}>
                                <View style={Styles.textcenterview}>
                                    <Text style={Styles.usernametext}>John Smith</Text>
                                </View>
                                <View style={Styles.seticonview}>
                                    <View>
                                        <TouchableOpacity style={Styles.microphone} onPress={handlePasswordVisibility}>
                                            <IconM name={rightIcon} size={25} color={'white'} style={Styles.eyeiconset} />
                                        </TouchableOpacity>
                                        <Text style={Styles.setmutecolortext}>Mute</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={Styles.microphone}>
                                            <IconC name="flip-camera-ios" color={'white'} size={30} style={Styles.eyeiconset} />
                                        </TouchableOpacity>
                                        <Text style={Styles.setmutecolortext}>Flip</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={Styles.microphone} onPress={handlePasswordVisibilityfour}>
                                            <IconV name={rightIconfour} color={'white'} size={30} style={Styles.eyeiconset} />
                                        </TouchableOpacity>
                                        <Text style={Styles.setmutecolortext}>camera</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={Styles.iconpositionset} onPress={() => OnLoginPress()}>
                                            <Icon name="call" color={'white'} size={30} style={Styles.eyeiconset} />
                                        </TouchableOpacity>
                                        <Text style={Styles.setmutecolortext}>End Call</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};
export default VideoCall;