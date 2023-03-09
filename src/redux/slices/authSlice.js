import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {getLoading} = authSlice.actions;

export const authSelector = state => state.auth;
