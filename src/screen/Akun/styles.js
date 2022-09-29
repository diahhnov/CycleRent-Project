import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  wrap: {flex: 1, backgroundColor: COLORS.white},
  wrapHeader: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeader: {fontSize: moderateScale(20), color: COLORS.black},
  wrapBar: {
    paddingHorizontal: moderateScale(5),
    paddingTop: moderateScale(10),
  },
});
