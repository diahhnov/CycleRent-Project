import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Roboto from '../Roboto';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

const Button = ({nameButton, onPressButton, clicked}) => {
  const styles = StyleSheet.create({
    wrapperButton: {
      padding: moderateScale(12),
      height: moderateScale(50),
      borderBottomColor: clicked ? COLORS.gray : COLORS.white,
      borderBottomWidth: clicked ? 2 : 0,
    },
    textButton: {textAlign: 'center', paddingHorizontal: moderateScale(60)},
  });

  return (
    <TouchableOpacity style={styles.wrapperButton} onPress={onPressButton}>
      <Roboto type="Medium" style={styles.textButton}>
        {nameButton}
      </Roboto>
    </TouchableOpacity>
  );
};

export default Button;
