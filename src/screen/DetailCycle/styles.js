import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.gray1},
  wrapBack: {
    backgroundColor: COLORS.grayLight,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  iconBack: {
    padding: moderateScale(5),
    margin: moderateScale(5),
  },
  Bike: {
    width: moderateScale(235),
    height: moderateScale(235),
    alignSelf: 'center',
  },
  textBike: {
    paddingHorizontal: moderateScale(20),
    fontSize: moderateScale(20),
    marginTop: moderateScale(10),
  },
  wrapDesc: {
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
  },
  containDesc: {flexDirection: 'row'},
  textDesc: {
    fontSize: moderateScale(20),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  Desc: {textAlign: 'justify', lineHeight: 20},
  wrapButton: {paddingHorizontal: moderateScale(10)},
  containButton: {
    backgroundColor: COLORS.grayLight,
    padding: moderateScale(12),
    borderRadius: moderateScale(50),
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  textButton: {color: COLORS.black, textAlign: 'center'},
  wrapAllRental: {textAlign: 'right', lineHeight: 20},
});
