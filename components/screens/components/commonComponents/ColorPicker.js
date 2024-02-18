import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable, Modal, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import Styles from '../../styles/CommonStyle/Colorpicker';
import { color_picker_set_action } from "../../redux/action/CommonAction";
import { useDispatch, useSelector } from "react-redux";
 import Button from '../../components/commonComponents/Button';
import images from '../../images';

const ColorPickerset = () => {
  const [modalVisible, setModalVisible] = useState(false);  
  const { colorrdata } = useSelector(state => state.commonReducer) || {colorrdata};
  const [currentColor, setCurrentColor] = useState(colorrdata);
  const dispatch = useDispatch();
  const onColorChange = (selectedColor) => {
    setCurrentColor(selectedColor);
    dispatch(color_picker_set_action(selectedColor))
  };

  return (
    <View>
      <View style={Styles.centeredViewtwo}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <View style={Styles.setheight}>
                <View
                  style={[
                    { backgroundColor: currentColor, borderRadius: 7 },
                  ]}
                >
                  <Text style={Styles.setcolorwhite}>{currentColor}</Text>
                  <ColorPicker
                    // ref={r => { picker = r }}
                    color={currentColor}
                    onColorChange={onColorChange}
                    onColorSelected={'red'}
                    thumbSize={50}
                    noSnap={true}
                    defaultProps={true}
                    row={false}
                    // color={'#0055a6'}
                    gapSize={0}
                    discreteLength={0}
                    sliderHidden={true}
                    defaultProps={true}
                    discrete={true}
                  />
                </View>
              </View>
              <View style={Styles.setbuttonwidth}>
                <Button title="ok"
                  buttonStyle={{ backgroundColor: colorrdata, borderColor: colorrdata }}
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        </Modal>
         <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image style={Styles.colorpickerpickerimagwidth} resizeMode='cover' source={images.Color_picker_image} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default ColorPickerset;