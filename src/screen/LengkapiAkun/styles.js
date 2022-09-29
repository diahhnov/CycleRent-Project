import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  ContWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  wrapper: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
  },
  judulScreen: {
    fontSize: moderateScale(20),
    color: COLORS.black,
  },
  wrapEnter: {
    paddingHorizontal: moderateScale(5),
  },
  Enter: {
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  icon: {
    marginRight: moderateScale(5),
  },
  errorMessage: {
    fontSize: moderateScale(12),
    color: 'red',
    fontWeight: '500',
    marginTop: moderateScale(4),
    marginBottom: moderateScale(12),
  },
  wrapSave: {marginTop: moderateScale(15)},
  save: {
    backgroundColor: COLORS.gray,
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(24),
  },
  textSave: {color: COLORS.white, textAlign: 'center'},
});
