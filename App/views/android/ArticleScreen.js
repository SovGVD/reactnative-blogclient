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




class ArticleScreen extends React.Component {
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

const styles = StyleSheet.create({
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
  }
});


export default ArticleScreen;
