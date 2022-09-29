import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {COLORS} from '../../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {InputField, Roboto, StatusBarCore} from '../../component';
import Feather from 'react-native-vector-icons/Feather';
import {AirbnbRating} from 'react-native-ratings';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {baseUrl} from '@env';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {setLoad} from '../../redux/globalAction';
import {navigate} from '../../route/navigate';

export default function InputReview() {
  const navigation = useNavigation();
  const {rentalId} = useSelector(state => state.rental);
  const {dataToken} = useSelector(state => state.token);
  const {load} = useSelector(state => state.global);
  const [rating, setRating] = useState(3);
  const dispatch = useDispatch();

  useEffect(() => {
    postReview(dataToken);
    exit();
  }, [postReview, dataToken]);

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

  const postReview = useCallback(
    async values => {
      try {
        dispatch(setLoad(true));
        const contentBody = {
          rentalId: rentalId,
          review: values.review,
          rating: rating,
        };
        const reference = await axios.post(`${baseUrl}/review`, contentBody, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${dataToken}`,
          },
        });
        if (reference.data.code <= 200) {
          Alert.alert('Thanks!', 'already gave advice', [
            {
              text: 'Ok',
              onPress: () => {
                navigate('Home');
              },
            },
          ]);
        }
        if (reference.data.code <= 400) {
          navigation.navigate('InputReview');
        }
        dispatch(setLoad(false));
      } catch (error) {
        dispatch(setLoad(false));
        error;
      }
    },
    [dispatch, navigation, dataToken, rating, rentalId],
  );

  const validationReview = Yup.object().shape({
    review: Yup.string().required('Reviewnya tidak boleh kosong ya'),
  });

  return (
    <Formik
      validationSchema={validationReview}
      initialValues={{
        review: '',
      }}
      onSubmit={values => {
        postReview(values);
        setRating(3);
      }}>
      {({handleChange, handleBlur, values, errors, touched, handleSubmit}) => {
        return (
          <SafeAreaView style={styles.wrap}>
            <StatusBarCore
              barStyle="dark-content"
              backgroundColor={COLORS.grayLight}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={moderateScale(30)}
                color={COLORS.gray}
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <View style={styles.wrapInput}>
              <AirbnbRating
                count={5}
                reviews={[
                  'Hmm...',
                  'Good',
                  'Standar',
                  'Very Good',
                  'Unbelievable',
                ]}
                defaultRating={3 ? rating : rating}
                size={20}
                reviewColor={COLORS.black}
                selectedColor={COLORS.white}
                unSelectedColor={COLORS.gray}
                onFinishRating={value => {
                  setRating(value);
                }}
              />
              <InputField
                label={'Review'}
                icon={
                  <Feather
                    name="edit"
                    size={moderateScale(20)}
                    color={COLORS.gray}
                    style={styles.icon}
                  />
                }
                onBlur={handleBlur('review')}
                onChangeText={handleChange('review')}
                value={values.review}
              />
              {touched.review && errors.review && (
                <Roboto style={styles.errorValidation}>{errors.review}</Roboto>
              )}

              {load ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                  style={styles.wrapSubmit}
                  onPress={handleSubmit}>
                  <Roboto type="Bold" style={styles.textSubmit}>
                    SAVE
                  </Roboto>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
}
