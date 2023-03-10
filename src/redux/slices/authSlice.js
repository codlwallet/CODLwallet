import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  confirmIndex: 1,
  confirmWords: [],
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setConfirmIndex: (state, action) => {
      state.confirmIndex = action.payload;
    },
    setConfirmWords: (state, action) => {
      state.confirmWords = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default authSlice.reducer;

export const {setConfirmIndex, setConfirmWords, setUser} = authSlice.actions;

export const authSelector = state => state.auth;
