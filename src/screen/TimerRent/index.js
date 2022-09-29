import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {Roboto, StatusBarCore} from '../../component';
import {COLORS} from '../../assets/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {timeRent} from './redux/action';
import {styles} from './styles';
import {options} from './option';

const TimerRent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);

  useEffect(() => {
    setIsStopwatchStart(true);
    exit();
  }, [setIsStopwatchStart]);

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
    <SafeAreaView style={styles.container}>
      <StatusBarCore barStyle="dark-content" backgroundColor={COLORS.gray1} />
      <View style={styles.sectionStyle}>
        <Stopwatch
          laps
          start={isStopwatchStart}
          options={options}
          getTime={time => {
            dispatch(timeRent(time));
          }}
        />
      </View>
      <View style={styles.wrapButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Roboto type="Bold" style={styles.buttonText}>
            LOCK BIKE
          </Roboto>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TimerRent;
