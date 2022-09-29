import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../../assets/Colors';

const styles = StyleSheet.create({
  ContWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.grayLight,
  },
  wrapper: {paddingHorizontal: moderateScale(20)},
  wrapperImage: {alignItems: 'flex-start'},
  image: {
    transform: [{rotate: '-3deg'}],
    resizeMode: 'repeat',
    height: moderateScale(300),
    marginBottom: moderateScale(20),
  },
  Login: {
    marginBottom: moderateScale(30),
    marginHorizontal: moderateScale(20),
  },
  icon: {marginRight: moderateScale(5)},
  or: {
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: moderateScale(20),
    marginTop: moderateScale(-20),
  },
  wrapperLoginOr: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconLoginSos: {
    borderColor: COLORS.gray1,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(10),
  },
  iconImage: {height: moderateScale(24), width: moderateScale(24)},
  errorMessage: {
    fontSize: moderateScale(12),
    color: 'red',
    fontWeight: '500',
    marginTop: moderateScale(4),
    marginBottom: moderateScale(12),
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: moderateScale(30),
    marginTop: moderateScale(20),
  },
  textRegis: {color: COLORS.black, fontWeight: '700'},
  spasing: {marginBottom: moderateScale(30)},
  wrapLogin: {
    backgroundColor: COLORS.grayLight,
    padding: moderateScale(12),
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(30),
  },
  textLogin: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});
export default styles;
