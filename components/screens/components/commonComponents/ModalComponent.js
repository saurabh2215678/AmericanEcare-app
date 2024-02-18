import React, { useMemo } from 'react';
import { Modal, Text, View, Pressable, Image } from 'react-native';
import propTypes from 'prop-types';
import styles from '../../styles/VideocallStyle/AudioCallStyle';
import { useTheme } from '@react-navigation/native';
import images from '../../images';

  const ModalComponent = ({ children, modalVisible, setModalVisible, close, modalViewStyle, modalbuttonClose }) => {
  const { colors } = useTheme();
  
  return <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.modalcenteredView}>
    
      <View style={[styles.modalView, { ...modalViewStyle }]}>
      <Pressable
            style={styles.closeView}
            onPress={() => close ? close() : null}
          >
        {close ?
          <Pressable
            style={[styles.modalbuttonClose,  { ...modalbuttonClose }]}
            onPress={() => close()}
          >
            <Image resizeMode='cover' source={images.close} />
          </Pressable>
          : null}
        {children}
      </Pressable>

      </View>
    </View>
  </Modal>;
}

Modal.defaultProps = {
  setModalVisible: () => { },
  modalVisible: false
};

ModalComponent.propTypes = {
  setModalVisible: propTypes.func,
  modalVisible: propTypes.boolean
};

export default ModalComponent;
