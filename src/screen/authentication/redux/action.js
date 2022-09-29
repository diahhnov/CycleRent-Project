import {baseUrl} from '@env';
import axios from 'axios';
import {SET_LOGIN, SET_LOGOUT, SET_TOKEN} from './type';
import {Alert} from 'react-native';
import {openInbox} from 'react-native-email-link';
import {navigate} from '../../../route/navigate';
import {setLoad} from '../../../redux/globalAction';

export const setLogin = payload => {
  return {
    type: SET_LOGIN,
    payload,
  };
};

export const setLogout = payload => {
  return {
    type: SET_LOGOUT,
    payload,
  };
};

export const setToken = payload => {
  return {
    type: SET_TOKEN,
    payload,
  };
};

export const postReister = values => async dispatch => {
  try {
    dispatch(setLoad(true));
    const contentBody = {
      email: values.email,
      fullname: values.name,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const reference = await axios.post(
      `${baseUrl}/auth/register`,
      contentBody,
      {
        validateStatus: status => status < 501,
      },
    );
    if (reference.data.code <= 201) {
      Alert.alert('Success!', 'Register anda Berhasil, Silahkan Login', [
        {
          text: 'Ok',
          onPress: () => {
            navigate('Login');
          },
        },
      ]);
    }
    if (reference.data.code <= 400) {
      Alert.alert('Warning', reference.data.message, [
        {
          text: 'Ok',
          onPress: () => {
            navigate('Register');
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Tidak bisa register');
    }
    dispatch(setLogin(reference.data.data.user));
    dispatch(setLoad(false));
  } catch (error) {
    error;
  } finally {
    dispatch(setLoad(false));
  }
};

export const postLogin = values => async dispatch => {
  try {
    dispatch(setLoad(true));
    const contentBody = {
      email: values.email,
      password: values.password,
    };
    const reference = await axios.post(`${baseUrl}/auth/login`, contentBody, {
      validateStatus: status => status < 501,
    });
    dispatch(setLoad(true));
    dispatch(setLogin(reference.data.data.token));
    if (reference.data.data.user.isVerified === false) {
      Alert.alert(
        'Hold on!',
        'Your email has not been verified. Please check your email!',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => openInbox(),
            style: 'cancel',
          },
        ],
      );
    }
    if (reference.status <= 201) {
      dispatch(setLogin(reference.data.data.user));
      navigate('MainApp');
      dispatch(setLoad(false));
    } else if (reference.data.code <= 400) {
      Alert.alert('Warning', reference.data.message);
    } else {
      Alert.alert('Error', 'Tidak bisa Login');
    }
    dispatch(setLoad(true));
    const resUserInfo = await axios.get(`${baseUrl}/users`, {
      headers: {Authorization: `${reference.data.data.token}`},
    });
    dispatch(setToken(resUserInfo.config.headers.token));
    dispatch(setToken(reference.data.data.token));
    dispatch(setLogin(reference.data.data.user));
    dispatch(setLoad(false));
  } catch (error) {
    error;
    dispatch(setLoad(false));
  } finally {
    dispatch(setLoad(false));
  }
};
