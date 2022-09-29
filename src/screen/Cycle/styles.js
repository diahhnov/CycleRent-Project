import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';

const {width} = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  wrapMap: {...StyleSheet.absoluteFillObject},
  map: {...StyleSheet.absoluteFillObject},
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: COLORS.black,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: moderateScale(10),
  },
  cardtitle: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
  textSign: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: COLORS.black,
  },
  rating: {alignItems: 'flex-start'},
  iconBack: {
    padding: moderateScale(5),
    margin: moderateScale(5),
  },
});
