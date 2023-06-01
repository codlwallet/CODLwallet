// const {useTranslation} = require('react-i18next');
import i18n from '../constants/i18n';

const appConstant = require('../helper/appConstant');
// const {t} = useTranslation();

module.exports = {
  walletData: [
    {
      id: 0,
      name: 'Cüzdan Oluştur',
      value: appConstant.createWallet,
    },
    {
      id: 1,
      name: 'Cüzdanı İçe Aktar',
      value: appConstant.importWallet,
    },
  ],

  walletListData: [
    {
      id: 0,
      name: 'Yeni hesap oluştur',
      value: appConstant.createNewAccount,
    },
    // {
    //   id: 1,
    //   name: 'Hesapları Yeniden Sırala',
    //   value: appConstant.reorderAccounts,
    // },
  ],

  languageData: [
    {
      id: 0,
      name: appConstant.english,
      value: 'en',
    },
    {
      id: 1,
      name: appConstant.turkce,
      value: 'tr',
    },
  ],

  aboutAppData: [
    {
      id: 0,
      name: i18n.t('terms'),
      value: appConstant.terms,
    },
    {
      id: 1,
      name: i18n.t('etc'),
      value: appConstant.etc,
    },
  ],

  walletNumberData: [
    {
      id: 0,
      number: 12,
    },
    {
      id: 1,
      number: 18,
    },
    {
      id: 2,
      number: 24,
    },
  ],

  secondSeedsData: [
    {
      id: 0,
      name: 'wear',
    },
    {
      id: 1,
      name: 'cupboard',
    },
    {
      id: 2,
      name: 'rotate',
    },
  ],

  sixSeedsData: [
    {
      id: 0,
      name: 'loan',
    },
    {
      id: 1,
      name: 'attitude',
    },
    {
      id: 2,
      name: 'usage',
    },
  ],

  twelveSeedsData: [
    {
      id: 0,
      name: 'weekend',
    },
    {
      id: 1,
      name: 'abstact',
    },
    {
      id: 2,
      name: 'room',
    },
  ],

  createWalletData: [
    {
      id: 1,
      number: 18,
      name: 'abstract',
    },
    {
      id: 2,
      number: 24,
      name: 'announce',
    },
    {
      id: 3,
      number: 12,
      name: 'attitude',
    },
    {
      id: 4,
      number: 18,
      name: 'cinnamon',
    },
    {
      id: 5,
      number: 24,
      name: 'loan',
    },
    {
      id: 6,
      number: 12,
      name: 'cupboard',
    },
    {
      id: 7,
      number: 18,
      name: 'wear',
    },
    {
      id: 8,
      number: 24,
      name: 'document',
    },
    {
      id: 9,
      number: 12,
      name: 'rotate',
    },
    {
      id: 10,
      number: 18,
      name: 'cupboard',
    },
    {
      id: 11,
      number: 24,
      name: 'wear',
    },
    {
      id: 12,
      number: 24,
      name: 'cinnamon',
    },
    {
      id: 13,
      number: 24,
      name: 'rotate',
    },
    {
      id: 14,
      number: 24,
      name: 'attitude',
    },
    {
      id: 15,
      number: 24,
      name: 'wear',
    },
    {
      id: 16,
      number: 24,
      name: 'rotate',
    },
    {
      id: 17,
      number: 24,
      name: 'cinnamon',
    },
    {
      id: 18,
      number: 67,
      name: 'document',
    },
    {
      id: 19,
      number: 24,
      name: 'rotate',
    },
    {
      id: 20,
      number: 24,
      name: 'attitude',
    },
    {
      id: 21,
      number: 24,
      name: 'wear',
    },
    {
      id: 22,
      number: 24,
      name: 'rotate',
    },
    {
      id: 23,
      number: 24,
      name: 'cinnamon',
    },
    {
      id: 24,
      number: 67,
      name: 'document',
    },
  ],

  importWalletData: [
    {
      id: 1,
      number: 18,
      name: '',
    },
    {
      id: 2,
      number: 24,
      name: '',
    },
    {
      id: 3,
      number: 12,
      name: '',
    },
    {
      id: 4,
      number: 18,
      name: '',
    },
    {
      id: 5,
      number: 24,
      name: '',
    },
    {
      id: 6,
      number: 12,
      name: '',
    },
    {
      id: 7,
      number: 18,
      name: '',
    },
    {
      id: 8,
      number: 24,
      name: '',
    },
    {
      id: 9,
      number: 12,
      name: '',
    },
    {
      id: 10,
      number: 18,
      name: '',
    },
    {
      id: 11,
      number: 24,
      name: '',
    },
    {
      id: 12,
      number: 24,
      name: '',
    },
    {
      id: 13,
      number: 24,
      name: '',
    },
    {
      id: 14,
      number: 24,
      name: '',
    },
    {
      id: 15,
      number: 24,
      name: '',
    },
    {
      id: 16,
      number: 24,
      name: '',
    },
    {
      id: 17,
      number: 24,
      name: '',
    },
    {
      id: 18,
      number: 67,
      name: '',
    },
    {
      id: 19,
      number: 24,
      name: '',
    },
    {
      id: 20,
      number: 24,
      name: '',
    },
    {
      id: 21,
      number: 24,
      name: '',
    },
    {
      id: 22,
      number: 24,
      name: '',
    },
    {
      id: 23,
      number: 24,
      name: '',
    },
    {
      id: 24,
      number: 67,
      name: '',
    },
  ],

  mainData: [
    // {
    //   id: 0,
    //   name: 'Bitcoin',
    //   value: appConstant.bitcoin,
    //   image: require('../assets/images/BI.png'),
    // },
    {
      id: 1,
      name: 'Ethereum',
      value: appConstant.ethereum,
      image: require('../assets/images/iEthereum.png'),
      img: require('../assets/images/EVblack.png'),
    },
    // {
    //   id: 2,
    //   name: 'Solana',
    //   value: appConstant.solana,
    //   image: require('../assets/images/SO.png'),
    // },
    {
      id: 3,
      name: 'Çığ',
      value: appConstant.avalanche,
      image: require('../assets/images/iAvalanche.png'),
    },
    {
      id: 4,
      name: 'Çokgen',
      value: appConstant.polygon,
      image: require('../assets/images/iPolygon.png'),
    },
    {
      id: 5,
      name: 'BSC',
      value: appConstant.bsc,
      image: require('../assets/images/iBSC.png'),
      img: require('../assets/images/BSC_selected.png'),
    },
    {
      id: 6,
      name: 'Arbitrum',
      value: appConstant.arbitrum,
      image: require('../assets/images/iArbitrum.png'),
      img: require('../assets/images/Arbitrum_selected.png'),
    },
    {
      id: 7,
      name: 'Optimism',
      value: appConstant.optimism,
      image: require('../assets/images/iOptimism.png'),
      img: require('../assets/images/Optimism_selected.png'),
    },
    {
      id: 8,
      name: 'Zksync',
      value: appConstant.zksync,
      image: require('../assets/images/izkSync.png'),
      img: require('../assets/images/Zksync_Era_selected.png'),
    },
  ],

  settingData: [
    {
      id: 0,
      name: 'İsmini değiştir',
      value: appConstant.changeName,
    },
    {
      id: 1,
      name: "Pin'i değiştir",
      value: appConstant.changePIN,
    },
    {
      id: 2,
      name: 'Kurtarma Kontrolü',
      value: appConstant.recoveryCheck,
    },
    {
      id: 3,
      name: 'Ağlar',
      value: appConstant.networks,
    },
    {
      id: 4,
      name: 'Dil',
      value: appConstant.language,
    },
    {
      id: 5,
      name: 'CODL hakkında',
      value: appConstant.AboutCODL,
    },
    {
      id: 6,
      name: 'Hepsini sil',
      value: appConstant.deleteEverything,
    },
  ],
  accountData: [
    {
      id: 0,
      name: '0xa94bs...a710',
    },
    {
      id: 1,
      name: '0xa94bs...a710',
    },
    {
      id: 2,
      name: '0xa94bs...a710',
    },
    {
      id: 3,
      name: '0xa94bs...a710',
    },
    {
      id: 4,
      name: '0xa94bs...a710',
    },
    {
      id: 5,
      name: '0xa94bs...a710',
    },
    {
      id: 6,
      name: '0xa94bs...a710',
    },
    {
      id: 7,
      name: '0xa94bs...a710',
    },
    {
      id: 8,
      name: '0xa94bs...a710',
    },
    {
      id: 9,
      name: '0xa94bs...a710',
    },
  ],

  paginationData: [
    {
      id: 1,
      title: i18n.t('signedTX'),
    },
    {
      id: 2,
      title: i18n.t('tokenTransfer'),
    },
  ],
};
