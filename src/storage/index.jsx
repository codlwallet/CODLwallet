import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants';
import { mainData, accountData } from "../constants/data";
import bip39 from 'react-native-bip39';
const { hdkey } = require('ethereumjs-wallet');

export const getAdFromMnemonics = async (mnemonic) => {
  const seeds = await bip39.mnemonicToSeed(mnemonic)
  const hdwallet = hdkey.fromMasterSeed(seeds);
  const path = "m/44'/60'/0'/0/0";
  const wallet = hdwallet.derivePath(path).getWallet();
  return {
    publicKey: `0x${wallet.getAddress().toString('hex')}`,
    privateKey: wallet.getPrivateKey().toString('hex')
  }
}

const Entropy = {
  12: 128,
  18: 192,
  24: 256,
};


export const check = async () => {
  try {
    let user = await AsyncStorage.getItem(Config.USER);
    user = user != null ? JSON.parse(user) : null;
    if (user) {
      return {
        status: true,
        isExist: true,
        user
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

export const initial = async () => {
  // await AsyncStorage.removeItem(Config.USER);
  // await AsyncStorage.removeItem(Config.WALLET);
  // await AsyncStorage.removeItem(Config.NETWORK);
}

export const signup = async user => {
  try {
    await AsyncStorage.setItem(Config.USER, JSON.stringify(user));
    return {
      status: true,
      user: user
    };
  } catch (e) {
    console.log(e)
    return {
      status: false,
    };
  }
};

export const sign = async data => {
  try {
    let user = await AsyncStorage.getItem(Config.USER);
    user = user != null ? JSON.parse(user) : null;
    if (user.pin == data.pin) {
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
    const words = await bip39.generateMnemonic(Entropy[count]);
    if (words) {
      let user = await AsyncStorage.getItem(Config.USER);
      user = user != null ? JSON.parse(user) : null;
      user.isCreated = true;

      let accounts = [];
      // for (let index = 0; index < 15; index++) {
      //   let mnemonic=await bip39.generateMnemonic(Entropy[count]);
      //   let _account=getAdFromMnemonics(mnemonic);
      //   console.log('_account', _account)
      //   _account.nemonic=mnemonic;
      //   _account.name=null;
      //   accounts.push(_account);
      // }
      // console.log('accounts', accounts)

      // let _account=getAdFromMnemonics(words)
      // _account.nemonic=words;
      // _account.isMain=true;
      // _account.name=null;

      // accounts.unshift(_account);
      let createdAccounts = {};
      for (const network of mainData) {
        createdAccounts[network.value] = [];
      }

      // {
      //   accounts,
      //   createdAccounts
      // }

      let walletData = {
        nemonic: words,
        accounts,
        createdAccounts
      };
      AsyncStorage.setItem(Config.USER, JSON.stringify(user));
      AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
      AsyncStorage.setItem(Config.NETWORK, JSON.stringify(Config.DEFAULT_NETWORK));
      console.log('words', words)
      return {
        status: true,
        words: words,
        walletData: walletData
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


export const createOneAccount = async () => {
  let mnemonic = await bip39.generateMnemonic(Entropy[12]);
  let _account = await getAdFromMnemonics(mnemonic);
  _account.nemonic = mnemonic;
  _account.name = null;
  return {account:_account};
}

export const createNewAccount = async (data) => {
  try {
    await AsyncStorage.setItem(Config.WALLET, JSON.stringify(data));
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
}

export const getAccountsData = async () => {
  try {
    let walletData = await AsyncStorage.getItem(Config.WALLET);
    walletData = JSON.parse(walletData)
    return {
      status: true,
      data: walletData
    };
  } catch (error) {
    return {
      status: false
    }
  }
}

export const setNetwork = async data => {
  try {
    await AsyncStorage.setItem(Config.NETWORK, JSON.stringify(data));
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
}
export const getNetwork = async () => {
  try {
    let networks = await AsyncStorage.getItem(Config.NETWORK);
    return {
      status: true,
      networks: JSON.parse(networks)
    }
  } catch (error) {
    return {
      status: false
    }
  }
}

export const getUserData = async () => {
  let user = await AsyncStorage.getItem(Config.USER);
  return {
    status: true,
    user: JSON.parse(user)
  }
}

export const getWalletData = async () => {
  let walletData = await AsyncStorage.getItem(Config.WALLET);
  let words = []
  if (walletData) {
    walletData = JSON.parse(walletData)
    nemonic = walletData.nemonic.split(" ")
    for (const key in nemonic) {
      words = [...words, {
        id: key,
        name: nemonic[key]
      }]
    }
    return {
      status: true,
      words: words
    };
  } else {
    return {
      status: false
    }
  }
}

export const changeUserData = async (type, data) => {
  try {
    let user = await AsyncStorage.getItem(Config.USER);
    user = { ...JSON.parse(user), [type]: data }
    await AsyncStorage.setItem(Config.USER, JSON.stringify(user));
    return {
      status: true,
      user: user
    }
  } catch (e) {
    return {
      status: false,
    };
  }
}

export const importWallet = async data => {
  try {
    const isValid = await bip39.validateMnemonic(data)
    if (isValid) {
      let user = await AsyncStorage.getItem(Config.USER);
      user = user != null ? JSON.parse(user) : null;
      user.isCreated = true;
      await AsyncStorage.setItem(Config.USER, JSON.stringify(user));
      await AsyncStorage.setItem(Config.WALLET, JSON.stringify(data));
      return {
        status: true,
        words: data,
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

