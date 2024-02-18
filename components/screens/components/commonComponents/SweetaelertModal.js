import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, TouchableOpacity, View } from "react-native";
import Style from '../../styles/CommonStyle/Style';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
//import IconF from 'react-native-vector-icons/dist/AntDesign';
import IconF from '@expo/vector-icons/AntDesign';
import Button from '../../components/commonComponents/Button';
import { useNavigation } from '@react-navigation/native';
import RouteName from '../../routes/RouteName';
//import { useSelector } from "react-redux";

function SweetaelertModal(props) {
   // const { colorrdata } = useSelector(state => state.commonReducer) || {};
    const  colorrdata  = '#013220';
    const {  link, onPress, buttonTextStyle, imagesource, spacedImages } = props;
    const [modalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();
    return (
        <View> 
        <View style={Style.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={Style.setbgcolorgrsay}>
                <View style={Style.centeredView}>
                    <View style={Style.modalView}>
                        <View style={Style.setroundcenter}>
                            <View style={[Style.checkiconright,{borderColor:colorrdata}]}>
                                <IconF style={[Style.setbackgroundicon,{color:colorrdata}]} name="check" size={45} />
                            </View>
                        </View>
                        <View style={Style.registertextset}>
                            <Text style={[Style.settext,{color:colorrdata}]}>{props.message}</Text>
                        </View>
                        <View style={Style.buttonminview}>
                            <View style={Style.setokbutton}>
                                <Button  buttonStyle={{backgroundColor:colorrdata}} title="Ok"
                                 onPress={() => { setModalVisible(!modalVisible); navigation.navigate(props.link) }}            
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
      
    </View>
    </View>
    );
};
export default SweetaelertModal;

