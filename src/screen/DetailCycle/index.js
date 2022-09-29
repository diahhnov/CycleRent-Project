import {
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {sepedaPic} from '../../assets/Image';
import {moderateScale} from 'react-native-size-matters';
import {COLORS} from '../../assets/Colors';
import {ButtonFitur, Roboto, StatusBarCore} from '../../component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const DetailCycle = () => {
  const navigation = useNavigation();
  const addTimer = () => navigation.navigate('QrCode');
  const {allRental} = useSelector(state => state.rental);
  const {availableCycle, dataDetailRental} = useSelector(state => state.cycle);
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

  return (
    <View style={styles.container}>
      <StatusBarCore
        barStyle="dark-content"
        backgroundColor={COLORS.grayLight}
      />
      <View style={styles.wrapBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={moderateScale(30)}
            color={COLORS.black}
            style={styles.iconBack}
          />
        </TouchableOpacity>
        <Image source={sepedaPic} style={styles.Bike} />
      </View>
      <Roboto type="Bold" style={styles.textBike}>
        Cycle Rent
      </Roboto>
      {load ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.wrapDesc}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.containDesc}>
              <ButtonFitur
                ketFitur={'Available'}
                countItem={dataDetailRental.available}
              />
              <ButtonFitur
                ketFitur={'Max load'}
                countItem={availableCycle.fitur[0] + ' KG'}
              />
              <ButtonFitur
                ketFitur={'Max Speed'}
                countItem={availableCycle.fitur[2] + ' KM/HOUR'}
              />
              <ButtonFitur
                ketFitur={'Year'}
                countItem={availableCycle.fitur[2]}
              />
              <ButtonFitur
                ketFitur={'Ratings'}
                countItem={dataDetailRental.rating}
              />
            </View>
          </ScrollView>
          <Roboto type="Bold" style={styles.textDesc}>
            Description
          </Roboto>
          <ScrollView>
            <Roboto style={styles.Desc}>{availableCycle.description}</Roboto>
            <Roboto style={styles.wrapAllRental}>
              {allRental[0].description}
            </Roboto>
            <View style={styles.wrapButton}>
              <TouchableOpacity onPress={addTimer} style={styles.containButton}>
                <Roboto type="Bold" style={styles.textButton}>
                  Scan Here
                </Roboto>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DetailCycle;
