import { AppRegistry } from "react-native";
import LoginScreen from './App/views/android/LoginScreen.js';
import MainScreen from './App/views/android/MainScreen.js';
import ArticlesScreen from './App/views/android/ArticlesScreen.js';
import ArticleScreen from './App/views/android/ArticleScreen.js';
import { StackNavigator, NavigationActions } from 'react-navigation';

var _restapi = require('./App/models/restapi.js');
	restapi=new _restapi();


const ReactBlogClient = StackNavigator({
  Home: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Articles: { screen: ArticlesScreen },
  Article: { screen: ArticleScreen },
});

AppRegistry.registerComponent('ReactBlogClient', () => ReactBlogClient);
