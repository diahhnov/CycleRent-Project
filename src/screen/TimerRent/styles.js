import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray1,
  },
  sectionStyle: {
    marginTop: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: moderateScale(22),
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.grayLight,
    borderRadius: moderateScale(25),
    width: moderateScale(200),
    height: moderateScale(70),
    marginBottom: moderateScale(24),
    elevation: 5,
    paddingVertical: moderateScale(10),
  },
  wrapButton: {marginTop: moderateScale(32)},
});
