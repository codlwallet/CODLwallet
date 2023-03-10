const {default: SvgIcons} = require('../assets/SvgIcons');
const appConstant = require('../helper/appConstant');
const {hp} = require('../helper/responsiveScreen');

module.exports = {
  // backendAPI: 'http://192.168.114.63:2003/api',
  walletData: [
    {
      id: 0,
      name: 'Create Wallet',
    },
    {
      id: 1,
      name: 'Import Wallet',
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

  confirmSeedsData: [
    {
      id: 0,
      number: 12,
      name: 'loan',
    },
    {
      id: 1,
      number: 18,
      name: 'attitude',
    },
    {
      id: 2,
      number: 24,
      name: 'usage',
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
      number: 1,
      name: '',
    },
    {
      id: 2,
      number: 2,
      name: '',
    },
    {
      id: 3,
      number: 3,
      name: '',
    },
    {
      id: 4,
      number: 4,
      name: '',
    },
    {
      id: 5,
      number: 5,
      name: '',
    },
    {
      id: 6,
      number: 6,
      name: '',
    },
    {
      id: 7,
      number: 7,
      name: '',
    },
    {
      id: 8,
      number: 8,
      name: '',
    },
    {
      id: 9,
      number: 9,
      name: '',
    },
    {
      id: 10,
      number: 10,
      name: '',
    },
    {
      id: 11,
      number: 11,
      name: '',
    },
    {
      id: 12,
      number: 12,
      name: '',
    },
    {
      id: 13,
      number: 13,
      name: '',
    },
    {
      id: 14,
      number: 14,
      name: '',
    },
    {
      id: 15,
      number: 15,
      name: '',
    },
    {
      id: 16,
      number: 16,
      name: '',
    },
    {
      id: 17,
      number: 17,
      name: '',
    },
    {
      id: 18,
      number: 18,
      name: '',
    },
    {
      id: 19,
      number: 19,
      name: '',
    },
    {
      id: 20,
      number: 20,
      name: '',
    },
    {
      id: 21,
      number: 21,
      name: '',
    },
    {
      id: 22,
      number: 22,
      name: '',
    },
    {
      id: 23,
      number: 23,
      name: '',
    },
    {
      id: 24,
      number: 24,
      name: '',
    },
  ],

  mainData: [
    {
      id: 0,
      name: 'Bitcoin',
      icon: <SvgIcons.Bitcoin height={hp(6)} width={hp(4)} />,
    },
    {
      id: 1,
      name: 'Ethereum',
      icon: <SvgIcons.EU height={hp(6)} width={hp(4)} />,
      // image: require('../assets/images/img.png'),
    },
    {
      id: 2,
      name: 'Solana',
      icon: <SvgIcons.Solana height={hp(6)} width={hp(4)} />,
    },
    {
      id: 3,
      name: 'Avalanche',
      icon: <SvgIcons.AV height={hp(6)} width={hp(4)} />,
    },
    {
      id: 4,
      name: 'Polygon',
      icon: <SvgIcons.Poly />,
    },
  ],

  settingData: [
    {
      id: 0,
      name: appConstant.changeName,
    },
    {
      id: 1,
      name: appConstant.changePIN,
    },
    {
      id: 2,
      name: appConstant.recoveryCheck,
    },
    {
      id: 3,
      name: appConstant.networks,
    },
    {
      id: 4,
      name: appConstant.language,
    },
    {
      id: 5,
      name: appConstant.AboutCODL,
    },
    {
      id: 6,
      name: appConstant.deleteEverything,
    },
  ],
};
