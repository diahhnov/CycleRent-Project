import {
  Alert,
  // Linking,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import {Roboto, StatusBarCore} from '../../component';
import styles from './styles';
import {COLORS} from '../../assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';

const QrCode = () => {
  const focus = useIsFocused();
  const [scan, setScan] = useState('');
  const navigation = useNavigation();

  const addCycle = () => navigation.navigate('TimerRent');

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

  // const onScan = result => {
  //   if (result.length > 0) {
  //     Alert.alert('QR Code Result', result, [
  //       {
  //         text: 'Open URL',
  //         onPress: () => {
  //           Linking.openURL(result);
  //           setScan('');
  //         },
  //       },
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //         onPress: () => setScan(''),
  //       },
  //     ]);
  //   }
  //   if (result === '') {
  //     setScan('');
  //     Alert.alert('Error', 'QR Code not detected.');
  //   }
  // };

  return focus ? (
    <>
      <StatusBarCore barStyle="dark-content" backgroundColor={COLORS.white} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.wrapper}>
        <Ionicons
          name="arrow-back"
          size={moderateScale(35)}
          style={styles.icon}
          color={COLORS.black}
        />
        <Roboto type="Bold" style={styles.title}>
          SCAN QR Code
        </Roboto>
      </TouchableOpacity>

      <View style={styles.cameraContainer}>
        <CameraScreen
          cameraType={CameraType.Back}
          scanBarcode={true}
          onReadCode={e => {
            setScan(e.nativeEvent.codeStringValue);
          }}
          showFrame={true}
          laserColor={COLORS.orange}
          frameColor="white"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addCycle}>
        <Roboto type="Bold" style={styles.buttonText}>
          Capture QR Code
        </Roboto>
      </TouchableOpacity>
    </>
  ) : null;
};

export default QrCode;
