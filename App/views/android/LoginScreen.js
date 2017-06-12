import React from 'react';
import {
  AppRegistry,
  Button,
  View,
  TextInput,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import l18n from '../../localization/LoginScreen.js';



class LoginScreen extends React.Component {
  static navigationOptions = {
    title: l18n.welcome,
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
    <TextInput ref="1" onChangeText={(text) => this.formState.login={text}} autoFocus={true} placeholder={l18n.plogin} returnKeyType="next" autoCorrect={false} onSubmitEditing={() => this.focusNextField('2')} />
    <TextInput ref="2" onChangeText={(text) => this.formState.password={text}} placeholder={l18n.ppassword} returnKeyType="done" secureTextEntry={true} autoCorrect={false} onSubmitEditing={() => this.doAuth()} />
    <Button
          onPress={() => this.doAuth()}
          title={l18n.login}
        />
     </View>
    );
  }
}

const styles = StyleSheet.create({
  
});



export default LoginScreen;
