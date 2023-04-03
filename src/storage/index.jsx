import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants';
import { mainData, accountData } from "../constants/data";
import bip39 from 'react-native-bip39';
const { hdkey } = require('ethereumjs-wallet');

// (async () => {
//   const mnemonic = "vacant element sleep harsh stick else salt great kitten clutch salad subway"
//   const seeds = bip39.mnemonicToSeed(mnemonic)
//   console.log("seeds", seeds)
//   const hdwallet = hdkey.fromMasterSeed(seeds);
//   const path = "m/44'/60'/0'/0/0";
//   const wallet = hdwallet.derivePath(path).getWallet();
//   const address = `0x${wallet.getAddress().toString('hex')}`;
//   console.log("address", address)
// })();

export const getAdFromMnemonics = (mnemonic) => {
  const seeds = bip39.mnemonicToSeed(mnemonic)
  const hdwallet = hdkey.fromMasterSeed(seeds);
  const path = "m/44'/60'/0'/0/0";
  const wallet = hdwallet.derivePath(path).getWallet();
  const address = `0x${wallet.getAddress().toString('hex')}`;
  console.log("address", address)
  return address
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
  await AsyncStorage.removeItem(Config.USER);
  await AsyncStorage.removeItem(Config.WALLET);
  await AsyncStorage.removeItem(Config.NETWORK);
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

      let accounts = [
        {
          publicKey: '0xa94bs...a711',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a712',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a713',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a714',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a715',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a716',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a717',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a718',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a719',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a720',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
        {
          publicKey: '0xa94bs...a721',
          privateKey: 'privatekey',
          nemonic: 'nemonic',
          isCreated: false,
          name: null
        },
      ]

      accounts.unshift(
        {
          publicKey: '0xa94bs...a710',
          privateKey: 'privatekey',
          nemonic: words,
          name: null,
          isCreated: false,
          isMain: true
        }
      );
      let createdAccounts = {};
      for (const network of mainData) {
        createdAccounts[network.value] = [];
      }

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

