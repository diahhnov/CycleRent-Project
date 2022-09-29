import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.grayLight,
  },
  backIcon: {
    padding: moderateScale(5),
    margin: moderateScale(5),
  },
  wrapInput: {paddingHorizontal: moderateScale(20)},
  wrapSubmit: {
    backgroundColor: COLORS.gray,
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(24),
  },
  textSubmit: {color: COLORS.white, textAlign: 'center'},
  errorValidation: {
    color: COLORS.orange,
    marginBottom: moderateScale(10),
    marginTop: moderateScale(-20),
  },
});
