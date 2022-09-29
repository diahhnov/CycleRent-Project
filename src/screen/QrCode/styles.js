import {StyleSheet, Dimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  cameraContainer: {
    width: width,
  },
  title: {
    width: width,
    paddingVertical: moderateScale(12),
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(100),
  },
  button: {
    padding: moderateScale(18),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(500),
    backgroundColor: COLORS.gray,
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: 'white',
    textAlign: 'center',
  },
  wrapper: {flexDirection: 'row', backgroundColor: COLORS.white},
  icon: {marginHorizontal: moderateScale(5)},
});
export default styles;
