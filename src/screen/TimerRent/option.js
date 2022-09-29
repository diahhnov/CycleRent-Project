import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const options = {
  container: {
    padding: moderateScale(5),
    borderRadius: moderateScale(5),
    width: moderateScale(200),
    alignItems: 'center',
  },
  text: {
    fontSize: moderateScale(40),
    color: COLORS.black,
    marginLeft: moderateScale(7),
  },
};
