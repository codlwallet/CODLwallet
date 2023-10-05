import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../constants';
import { mainData } from "../constants/data";
import bip39 from 'react-native-bip39';
import CHAINLIST from "../assets/chainlist.json";

import {
  CryptoHDKey,
  CryptoKeypath,
  PathComponent,
} from "@keystonehq/bc-ur-registry";
import {
  EthSignRequest,
  ETHSignature,
  URRegistryDecoder
} from '@keystonehq/bc-ur-registry-eth'
import Common, { Chain } from '@ethereumjs/common'
import { Transaction, TransactionFactory } from '@ethereumjs/tx';
import * as bip32 from "bip32";
import HDKey from "hdkey";
import { hdkey } from 'ethereumjs-wallet';

const TX_TYPE = {
  155: 'eip-155',
  1559: 'eip-1559'
}

export const generateHDKey = async (_passphrase = null) => {
  let walletData = await AsyncStorage.getItem(Config.WALLET);
  walletData = JSON.parse(walletData);
  const mnemonic = walletData?.nemonic;
  if (mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic, _passphrase);
    const _hdKey = HDKey.fromMasterSeed(Buffer.from(seed, "hex"));
    const child = _hdKey.derive("m/44'/60'/0'");
    const fingerprint = _hdKey._fingerprint.toString(16);
    const publicKey = child.publicExtendedKey.toString("hex");

    const account = {
      publicKey: publicKey,
      isExtendedPublicKey: true,
      derivationPath: "m/44'/60'/0'",
      masterFingerprint: fingerprint,
      isActive: true,
      groupId: fingerprint,
      groupLabel: Config.name,
    };

    const extendedPublicKey = bip32.fromBase58(account.publicKey);
    const cryptoKeyPathComponents = [];
    for (const component of account.derivationPath.split("/")) {
      if (component === "m") continue;
      const index = parseInt(component, 10);
      const hardened = component.endsWith("h") || component.endsWith("'");
      cryptoKeyPathComponents.push(new PathComponent({ index, hardened }));
    }

    const cryptoHDKey = new CryptoHDKey({
      isMaster: false,
      key: extendedPublicKey.publicKey,
      chainCode: extendedPublicKey.chainCode,
      origin: new CryptoKeypath(
        cryptoKeyPathComponents,
        extendedPublicKey.fingerprint
      ),
      parentFingerprint: Buffer.from(account.masterFingerprint),
      name: Config.name,
    });

    const ur = cryptoHDKey.toUREncoder(1000).nextPart();
    return ur.toUpperCase();
  }
}

