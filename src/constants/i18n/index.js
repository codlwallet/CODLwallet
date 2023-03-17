import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import English from '../Languages/English.json';
import Turkce from '../Languages/Turkce.json';

const resources = {
  en: English,
  tr: Turkce,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',

  resources: resources,

  react: {
    useSuspense: false,
  },
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
