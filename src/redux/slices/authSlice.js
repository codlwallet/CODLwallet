import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  confirmData:[],
  user: {},
  accountsData: [],
  selectedNetwork:'',
  passphrase:null,
  signdata:{},
  selectedAccount:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setConfirmData: (state, action) => {
      const words=action.payload;
      const numberValue=words?.length;
      let confirm_data = [];
      for (let _k = 0; _k < 3; _k++) {
          let confirmIndex;
          while (1) {
              confirmIndex = Math.ceil((Math.random() * numberValue));
              let _indexs = confirm_data.map(v => v.index);
              if (_indexs.indexOf(confirmIndex) < 0) {
                  break;
              }
          }
          let confirmWords = [
              {
                  number: (confirmIndex == 1 ? 3 : confirmIndex - 1),
                  name: words[(confirmIndex == 1 ? 3 : confirmIndex - 1) - 1]
              },
              {
                  number: confirmIndex,
                  name: words[confirmIndex - 1]
              },
              {
                  number: (confirmIndex == numberValue ? (numberValue - 2) : confirmIndex + 1),
                  name: words[(confirmIndex == numberValue ? (numberValue - 2) : confirmIndex + 1) - 1]
              },
          ]
          confirmWords.sort((a, b) => 0.5 - Math.random())
          confirm_data = [...confirm_data, {
              index: confirmIndex,
              words: confirmWords
          }]
      }
      confirm_data.sort((a, b) => a.index - b.index)
      state.confirmData = confirm_data;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPassphrase:(state,action)=>{
      state.passphrase=action.payload;
    },
    setAccountsData: (state, action) => {
      state.accountsData = action.payload;
    },
    selectNetwork: (state, action) => {
      state.selectedNetwork = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading=action.payload;
    },
    setSignData:(state,action)=>{
      state.signdata=action.payload;
    },
    selectAccount:(state,action)=>{
      state.selectedAccount=action.payload;
    }
  },
});

export default authSlice.reducer;

export const {setConfirmData, setUser,setAccountsData,selectNetwork,setPassphrase,setLoading,setSignData,selectAccount} = authSlice.actions;

export const authSelector = state => state.auth;
