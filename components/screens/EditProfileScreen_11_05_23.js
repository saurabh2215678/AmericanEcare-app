import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, TextInput, Pressable, } from 'react-native';
import moment from 'moment';
import images from './images';
import { Container, AppHeader, Input, Button, RadioButton } from './components';
import DateTimePicker from "react-native-modal-datetime-picker";
import { Strings } from './utils';
import RouteName from './routes/RouteName';
import Styles from './styles/LoginRegiesterStyle/RegisterScreenStyle';
import Style from './styles/CommonStyle/Style';
import { useTogglePasswordVisibility } from './utils/Passwordviseble';
import IconG from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
//import Alert from './components/commonComponents/SweetaelertModal';

//const EditProfileScreen = ({navigation}) => {
export default function EditProfileScreen({ navigation }) {
    //const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [state, setState] = useState('');
    const [DisplayAlert, setDisplayAlert] = useState(0)
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [dateOfBrith, setDateOfBrith] = useState(Strings.register.date_of_brith);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const onChangeText = (text, type) => {
        if (type === 'user_name') setUsername(text);
        if (type === 'emaiId') setEmailId(text);
        if (type === 'mobile') setMobileNumber(text);
        if (type === 'password') setPassword(text);
        if (type === 'state') setState(text);
        if (type === 'city') setCity(text);
        if (type === 'pincode') setPincode(text);
    };
    const showDateTimePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDateTimePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleDatePicked = (date) => {
        hideDateTimePicker(),
            setDateOfBrith(moment(date, "YYYY-MM-DDTHH:mm:ss Z").local().format('DD-MM-YYYY'));
    };
    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
        useTogglePasswordVisibility();
    const [password, setPassword] = useState('');

    const { passwordVisibilitytwo, rightIcontwo, handlePasswordVisibilitytwo } =
        useTogglePasswordVisibility();
    const [conformpassword, setconformpassword] = useState('');
    useEffect(() => {
        navigation.addListener('focus', () => {
            setDisplayAlert(0);
        });
    }, [navigation]);
    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="#e3f2f0" />
            <View style={Styles.setbgcolorthe}>
                <View style={Style.setheaderspacepadding}>
                    <AppHeader leftImage={images.back_image} title='Edit' onLeftPress={() => navigation.navigate('AccountScreen')} />
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        height: 'auto'
                    }}>
                    <View style={Styles.container}>
                        <View style={Style.minviewallcontent}>
                            <Input
                                placeholder={Strings.register.name_hint}
                                onChangeText={(text) => onChangeText(text, 'user_name')}
                                value={username}
                                inputStyle={Style.inputMobile}
                            />
                            <Input
                                placeholder={Strings.register.last_name_hint}
                                onChangeText={(text) => onChangeText(text, 'user_name')}
                                value={username}
                                inputStyle={Style.inputMobile}
                            />
                            <Input
                                placeholder={Strings.register.email_hint}
                                onChangeText={(text) => onChangeText(text, 'emaiId')}
                                value={emailId}
                                inputStyle={Style.inputMobile}
                            />

                             <Input
                                placeholder="Address"
                                onChangeText={(text) => onChangeText(text, 'emaiId')}
                                value={emailId}
                                inputStyle={Style.inputMobile}
                            />

                            <TextInput
                                placeholder={Strings.register.mobile_number_hint}
                                onChangeText={(text) => onChangeText(text, 'mobile')}
                                value={mobileNumber}
                                keyboardType="numeric"
                                style={Style.numberinputMobile}
                            />
                           
                            <View style={Styles.inputviewstyle}>
                                <View style={Styles.setinputwidth}>
                                    <Input
                                        placeholder={Strings.register.state_hint}
                                        onChangeText={(text) => onChangeText(text, 'state')}
                                        value={state}
                                        inputStyle={Style.inputMobile}
                                    />
                                </View>
                                <View style={Styles.setinputwidth}>
                                    <Input
                                        placeholder={Strings.register.city_hint}
                                        onChangeText={(text) => onChangeText(text, 'city')}
                                        value={city}
                                        inputStyle={Style.inputMobile}
                                    />
                                </View>
                            </View>
                            <TextInput
                                placeholder={Strings.register.pincode_hint}
                                onChangeText={(text) => onChangeText(text, 'pincode')}
                                value={pincode}
                                keyboardType={"numeric"}
                                style={Style.numberinputMobile}
                            />
                            
                           
                            <View style={Styles.setbuttonview}>
                                <Button
                                    title={Strings.ChangePassword.update}
                                    onPress={() => { setDisplayAlert(1) }}
                                    style={Styles.button} />
                            </View>
                            
                        </View>
                    </View>
                </ScrollView>
                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    onConfirm={handleDatePicked}
                    onCancel={hideDateTimePicker}
                />
            </View>
        </Container >
    );
};

