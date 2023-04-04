import { configureStore } from '@reduxjs/toolkit';
import colorSlice from '../slices/colorSlice';

export const store = configureStore({
  reducer: {
    color: colorSlice,
  },
})