import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setLogout} from '../../screen/authentication/redux/action';
import Roboto from '../Roboto';
import {COLORS} from '../../assets/Colors';
import {moderateScale} from 'react-native-size-matters';

const LogOutButton = () => {
  const {signOut} = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(setLogout(signOut));
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity onPress={onLogOut} style={stylesLogOut.wrapperLogout}>
      <Roboto type="Bold" style={stylesLogOut.teksLogout}>
        LOGOUT
      </Roboto>
    </TouchableOpacity>
  );
};

export default LogOutButton;

const stylesLogOut = StyleSheet.create({
  wrapperLogout: {
    backgroundColor: COLORS.grayLight,
    padding: moderateScale(12),
    borderRadius: moderateScale(50),
    marginBottom: moderateScale(24),
    elevation: 5,
  },
  teksLogout: {color: COLORS.black, textAlign: 'center'},
});