export const generateETHIdV2 = (length) => {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const decodeTxQR = async (_scanedqr, _passphrase) => {
  const decoder = new URRegistryDecoder()
  const part = _scanedqr;
  decoder.receivePart(part)

  let txdata;
  if (decoder.isComplete() && decoder.isSuccess()) {
    const ur = decoder.resultUR()
    txdata = EthSignRequest.fromCBOR(ur.cbor)

    let signdata, sourceFingerprint, ownRequestId, metamaskRequestId, ethTx;

    signdata = txdata.getSignData()

    let seeds = await getSeedFromNemonic(_passphrase)
    const hdwallet = hdkey.fromMasterSeed(seeds);
    const wallet = hdwallet.derivePath(`m/${txdata.getDerivationPath().toString('hex')}`).getWallet();

    ownRequestId = generateETHIdV2(8)
    sourceFingerprint = txdata.derivationPath.getSourceFingerprint().toString('hex');
    metamaskRequestId = txdata.getRequestId().toString('hex');
    ethTx = TransactionFactory.fromSerializedData(Buffer.from(signdata));

    if (txdata && CHAINLIST[txdata.getChainId()]) {
      let chain = CHAINLIST[txdata.getChainId()];
      let transaction, fee, type = TX_TYPE[155];
      if (ethTx.maxFeePerGas && ethTx.maxPriorityFeePerGas) {
        fee = (parseInt(ethTx.gasLimit) * (parseInt(ethTx.maxFeePerGas) + parseInt(ethTx.maxPriorityFeePerGas)) / (10 ** 18)).toPrecision(3);
        type = TX_TYPE[1559];
        transaction = {
          nonce: "0x" + ethTx.nonce?.toString(16),
          maxFeePerGas: "0x" + ethTx.maxFeePerGas?.toString(16),
          maxPriorityFeePerGas: "0x" + ethTx.maxPriorityFeePerGas?.toString(16),
          gasLimit: "0x" + ethTx.gasLimit?.toString(16),
          to: ethTx.to.toString(),
          value: "0x" + ethTx.value?.toString(16),
          chainId: txdata.getChainId(),
          data: "0x" + ethTx.data?.toString('hex')
        };
      } else {
        fee = (parseInt(ethTx.gasLimit) * parseInt(ethTx.gasPrice) / (10 ** 18)).toPrecision(3);
        transaction = {
          nonce: "0x" + ethTx.nonce?.toString(16),
          gasPrice: "0x" + ethTx.gasPrice?.toString(16),
          gasLimit: "0x" + ethTx.gasLimit?.toString(16),
          to: ethTx.to.toString(),
          value: "0x" + ethTx.value?.toString(16),
          chainId: txdata.getChainId(),
          data: "0x" + ethTx.data?.toString('hex')
        };
      }

      let decodedSignData = {
        id: ownRequestId,
        protocol: chain.shortName,
        type: type,
        requestId: txdata.getRequestId()?.toString('hex'),
        fee,
        payload: {
          transaction: transaction,
          publicKey: `0x${wallet.getAddress().toString('hex')}`
        }
      }

      return {
        state: true,
        txdata: decodedSignData,
        signdata: signdata.toString('hex'),
        chaindata: CHAINLIST[txdata.getChainId()]
      }
    } else {
      return {
        state: false
      }
    }
  } else {
    return {
      state: false
    }
  }
}

export const getSeedFromNemonic = async (passphrase) => {
  let walletData = await AsyncStorage.getItem(Config.WALLET)
  walletData = JSON.parse(walletData)
  const { nemonic } = walletData
  let seeds;
  if (walletData.isHidden) seeds = await bip39.mnemonicToSeed(nemonic, passphrase);
  else seeds = await bip39.mnemonicToSeed(nemonic)
  return seeds
}

export const encodeSignedTxToQR = async (data) => {
  try {
    let { _serialized, requestId, privateKey, tx, type } = data;

    let ethTx = TransactionFactory.fromSerializedData(Buffer.from(_serialized, 'hex'));

    if (type == TX_TYPE[155]) {
      const common = Common.forCustomChain(Chain.Mainnet, { chainId: tx.chainId })
      ethTx = new Transaction(tx, { common });
    }

    let signedTx = ethTx.sign(Buffer.from(privateKey, 'hex'))

    const r = Buffer.from((_a = signedTx.r) === null || _a === void 0 ? void 0 : _a.toString(16, 32), 'hex');
    const s = Buffer.from((_b = signedTx.s) === null || _b === void 0 ? void 0 : _b.toString(16, 32), 'hex');
    const v = Buffer.from((_c = signedTx.v) === null || _c === void 0 ? void 0 : _c.toString(16, 2), 'hex');
    let rlpSignatureData = Buffer.concat([r, s, v]);

    const idBuffer = Buffer.from(requestId, 'hex');
    const ethSignature = new ETHSignature(rlpSignatureData, Buffer.from(idBuffer));
    let qr = ethSignature.toUREncoder(Number.MAX_SAFE_INTEGER).nextPart().toUpperCase();

    return {
      state: true,
      data: qr
    }
  } catch (error) {
    return {
      state: false
    }
  }
}

export const getAdFromMnemonics = async (seeds, index) => {
  const hdwallet = hdkey.fromMasterSeed(seeds);
  const path = `m/44'/60'/0'/0/${index}`;
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
    if (user !== null) {
      return {
        status: true,
        isExist: user && user.isCreated,
        user
      };
    } else {
      return {
        status: false,
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
  await AsyncStorage.removeItem(Config.CREATED_ACCOUNTS);
  return true
}

// initial()

export const signup = async user => {
  try {
    await AsyncStorage.setItem(Config.USER, JSON.stringify(user));
    return {
      status: true,
      user: user
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};

export const completeUserSignup = async () => {
  try {
    let user = await AsyncStorage.getItem(Config.USER)
    user = JSON.parse(user)
    user.isCreated = true;
    await AsyncStorage.setItem(Config.USER, JSON.stringify(user))
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
}

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

export const createAccounts = async (password = null) => {
  let walletData = await AsyncStorage.getItem(Config.WALLET)
  walletData = JSON.parse(walletData)
  const { nemonic } = walletData
  let seeds;
  if (password) {
    seeds = await bip39.mnemonicToSeed(nemonic, password);
  } else {
    seeds = await bip39.mnemonicToSeed(nemonic)
  }
  let accounts = [];
  for (let index = 0; index < 5; index++) {
    let _account = await getAdFromMnemonics(seeds, index);
    _account.name = null;
    accounts.push(_account);
  }
  let createdAccounts = {};
  for (const network of mainData) {
    createdAccounts[network.value] = [];
  }
  if (!password) {
    walletData = {
      nemonic: nemonic,
      accounts,
      createdAccounts,
      isHidden: false,
      hiddenAccounts: {}
    }
  } else {
    walletData = {
      ...walletData, isHidden: true, hiddenAccounts: {
        accounts,
        createdAccounts
      }
    }
  }

  AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
  return {
    state: true
  }
}



export const extendAccounts = async (password = null, page = 1) => {
  let walletData = await AsyncStorage.getItem(Config.WALLET)
  walletData = JSON.parse(walletData)
  const { nemonic } = walletData
  let seeds = await bip39.mnemonicToSeed(nemonic, password)
  let accounts = [];

  for (let index = (page - 1) * 5; index < page * 5; index++) {
    let _account = await getAdFromMnemonics(seeds, index);
    _account.name = null;
    accounts.push(_account);
  }

  return accounts;
  // AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
}

export const setWalletIsHidden = async (_ishidden = false) => {
  let walletData = await AsyncStorage.getItem(Config.WALLET)
  walletData = JSON.parse(walletData)
  walletData.isHidden = _ishidden
  await AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData))
}


export const create = async data => {
  try {
    const { count } = data;
    const words = await bip39.generateMnemonic(Entropy[count]);
    if (words) {
      let user = await AsyncStorage.getItem(Config.USER);
      user = user != null ? JSON.parse(user) : null;
      user.isCreated = false;

      let walletData = {
        accounts: [],
        defaultAccountNameIndex: {
          general: 0,
          hidden: 0
        },
        createdAccounts: [],
        nemonic: words,
        isHidden: false,
        hiddenAccounts: {}
      }

      AsyncStorage.setItem(Config.USER, JSON.stringify(user));
      AsyncStorage.setItem(Config.NETWORK, JSON.stringify(Config.DEFAULT_NETWORK));
      AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));

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
    return {
      status: false,
    };
  }
};

export const setDefaultAccountNameIndex = async () => {
  let walletData = await AsyncStorage.getItem(Config.WALLET);
  walletData = JSON.parse(walletData)
  let indexData = walletData.defaultAccountNameIndex ? walletData.defaultAccountNameIndex : { general: 0, hidden: 0 };
  if (walletData.isHidden) {
    indexData = { ...indexData, hidden: indexData.hidden + 1 }
  } else {
    indexData = { ...indexData, general: indexData.general + 1 }
  }
  walletData = { ...walletData, defaultAccountNameIndex: indexData }
  await AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
}

// export const createOneAccount = async () => {
//   let mnemonic = await bip39.generateMnemonic(Entropy[12]);
//   let _account = await getAdFromMnemonics(mnemonic);
//   _account.nemonic = mnemonic;
//   _account.name = null;
//   return { account: _account };
// }

export const createNewAccount = async (data, _is_hidden = false, _passphrase = null) => {
  try {
    let walletData = await AsyncStorage.getItem(Config.CREATED_ACCOUNTS)
    if (!walletData) walletData = { general: [], hidden: {} };
    else walletData = JSON.parse(walletData);

    if (!_is_hidden) walletData.general.push(data);
    else {
      if (_passphrase) {
        if (!walletData?.hidden?.[_passphrase]) walletData = { ...walletData, hidden: { ...walletData.hidden, [_passphrase]: [] } }
        walletData.hidden[_passphrase].push(data);
      }
    }
    await AsyncStorage.setItem(Config.CREATED_ACCOUNTS, JSON.stringify(walletData))
    // walletData = JSON.parse(walletData)
    // if (walletData.isHidden === true) {
    //   walletData.hiddenAccounts.accounts = data.accounts;
    //   walletData.hiddenAccounts.createdAccounts = data.createdAccounts;
    // } else {
    //   walletData.general.accounts = data.accounts;
    //   walletData.general.createdAccounts = data.createdAccounts;
    // }
    // await AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
}

const removeByAttr = function (arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (arr[i]
      && arr[i].hasOwnProperty(attr)
      && (arguments.length > 2 && arr[i][attr] === value)) {

      arr.splice(i, 1);

    }
  }
  return arr;
}

export const removeAccount = async (address, _is_hidden = false, _passphrase = null) => {
  try {
    let walletData = await AsyncStorage.getItem(Config.CREATED_ACCOUNTS)
    if (!walletData) walletData = { general: [], hidden: {} };
    else walletData = JSON.parse(walletData);
    let data;
    // if (!_is_hidden) walletData.general.filter((itm) => itm.publicKey != address);
    if (!_is_hidden) {
      data = removeByAttr(walletData.general, 'publicKey', address)
      walletData = { ...walletData, general: data }
    }
    else {
      if (_passphrase) {
        if (!walletData.hidden[_passphrase]) walletData.hidden[_passphrase] = []
        data = removeByAttr(walletData.hidden[_passphrase], 'publicKey', address)
        walletData = { ...walletData, hidden: { ...walletData.hidden, [_passphrase]: data } }
      }
    }

    await AsyncStorage.setItem(Config.CREATED_ACCOUNTS, JSON.stringify(walletData))
    // walletData = JSON.parse(walletData)
    // if (walletData.isHidden === true) {
    //   walletData.hiddenAccounts.accounts = data.accounts;
    //   walletData.hiddenAccounts.createdAccounts = data.createdAccounts;
    // } else {
    //   walletData.accounts = data.accounts;
    //   walletData.createdAccounts = data.createdAccounts;
    // }
    // await AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
}



export const renameAccount = async (address, name, _is_hidden = false, _passphrase = null) => {
  try {
    let walletData = await AsyncStorage.getItem(Config.CREATED_ACCOUNTS)
    if (!walletData) walletData = { general: [], hidden: {} };
    else walletData = JSON.parse(walletData);
    let data;
    if (!_is_hidden) {
      data = walletData.general.map((item) => {
        if (item.publicKey == address) {
          item.name = name
        }

        return item;
      });
      walletData = { ...walletData, general: data }
    }
    else {
      if (_passphrase) {
        if (!walletData.hidden[_passphrase]) walletData.hidden[_passphrase] = []
        data = walletData.hidden[_passphrase].map((item) => {
          if (item.publicKey == address) {
            item.name = name
          }

          return item;
        });
        walletData = { ...walletData, hidden: { ...walletData.hidden, [_passphrase]: data } }
      }
    }

    await AsyncStorage.setItem(Config.CREATED_ACCOUNTS, JSON.stringify(walletData))
    return {
      status: true
    }
  } catch (error) {
    console.log(error, "error")
    return {
      status: false
    }
  }
}

export const getAccountsData = async () => {
  try {
    let walletData = await AsyncStorage.getItem(Config.WALLET);
    let createdWalletData = await AsyncStorage.getItem(Config.CREATED_ACCOUNTS)
    walletData = JSON.parse(walletData)
    if (walletData.isHidden === true) {
      walletData.accounts = walletData.hiddenAccounts.accounts ? walletData.hiddenAccounts.accounts : [];
      walletData.createdAccounts = walletData.hiddenAccounts.createdAccounts ? walletData.hiddenAccounts.createdAccounts : [];
    }

    return {
      status: true,
      data: walletData,
      created: JSON.parse(createdWalletData)
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




export const setNetworkMainData = async data => {
  try {
    await AsyncStorage.setItem(Config.NETWORKDATA, JSON.stringify(data));
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false
    }
  }
}

export const getNetworkMainData = async () => {
  try {
    let networks = await AsyncStorage.getItem(Config.NETWORKDATA);
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
      user.isCreated = false;
      let walletData = {
        accounts: [],
        createdAccounts: [],
        nemonic: data
      }
      AsyncStorage.setItem(Config.USER, JSON.stringify(user));
      AsyncStorage.setItem(Config.NETWORK, JSON.stringify(Config.DEFAULT_NETWORK));
      AsyncStorage.setItem(Config.WALLET, JSON.stringify(walletData));
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

