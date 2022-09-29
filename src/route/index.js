import React from 'react';
import MainStack from './Mainrouter';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigate';
import NetInfo from '@react-native-community/netinfo';

const Rooter = () => {
  NetInfo.addEventListener(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });

  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Rooter;
