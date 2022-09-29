import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  wrapGrad: {
    flex: 1,
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
    width: '100%',
  },
  wrapHeader: {
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: moderateScale(12),
  },
  textHeader: {fontSize: moderateScale(20), color: COLORS.white},
  imageHeader: {
    borderColor: COLORS.gray1,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
  },
  imageProfil: {
    borderRadius: moderateScale(10),
    height: moderateScale(30),
    width: moderateScale(30),
  },
  wrap: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrap1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWel: {fontSize: moderateScale(15), color: COLORS.white},
  textWel1: {
    textAlign: 'center',
    color: COLORS.white,
  },
  imageBike: {width: moderateScale(160), height: moderateScale(160)},
  wrapReview: {flexDirection: 'row'},
  flatlist: {flexGrow: 1},
});
