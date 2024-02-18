import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Visibility from './Visibility';
import { SF, SH, SW } from '../../utils';
import { useTheme } from '@react-navigation/native';
function Input({
  title,
  placeholder,
  titleStyle,
  inputStyle,
  onChangeText,
  value,
  textprops,
  inputprops,
  onBlur,
  onFocus,
  inputType,
  autoFocus
}) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {width: '100%'},
        title_style: {
          width: '100%',
          fontSize: SF(12),
          color: colors.tundora,
          fontWeight: '400',
          marginBottom: SH(5),
          ...titleStyle,
        },
        input_style: {
          width: '100%',
          borderRadius: SH(20),
          fontSize: SF(20),
          color: colors.black,
          fontWeight: '200',
          paddingVertical: SH(8),
          paddingHorizontal: SH(25),
          minHeight: SH(45),
          backgroundColor : "#E4F3F3",
          ...inputStyle,
        },
      }),
    [title, titleStyle, inputStyle, colors],
  );
  return (
    <View style={styles.container}>
      <Visibility visible={title}>
        <Text style={styles.title_style} {...textprops}>
          {title}
        </Text>
      </Visibility>
      <TextInput
        style={styles.input_style}
        
        {...inputprops}
      />
    </View>
  );
}

Input.defaultProps = {
  title: '',
  placeholder: '',
  titleStyle: {},
  inputStyle: {},
  onChangeText: () => {},
  onFocus: () => {},
  onBlur: () => {},
  value: '',
  textprops: {},
  inputprops: {},
  inputType: null,
};

Input.propTypes = {
  title: propTypes.string,
  placeholder: propTypes.string,
  titleStyle: propTypes.shape({}),
  inputStyle: propTypes.shape({}),
  onChangeText: propTypes.func,
  value: propTypes.string,
  textprops: propTypes.object,
  inputprops: propTypes.object,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  inputType: propTypes.any,
};

export default Input;
