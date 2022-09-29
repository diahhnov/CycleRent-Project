import {Alert, Image, SafeAreaView, View, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../assets/Colors';
import {Button, Roboto, StatusBarCore} from '../../component';
import {styles} from './styles';

const History = () => {
  const [click, setClick] = useState('Riwayat');

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

  const renderHeader = () => {
    return (
      <>
        <StatusBarCore barStyle="dark-content" backgroundColor={COLORS.white} />
        <View style={styles.wrapHeader}>
          <Roboto type="Medium" style={styles.textHeader}>
            History
          </Roboto>
          <View style={styles.button}>
            <Button
              nameButton={'Riwayat'}
              onPressButton={() => {
                setClick('Riwayat');
              }}
              clicked={click === 'Riwayat' ? true : false}
            />
            <Button
              nameButton={'Pesan'}
              onPressButton={() => {
                setClick('Pesan');
              }}
              clicked={click === 'Pesan' ? true : false}
            />
          </View>
        </View>
      </>
    );
  };

  const notifView = () => {
    return (
      <View style={styles.wrapView1}>
        <Image
          style={styles.imageView1}
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-256/no-notification-1767486-1502556.png',
          }}
        />
        <Roboto type="Bold" style={styles.textView1}>
          Belum Ada Notif nih
        </Roboto>
        <Roboto style={styles.text1View1}>
          Jangan khawatir nanti kita pasti kasih tau kalau ada notif untuk kamu.
        </Roboto>
      </View>
    );
  };

  const RiwayatView = () => {
    return (
      <View style={styles.wrapView1}>
        <Image
          style={styles.imageView1}
          source={{
            uri: 'http://simpleicon.com/wp-content/uploads/sad.png',
          }}
        />
        <Roboto type="Bold" style={styles.textView1}>
          Anda Belum Menyewa
        </Roboto>
        <Roboto style={styles.text1View1}>
          Silahkan pilih ke lokasi penyewaan dan enjoy your experience.
        </Roboto>
      </View>
    );
  };

  const showScreen = takeClick => {
    if (takeClick === 'Riwayat') {
      return RiwayatView();
    } else if (takeClick === 'Pesan') {
      return notifView();
    }
  };

  return (
    <SafeAreaView style={styles.containerWrap}>
      {renderHeader()}
      {showScreen(click)}
    </SafeAreaView>
  );
};

export default History;
