import AsyncStorage from '@react-native-community/async-storage';
import Config from '../constants';
import bip39 from 'react-native-bip39'

const Entropy = {
  12: 128,
  18: 192,
  24: 256,
};

export const check = async () => {
  try {
    let user = await AsyncStorage.getItem(Config.USER);
    user = user != null ? JSON.parse(user) : null;
    console.log(user, 'user');
    if (user) {
      return {
        status: true,
        isExist: true,
      };
    } else {
      return {
        status: true,
        isExist: false,
      };
    }
  } catch (e) {
    return {
      status: false,
    };
  }
};

export const signup = async user => {
  try {
    let res = await AsyncStorage.setItem(Config.USER, JSON.stringify(user));
    if (res) {
      return {
        status: true,
        user: user
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (e) {
    return {
      status: false,
    };
  }
};

export const sign = async data => {
  try {
    let user = await AsyncStorage.getItem(Config.USER);
    user = user != null ? JSON.parse(user) : null;
    if (user.password == data.password) {
      return {
        status: true,
        user: user,
        isCreated: user.isCreated,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (e) {
    return {
      status: false,
    };
  }
};

export const create = async data => {
  try {
    const { count } = data;
    // const words = '';
    const words = await bip39.generateMnemonic(Entropy[count]);
    console.log(words, '===============');
    if (words) {
      let user = await AsyncStorage.getItem(Config.USER);
      user = user != null ? JSON.parse(user) : null;
      user.isCreated = true;
      await AsyncStorage.setItem(Config.USER, JSON.stringify(user));
      await AsyncStorage.setItem(Config.WALLET, JSON.stringify(words));
      return {
        status: true,
        words: words,
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      status: false,
    };
  }
};
