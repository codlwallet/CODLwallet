import { configureStore } from '@reduxjs/toolkit';
import colorSlice from '../slices/colorSlice';
import authSlice from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    color: colorSlice,
    auth: authSlice,
  },
})