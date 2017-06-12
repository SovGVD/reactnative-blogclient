import LocalizedStrings from 'react-native-localization';

export let l18n = new LocalizedStrings({
  en:{
    login: "Sign in",
    welcome: "Welcome",
    plogin: "Login",
    ppassword: "Password",
    autherror: "Unable to login"
  },
  ru: {
    login:"Войти",
    welcome: "Добро пожаловать",
    plogin: "Логин",
    ppassword: "Пароль",
    autherror: "Невозможно войти"
  }
});

module.exports = l18n;
