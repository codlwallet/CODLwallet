import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Route from './src/navigation/route';
import { persistor, store } from './src/redux/store/store';
import './src/constants/i18n';
import { LogBox } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar translucent hidden backgroundColor='transparent' />
          <Route />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
};