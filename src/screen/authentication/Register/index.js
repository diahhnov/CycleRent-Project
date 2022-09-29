import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../../assets/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {InputField, StatusBarCore, Roboto} from '../../../component';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {postReister} from '../redux/action';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {load} = useSelector(state => state.global);

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

  /* for Validation */
  const validationRegister = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password should be at least 8 character'),
    confirmPassword: Yup.string()
      .required('Password is required.')
      .min(8, 'Password should be at least 8 character'),
    name: Yup.string()
      .required('Full Name is required')
      .min(5, 'Password should be at least 5 character'),
  });
  const setRegister = values => {
    dispatch(postReister(values));
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      }}
      validationSchema={validationRegister}
      onSubmit={setRegister}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <SafeAreaView style={styles.ContWrapper}>
          <StatusBarCore
            barStyle="dark-content"
            backgroundColor={COLORS.grayLight}
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
              label={'Full Name'}
              icon={
                <Feather
                  name="user"
                  size={moderateScale(20)}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <Roboto style={styles.errorMessage}>{errors.name}</Roboto>
            ) : (
              <View />
            )}

            <InputField
              label={'Email'}
              icon={
                <Entypo
                  name="email"
                  size={moderateScale(20)}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email ? (
              <Roboto style={styles.errorMessage}>{errors.email}</Roboto>
            ) : (
              <View />
            )}

            <InputField
              label={'Password'}
              icon={
                <Entypo
                  name="key"
                  size={moderateScale(20)}
                  color={COLORS.gray}
                  style={styles.icon}
                />
              }
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              inputType="password"
              password={true}
              secureTextEntry={true}
            />
            {errors.password && touched.password ? (
              <Roboto style={styles.errorMessage}>{errors.password}</Roboto>
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
              <View>
                <TouchableOpacity
                  style={styles.wrapRegister}
                  onPress={handleSubmit}>
                  <Roboto style={styles.textRegister}>SIGN UP</Roboto>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Register;
