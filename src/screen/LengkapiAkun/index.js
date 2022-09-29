import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../assets/Colors';
import {ButtonCamera, InputField, Roboto, StatusBarCore} from '../../component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from './styles';
import {baseUrl} from '@env';
import axios from 'axios';
import {setLoad} from '../../redux/globalAction';
import {navigate} from '../../route/navigate';

const LengkapiAkun = () => {
  const dispatch = useDispatch();
  const {load} = useSelector(state => state.global);
  const {userInfo} = useSelector(state => state.user);
  const {dataToken} = useSelector(state => state.token);
  const navigation = useNavigation();
  const [user] = useState({
    email: userInfo.email,
    fullname: userInfo.fullname,
    image: userInfo.image,
    dob: userInfo?.dob,
    phone: userInfo.phone,
    address: userInfo.address,
    birthPlace: userInfo.birthPlace,
  });

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

  useEffect(() => {
    exit();
  }, []);

  // For validation
  const validationProfile = Yup.object().shape({
    fullname: Yup.string().required('Nama tidak boleh kosong'),
    address: Yup.string().required('Alamat tidak boleh kosong'),
    email: Yup.string().required('Email tidak boleh kosong'),
    phone: Yup.string().required('No. Handphone tidak boleh kosong'),
    image: Yup.string().required('Foto tidak boleh kosong'),
    dob: Yup.string().required('Tanggal lahir tidak boleh kosong'),
    birthPlace: Yup.string().required('Kota kelahiramu tidak boleh kosong'),
  });

  const updateData = useCallback(
    async values => {
      dispatch(setLoad(true));
      try {
        const contentBody = {
          birthPlace: values.birthPlace,
          phone: values.phone,
          dob: values.dob,
          address: values.address,
        };
        console.log(contentBody);
        const reference = await axios.put(`${baseUrl}/users`, contentBody, {
          headers: {
            Authorization: `${dataToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (reference.data.code <= 200) {
          navigation.navigate('Home');
        }
        dispatch(setLoad(false));
      } catch (error) {
        Alert.alert('Thanks!', error.response.data.message, [
          {
            text: 'Ok',
            onPress: () => {
              navigate('LengkapiAkun');
            },
          },
        ]);
        dispatch(setLoad(false));
      }
    },
    [dataToken, navigation, dispatch],
  );

  return (
    <Formik
      validationSchema={validationProfile}
      initialValues={user}
      enableReinitialize={true}
      onSubmit={(values, {resetForm}) => {
        updateData(values);
        resetForm();
      }}>
      {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => {
        return (
          <SafeAreaView style={styles.ContWrapper}>
            <StatusBarCore
              barStyle="dark-content"
              backgroundColor={COLORS.white}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="arrow-back"
                    size={moderateScale(25)}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
                <Roboto type="Medium" style={styles.judulScreen}>
                  {' '}
                  Lengkapi Akun
                </Roboto>
              </View>
              <ButtonCamera url={userInfo.image} disabled={true} />
              <View style={styles.wrapEnter}>
                <View style={styles.Enter} />
                <View style={styles.wrapEnter}>
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
                    onChangeText={handleChange('fullname')}
                    onBlur={handleBlur('fullname')}
                    value={values.fullname}
                  />
                  {errors.fullname && touched.fullname ? (
                    <Roboto style={styles.errorMessage}>
                      {errors.fullname}
                    </Roboto>
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
                    label={'Contoh: 08XXXXXXXXXX'}
                    icon={
                      <MaterialIcons
                        name="contact-phone"
                        size={moderateScale(20)}
                        color={COLORS.gray}
                        style={styles.icon}
                      />
                    }
                    keyboardType={'numeric'}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone ? (
                    <Roboto style={styles.errorMessage}>{errors.phone}</Roboto>
                  ) : (
                    <View />
                  )}

                  <InputField
                    label={'Alamat Domisili'}
                    icon={
                      <Feather
                        name="home"
                        size={moderateScale(20)}
                        color={COLORS.gray}
                        style={styles.icon}
                      />
                    }
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                  />
                  {errors.address && touched.address ? (
                    <Roboto style={styles.errorMessage}>
                      {errors.address}
                    </Roboto>
                  ) : (
                    <View />
                  )}

                  <InputField
                    label={'Image'}
                    icon={
                      <Feather
                        name="camera"
                        size={moderateScale(20)}
                        color={COLORS.gray}
                        style={styles.icon}
                      />
                    }
                    onChangeText={handleChange('image')}
                    onBlur={handleBlur('image')}
                    value={values.image}
                  />
                  {errors.image && touched.image ? (
                    <Roboto style={styles.errorMessage}>{errors.image}</Roboto>
                  ) : (
                    <View />
                  )}

                  <InputField
                    label={'Contoh: 01-01-1990'}
                    icon={
                      <AntDesign
                        name="calendar"
                        size={moderateScale(20)}
                        color={COLORS.gray}
                        style={styles.icon}
                      />
                    }
                    keyboardType={'numeric'}
                    onChangeText={handleChange('dob')}
                    onBlur={handleBlur('dob')}
                    value={values.dob}
                  />
                  {errors.dob && touched.dob ? (
                    <Roboto style={styles.errorMessage}>{errors.dob}</Roboto>
                  ) : (
                    <View />
                  )}

                  <InputField
                    label={'Kota Kelahiran'}
                    icon={
                      <MaterialIcons
                        name="location-city"
                        size={moderateScale(20)}
                        color={COLORS.gray}
                        style={styles.icon}
                      />
                    }
                    onChangeText={handleChange('birthPlace')}
                    onBlur={handleBlur('birthPlace')}
                    value={values.birthPlace}
                  />
                  {errors.birthPlace && touched.birthPlace ? (
                    <Roboto style={styles.errorMessage}>
                      {errors.birthPlace}
                    </Roboto>
                  ) : (
                    <View />
                  )}

                  {load ? (
                    <ActivityIndicator />
                  ) : (
                    <View style={styles.wrapSave}>
                      <TouchableOpacity
                        style={styles.save}
                        onPress={handleSubmit}>
                        <Roboto type="Bold" style={styles.textSave}>
                          SAVE
                        </Roboto>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

export default LengkapiAkun;
