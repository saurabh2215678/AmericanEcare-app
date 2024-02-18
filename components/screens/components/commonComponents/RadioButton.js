
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import Styles from '../../styles/LoginRegiesterStyle/RadioButtonStyle';
import RadioForm from 'react-native-simple-radio-button';
import { colorsset } from '../../utils';
import { useSelector } from "react-redux";

const QuesAnsPair = (props) => {
  //const { colorrdata } = useSelector(state => state.commonReducer) || {};
 const  colorrdata  = '#013220';
  const [chosenOption, setChosenOption] = useState('apple'); //will store our current user options
  const options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ]; //

  return (

    <View style={{ flexDirection: 'row' }}>
      <RadioForm
        radio_props={options}
        buttonColor={colorrdata}
        selectedButtonColor={colorrdata}
        buttonSize={10}
        buttonOuterSize={20}
        style={Styles.flexrowradiobutton}
        labelStyle={{
          fontSize: 18,
          color: 'black',
          marginRight: 20,
        }}
        initial={0} //initial value of this group
        onPress={(value) => {
          setChosenOption(value);
        }} //if the user changes options, set the new value
      />
    </View>

  );
}

export default QuesAnsPair;

