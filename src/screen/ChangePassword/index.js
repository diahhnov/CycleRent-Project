import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../assets/Colors';
import styles from './styles';
import {Roboto, InputField, StatusBarCore} from '../../component';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {setLoad} from '../../redux/globalAction';
import {baseUrl} from '@env';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {load} = useSelector(state => state.global);
  const {dataToken} = useSelector(state => state.token);

  useEffect(() => {
    exit();
  }, []);

  //exit
  const exit = () => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to exit the application?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  };

  const changePass = useCallback(
    async values => {
      try {
        dispatch(setLoad(true));
        const contentBody = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        };
        const reference = await axios.put(
          `${baseUrl}/auth/reset-password`,
          contentBody,
          {
            headers: {
              Authorization: `${dataToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(reference);
        navigation.navigate('Home');
        dispatch(setLoad(false));
      } catch (error) {
        dispatch(setLoad(false));
        error;
      } finally {
        dispatch(setLoad(false));
      }
    },
    [dispatch, dataToken, navigation],
  );

  const validationCP = Yup.object().shape({
    currentPassword: Yup.string().required('Nama tidak boleh kosong'),
    newPassword: Yup.string().required('Alamat tidak boleh kosong'),
    confirmPassword: Yup.string().required('Email tidak boleh kosong'),
  });

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={validationCP}
      onSubmit={changePass}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <SafeAreaView style={styles.ContWrapper}>
          <StatusBarCore
            barStyle="dark-content"
            backgroundColor={COLORS.white}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={moderateScale(30)}
              color={COLORS.gray}
              style={styles.iconBack}
            />
          </TouchableOpacity>
          <View style={styles.Regist} />
          <View style={styles.wrapper}>
            <InputField
              label={'Password Lama'}
              icon={
                <Entypo
                  name="key"
                  size={moderateScale(20)}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              value={values.currentPassword}
              inputType="password"
              password={true}
              secureTextEntry={true}
            />
            {touched.currentPassword && errors.currentPassword && (
              <Roboto style={styles.errorValidation}>
                {errors.currentPassword}
              </Roboto>
            )}

            <InputField
              label={'Password Baru'}
              icon={
                <Entypo
                  name="key"
                  size={moderateScale(20)}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              inputType="password"
              password={true}
              secureTextEntry={true}
            />
            {errors.newPassword && touched.newPassword ? (
              <Roboto style={styles.errorMessage}>{errors.newPassword}</Roboto>
            ) : (
              <View />
            )}

            <InputField
              label={'Confirm Password'}
              icon={
                <Entypo
                  name="key"
                  size={moderateScale(20)}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              inputType="password"
              password={true}
              secureTextEntry={true}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <Roboto style={styles.errorMessage}>
                {errors.confirmPassword}
              </Roboto>
            ) : (
              <View />
            )}
            {load ? (
              <ActivityIndicator />
            ) : (
              <>
                <TouchableOpacity style={styles.wrapCP} onPress={handleSubmit}>
                  <Roboto style={styles.textSave}>SAVE</Roboto>
                </TouchableOpacity>
              </>
            )}
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default ChangePassword;
