import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  ToastAndroid,
  ListView,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

var _restapi = require('./models/restapi.js');
	restapi=new _restapi();




class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };
  formState = {
		"login": false,
		"password": false
	  }
  doAuth = function () {
	  restapi.doLogin(this.formState.login.text, this.formState.password.text, function(r) { this.doAuthSuccess(r); }.bind(this), function(r) { this.doAuthError(r); }.bind(this));
  }
  doAuthSuccess = function (r) {
	  		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({ routeName: 'Main'})
			]
			})
			this.props.navigation.dispatch(resetAction);

	  
  }
  doAuthError = function (r) {
	  ToastAndroid.show("ERROR:"+r, ToastAndroid.SHORT);
  }

  render() {
	const { navigate } = this.props.navigation;
    return (
    <View>
    <Text>Hello, User!</Text>
    <TextInput ref="1" onChangeText={(text) => this.formState.login={text}} autoFocus={true} placeholder="Login" returnKeyType="next" autoCorrect={false} onSubmitEditing={() => this.focusNextField('2')} />
    <TextInput ref="2" onChangeText={(text) => this.formState.password={text}} placeholder="Password" returnKeyType="done" secureTextEntry={true} autoCorrect={false} onSubmitEditing={() => this.doAuth()} />
    <Button
          onPress={() => this.doAuth()}
          title="Login"
        />
     </View>
    );
  }
}












/*class ArticleScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  
  constructor() {
    super();
    this.state = {
      article: false,
    };
  }

  doData = function () {
	  const { params } = this.props.navigation.state;
	restapi.doArticle(params.d, params.post_id,
		function(r) { 
			this.doDataSuccess(r); }.bind(this), 
		function(r) { 
			this.doDataError(r); }.bind(this)
		);
  }

  doDataSuccess = function (r) {
	  this.setState({ article: r });
  }
  doDataError = function (r) {
	  ToastAndroid.show("ERROR:"+r, ToastAndroid.SHORT);
  }
 
	componentDidMount() {
		this.doData();
	} 

  render() {
    return (
      <View>
      <ScrollView>
		<Text style={styles.articleTitle}>{this.state.article.title}</Text>
		<Text style={styles.articleText}>{this.state.article.text_src}</Text>
	</ScrollView>
      </View>
    );
  }
}




class ArticlesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.d}`,
  });

  
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Loading...']),
    };
  }

  doList = function () {
	  const { params } = this.props.navigation.state;
	restapi.doArticles(params.d,
		function(r) { 
			this.doListSuccess(r); }.bind(this), 
		function(r) { 
			this.doListError(r); }.bind(this)
		);
  }

  doListSuccess = function (r) {
	  var articles_list=new Array();
	  for (var i in r) {
		  articles_list[articles_list.length]=r[i];
	  }
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(articles_list),
		});
	  
  }
  doListError = function (r) {
	  ToastAndroid.show("ERROR:"+r, ToastAndroid.SHORT);
  }
 
	componentDidMount() {
		this.doList();
	} 

  render() {
	  const { navigate } = this.props.navigation;
    return (
      <View>
        <ListView
        dataSource={this.state.dataSource} 
        renderRow={(rowData) => <TouchableHighlight onPress={() => navigate('Article', { "title": rowData.title, "post_id": rowData.post_id })} ><View><Text style={styles.listviewitem}>{rowData.title}</Text><Text style={styles.listviewitemabout}>{rowData.dt}</Text></View></TouchableHighlight>} 
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
      </View>
    );
  }
}







*/
class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Domains',
  };

  
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Loading...']),
    };
  }

  doList = function () {
	restapi.doDomains(
		function(r) { 
			this.doListSuccess(r); }.bind(this), 
		function(r) { 
			this.doListError(r); }.bind(this)
		);
  }

  doListSuccess = function (r) {
	  var domains_list=new Array();
	  for (var i in r) {
		  domains_list[domains_list.length]=r[i]['http'];
	  }
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(domains_list),
		});
	  
  }
  doListError = function (r) {
	  ToastAndroid.show("ERROR:"+r, ToastAndroid.SHORT);
  }
 
	componentDidMount() {
		this.doList();
	} 

  render() {
	const { navigate } = this.props.navigation;
    return (
      <View>
        <ListView
        dataSource={this.state.dataSource} 
        renderRow={(rowData) => <TouchableHighlight onPress={() => navigate('Articles', { "d": rowData }) } ><Text style={styles.listviewitembig}>{rowData}</Text></TouchableHighlight>} 
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  listviewitemabout: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  listviewitem: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 19,
  },
  listviewitembig: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 19,
  },

  articleTitle: {
	 fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  articleText: {
	 fontSize: 15,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: 25
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});


//export default HomeScreen;
