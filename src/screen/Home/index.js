import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {COLORS} from '../../assets/Colors';
import {moderateScale} from 'react-native-size-matters';
import {Review, Roboto, StatusBarCore} from '../../component';
import {sepedaPic} from '../../assets/Image';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import axios from 'axios';
import {baseUrl} from '@env';
import {stringToSubstr} from '../../helpers/stringToSubstr';

const Home = () => {
  const {userInfo} = useSelector(state => state.user);
  const {dataToken} = useSelector(state => state.token);
  const navigation = useNavigation();
  const [review, setReview] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dataReviewers(dataToken);
    exit();
  }, [dataReviewers, dataToken]);

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

  const dataReviewers = useCallback(async () => {
    try {
      const reference = await axios.get(`${baseUrl}/review`, {
        headers: {
          Authorization: `${dataToken}`,
        },
      });
      setReview(reference.data.data);
    } catch (error) {
      error;
    }
  }, [dataToken]);

  const addReview = () => {
    navigation.navigate('InputReview');
  };
  const addCycle = () => navigation.navigate('Cycle');

  const onRefresh = () => {
    setRefresh(true);
    dataReviewers();
    setRefresh(false);
  };

  return (
    <>
      <LinearGradient colors={['#56585D', '#C4C4C4']} style={styles.wrapGrad}>
        <StatusBarCore barStyle="light-content" backgroundColor={COLORS.gray} />
        <View style={styles.wrapHeader}>
          <Roboto style={styles.textHeader}>
            Hello, <Roboto type="BoldItalic">{userInfo.fullname}</Roboto>
          </Roboto>
          <View style={styles.imageHeader}>
            <Image source={{uri: userInfo.image}} style={styles.imageProfil} />
          </View>
        </View>
        <View style={styles.wrap1}>
          <View style={styles.wrap}>
            <Roboto type="Light" style={styles.textWel}>
              Welcome to <Roboto type="Medium">CycleRent</Roboto>
            </Roboto>
            <Roboto type="MediumItalic" style={styles.textWel1}>
              Let's Try To Play with Our Bycicle
            </Roboto>
          </View>
          <TouchableOpacity onPress={addCycle}>
            <Image source={sepedaPic} style={styles.imageBike} />
          </TouchableOpacity>
        </View>

        <View style={styles.wrapReview}>
          <Roboto type="Bold" style={styles.textHeader}>
            Review{' '}
          </Roboto>
          <TouchableOpacity onPress={addReview}>
            <Ionicons
              name="add-circle-sharp"
              size={moderateScale(25)}
              style={{color: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
          }
          data={review}
          contentContainerStyle={styles.flatlist}
          renderItem={({item}) => (
            <Review
              item={item.rental}
              review={item.review}
              fullname={stringToSubstr(item.user)}
              rating={item.rating}
              image={item.image}
            />
          )}
          keyExtractor={(item, index) => 'key' + index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>
    </>
  );
};

export default Home;
