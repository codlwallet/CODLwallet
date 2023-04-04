import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Codl',
  host: '192.168.29.203',
})
  .useReactNative({
    asyncStorage: false, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    overlay: false, // just turning off overlay
  })
  .connect();
