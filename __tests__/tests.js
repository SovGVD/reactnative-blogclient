var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var _restapi = require('../App/models/restapi.js');
        restapi=new _restapi();

/*
    Example tests for API answers
*/



/*
edenz:edenz - tests credentials in test REST API environment
*/

var test_user_credentials={login:"edenz", password: "edenz"};
var text_domain="edenz.sovgvd.ino";

test('Login test', () => {
	function lcallback_success(data) {
		data=JSON.parse(data);
		expect(data['r']).toBe('ok');
	}
	function lcallback_failed(data) {
		data=JSON.parse(data);
		expect(data['r']).toBe('error');
	}

	restapi.doLogin(test_user_credentials.login, test_user_credentials.password, function(r) { lcallback_success(r);}, function(r) { lcallback_failed(r);});
});



test('Domains test', () => {
	function dcallback_success(data) {
		data=JSON.parse(data);
		expect(data['r']).toBe('ok');
	}
	function dcallback_failed(data) {
		data=JSON.parse(data);
		expect(data['r']).toBe('error');
	}

	restapi.doDomains(function(r) { dcallback_success(r);}, function(r) { dcallback_failed(r);});
});


test('Articles list test', () => {
	function acallback_success(data) {
		data=JSON.parse(data);
		console.log(data);
		expect(data['r']).toBe('ok');
	}
	function acallback_failed(data) {
		data=JSON.parse(data);
		expect(data['r']).toBe('error');
	}

	restapi.doArticles(text_domain, function(r) { acallback_success(r);}, function(r) { acallback_failed(r);});
});


/*it('works with async/await', async () => {
  expect.assertions(1);
  const data = await restapi.doDomains_answer(domain_data, function(r) {return true;}, function (r) {return false;});
  expect(data).toEqual(true);
});*/

