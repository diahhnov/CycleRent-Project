import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Alert, BackHandler, View} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../assets/Colors';
import {
  BarAkun,
  ButtonCamera,
  LogOutButton,
  Roboto,
  StatusBarCore,
} from '../../component';
import {styles} from './styles';

const Akun = () => {
  const {userInfo} = useSelector(state => state.user);
  const navigation = useNavigation();
  const pengAturan = () => navigation.navigate('ChangePassword');
  const lengkapiAkun = () => navigation.navigate('LengkapiAkun');

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
    <View style={styles.wrap}>
      <StatusBarCore barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.wrapHeader}>
        <Roboto type="Medium" style={styles.textHeader}>
          Akun Saya
        </Roboto>
      </View>
      <ButtonCamera url={userInfo.image} disabled={true} />
      <View style={styles.wrapBar}>
        <BarAkun
          nameIcon="edit"
          barName="Lengkapi Akun"
          onPress={lengkapiAkun}
        />
        <BarAkun
          nameIcon="setting"
          barName="Ganti Password"
          onPress={pengAturan}
        />
        <LogOutButton />
      </View>
    </View>
  );
};

export default Akun;
