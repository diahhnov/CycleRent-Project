import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';
import Rooter from './src/route';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import codePush from 'react-native-code-push';

const codePushOpt = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

const App = () => {
  const syncWithCodePush = status => {
    console.log('Codepush sync status', status);
  };

  useEffect(() => {
    SplashScreen.hide();
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      syncWithCodePush,
    );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <Rooter />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default codePush(codePushOpt)(App);
