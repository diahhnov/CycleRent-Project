import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

const styles = StyleSheet.create({
  ContWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  wrapper: {paddingHorizontal: moderateScale(20)},
  Regist: {
    marginBottom: moderateScale(20),
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  icon: {marginRight: moderateScale(5)},
  iconBack: {padding: moderateScale(5), margin: moderateScale(5)},
  errorMessage: {
    fontSize: moderateScale(12),
    color: 'red',
    fontWeight: '500',
    marginTop: moderateScale(4),
    marginBottom: moderateScale(12),
  },
  wrapCP: {
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(30),
  },
  textSave: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});
export default styles;
