import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
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
      <Route />
    </Provider>
  )
};