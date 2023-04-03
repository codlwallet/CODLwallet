const appConstant = require("../helper/appConstant");

module.exports = {
  // backendAPI: 'http://192.168.114.63:2003/api',
  USER: 'codluser',
  WALLET: 'codlwallet',
  NETWORK: 'codlnetwork',
  DEFAULT_NETWORK: [
    appConstant.ethereum,
    appConstant.bitcoin,
    appConstant.solana,
    appConstant.avalanche,
    appConstant.polygon
  ]
};
