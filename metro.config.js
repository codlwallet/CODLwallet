const { getDefaultConfig,mergeConfig } = require('metro-config');
const crypto = require.resolve('crypto-browserify');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts, },
  } = await getDefaultConfig();

  const svgConfig={
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: {
        crypto,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser.js'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('readable-stream'),
        vm: require.resolve('vm-browserify'),
      },
    },
  };

  const wasmConfig={
    transformer: {
      babelTransformerPath: require.resolve('react-native-react-bridge/lib/plugin')
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: {
        crypto,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser.js'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('readable-stream'),
        vm: require.resolve('vm-browserify'),
      },
    }
  };
  return mergeConfig(svgConfig)
})();
