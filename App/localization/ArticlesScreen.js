import LocalizedStrings from 'react-native-localization';

export let l18n = new LocalizedStrings({
  en:{
    loading: "Loading"
  },
  ru: {
    loading: "Загрузка"
  }
});

module.exports = l18n;
