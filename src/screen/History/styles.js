import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  containerWrap: {flex: 1, backgroundColor: COLORS.white},
  wrapHeader: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
  textHeader: {
    fontSize: moderateScale(20),
    color: COLORS.black,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapView1: {
    alignItems: 'center',
    marginBottom: moderateScale(200),
  },
  imageView1: {
    width: moderateScale(150),
    height: moderateScale(150),
    marginTop: moderateScale(100),
  },
  textView1: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    marginTop: moderateScale(20),
  },
  text1View1: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    marginTop: moderateScale(5),
    paddingHorizontal: moderateScale(15),
  },
});
