import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../../assets/Colors';
import {LoginPic} from '../../../assets/Image';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  InputField,
  LoginButton_Google,
  Roboto,
  StatusBarCore,
} from '../../../component';
import styles from './styles';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {postLogin} from '../redux/action';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {load} = useSelector(state => state.global);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '616395785294-2jecuoi6tb650neejpngevc89diovisl.apps.googleusercontent.com',
    });
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
  const validationLogin = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid Email Address!')
      .required("Email field can't be empty"),
    password: Yup.string()
      .required("Password field can't be empty")
      .min(8, 'Password should be at least 8 character'),
  });

  const setLogin = values => {
    dispatch(postLogin(values));
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validateOnMount={true}
      validationSchema={validationLogin}
      onSubmit={setLogin}>
      {({handleChange, handleSubmit, handleBlur, values, touched, errors}) => (
        <SafeAreaView style={styles.ContWrapper}>
          <StatusBarCore
            barStyle="dark-content"
            backgroundColor={COLORS.grayLight}
          />
          <View style={styles.wrapper}>
            <View style={styles.wrapperImage}>
              <Image source={LoginPic} style={styles.image} />
            </View>
            <View style={styles.Login} />
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
              inputType="password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              password={true}
              secureTextEntry={true}
            />
            {errors.password && touched.password ? (
              <Roboto style={styles.errorMessage}>{errors.password}</Roboto>
            ) : (
              <View />
            )}
            {load ? (
              <View style={styles.spasing}>
                <ActivityIndicator />
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.wrapLogin}
                  onPress={handleSubmit}>
                  <Roboto style={styles.textLogin}>SIGN IN</Roboto>
                </TouchableOpacity>
              </View>
            )}

            <Roboto style={styles.or}>Or</Roboto>
            <View style={styles.wrapperLoginOr}>
              <LoginButton_Google />
            </View>
            <View style={styles.message}>
              <Roboto>don't have an account?</Roboto>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Roboto style={styles.textRegis}> Sign Up</Roboto>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Login;
