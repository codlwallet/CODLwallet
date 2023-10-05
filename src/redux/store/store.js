import {combineReducers, configureStore} from '@reduxjs/toolkit';
import colorSlice from '../slices/colorSlice';
import authSlice from '../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    color: colorSlice,
    auth: authSlice,
  }),
);

// export const store = configureStore({
// reducer: {
//   color: colorSlice,
//   auth: authSlice,
// },
// });

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
