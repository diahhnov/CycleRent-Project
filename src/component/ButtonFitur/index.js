import {StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';
import Roboto from '../Roboto';

const ButtonFitur = ({ketFitur, countItem}) => {
  return (
    <View style={styles.wrapper}>
      <Roboto style={styles.TextketFitur}>{ketFitur}</Roboto>
      <Roboto type="Bold" style={styles.countItem}>
        {countItem}
      </Roboto>
    </View>
  );
};

export default ButtonFitur;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: moderateScale(8),
    borderRadius: moderateScale(4),
    padding: moderateScale(10),
    marginTop: moderateScale(10),
    borderWidth: 1,
    backgroundColor: COLORS.gray1,
    margin: moderateScale(5),
    borderColor: COLORS.gray2,
    elevation: 5,
  },
  TextketFitur: {
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  countItem: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
