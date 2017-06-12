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
import l18n from '../../localization/ArticlesScreen.js';


class ArticlesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.d}`,
  });

  
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([l18n.loading+'...']),
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
	  // TODO better error handler
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
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});


export default ArticlesScreen;
