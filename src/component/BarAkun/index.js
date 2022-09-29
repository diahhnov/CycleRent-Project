import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../assets/Colors';
import Roboto from '../Roboto';
import {moderateScale} from 'react-native-size-matters';

const BarAkun = ({barName, nameIcon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.toBarAkun}>
      <AntDesign name={nameIcon} size={24} color={COLORS.gray} />
      <Roboto type="Medium" style={styles.textBarAkun}>
        {barName}
      </Roboto>
    </TouchableOpacity>
  );
};

export default BarAkun;

const styles = StyleSheet.create({
  toBarAkun: {
    borderColor: COLORS.gray1,
    margin: moderateScale(10),
    borderBottomWidth: moderateScale(2),
    flexDirection: 'row',
  },
  textBarAkun: {
    fontSize: moderateScale(14),
    marginBottom: moderateScale(18),
    marginStart: moderateScale(15),
    color: COLORS.gray,
  },
});
