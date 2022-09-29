import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {googlePic} from '../../assets/Image';
import {setLogin} from '../../screen/authentication/redux/action';
import {setLoad} from '../../redux/globalAction';
import {COLORS} from '../../assets/Colors';
import {moderateScale} from 'react-native-size-matters';

const LoginButton_Google = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {load} = useSelector(state => state.global);

  const onGoogle = async () => {
    try {
      dispatch(setLoad(true));
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      dispatch(setLogin(res.additionalUserInfo.profile));
      navigation.navigate('MainApp', {
        uid: res.user.uid,
        token: googleCredential.token,
        email: res.user.email,
        name: res.additionalUserInfo.profile.given_name,
        picture: res.additionalUserInfo.profile.picture,
      });
      dispatch(setLoad(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoad(false));
    } finally {
      dispatch(setLoad(false));
    }
  };

  return (
    <>
      {load ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          onPress={onGoogle}
          style={stylesSosialAuth.iconLoginSos}>
          <Image source={googlePic} style={stylesSosialAuth.iconImage} />
        </TouchableOpacity>
      )}
    </>
  );
};

export default LoginButton_Google;

const stylesSosialAuth = StyleSheet.create({
  iconLoginSos: {
    borderColor: COLORS.gray1,
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(10),
  },
  iconImage: {height: moderateScale(24), width: moderateScale(24)},
});
