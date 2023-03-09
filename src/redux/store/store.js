import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import colorSlice from '../slices/colorSlice';

export const store = configureStore({
  reducer: {
    color: colorSlice,
    auth: authSlice,
  },
});
