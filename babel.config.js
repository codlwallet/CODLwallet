module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      // ["@babel/plugin-proposal-private-methods",
      //   { loose: true }],
      [
        'react-native-reanimated/plugin',
        {
          globals: ['__scanCodes', '_setGlobalConsole', '__decode'],
        },
      ],
    ],
  };
}
