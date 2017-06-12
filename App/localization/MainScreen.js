import LocalizedStrings from 'react-native-localization';

export let l18n = new LocalizedStrings({
  en:{
    domains: "Domains",
    loading: "Loading"
  },
  ru: {
    domains:"Домены",
    loading: "Загрузка"
  }
});

module.exports = l18n;
