import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import colors from './src/assets/colors';
import Route from './src/navigation/route';
import { store } from './src/redux/store/store';

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor={colors.black} />
      <Route />
    </Provider>
  )
};