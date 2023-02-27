import React from 'react';
import { Provider } from 'react-redux';
import Route from './src/navigation/route';
import { store } from './src/redux/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  )
};