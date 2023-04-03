import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  confirmData:[],
  user: {},
  accountsData: [],
  selectedNetwork:''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setConfirmData: (state, action) => {
      state.confirmData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccountsData: (state, action) => {
      state.accountsData = action.payload;
    },
    selectNetwork: (state, action) => {
      state.selectedNetwork = action.payload;
    }
  },
});

export default authSlice.reducer;

export const {setConfirmData, setUser,setAccountsData,selectNetwork} = authSlice.actions;

export const authSelector = state => state.auth;
