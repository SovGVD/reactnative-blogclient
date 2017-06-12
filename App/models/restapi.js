'use strict';

var global_ajax = require("../libs/ajax.js");

var restapi = function () {
	var api_host="https://nz.sovgvd.info/admin_api.php";	// MUST BE hardcoded
	var credentials = false;
	var domain = false;
	var post_id = false;
	
	this.doLogin = function (login, password, _callbackSuccess, _callbackFailed) {
		var _data = {"c":"auth","login":login, "password":password, "request_id":"API_login"};
		this.api(api_host,"POST",this._prepareRequest(_data),null,true, 
			function (_callbackSuccess, _callbackFailed, r) { this.doLogin_answer(r, _callbackSuccess, _callbackFailed)}.bind(this,_callbackSuccess, _callbackFailed));
	}
	this.doLogin_answer = function(raw,_callbackSuccess, _callbackFailed) {
		var r=JSON.parse(raw);
		if (r['r']=='ok') {
			this.credentials = r['sid'];
			_callbackSuccess(raw);
		} else {
			_callbackFailed(raw);
		}
	}
	
	this.doDomains = function (_callbackSuccess, _callbackFailed) {
		var _data = {
			"c": "domains", 
			"m": "list",
			"sid": this.credentials, 
			"request_id": "API_domains"};
		this.api(api_host,"POST",this._prepareRequest(_data),null,true, 
			function (_callbackSuccess, _callbackFailed, r) { this.doDomains_answer(r, _callbackSuccess, _callbackFailed)}.bind(this,_callbackSuccess, _callbackFailed));
	}

	this.doDomains_answer = function(raw,_callbackSuccess, _callbackFailed) {
		var r=JSON.parse(raw);
		if (r['r']=='ok') {
			_callbackSuccess(r['d']);
		} else {
			_callbackFailed(raw);
		}
	}


	this.doArticles = function (domain, _callbackSuccess, _callbackFailed) {
		var _data = {
			"c":"articles", 
			"m":"list",
			"sid": this.credentials, 
			"request_id": "API_articles"};
		var _Ddata = {"domain": domain};
		this.domain=domain;
		this.api(api_host,"POST",this._prepareRequest(_data, _Ddata),null,true, 
			function (_callbackSuccess, _callbackFailed, r) { this.doArticles_answer(r, _callbackSuccess, _callbackFailed)}.bind(this,_callbackSuccess, _callbackFailed));
	}

	this.doArticles_answer = function(raw,_callbackSuccess, _callbackFailed) {
		var r=JSON.parse(raw);
		if (r['r']=='ok') {
			_callbackSuccess(r['d']);
		} else {
			_callbackFailed(raw);
		}
	}

	this.doArticle = function (domain, post_id, _callbackSuccess, _callbackFailed) {
		var _data = {
			"c":"articles", 
			"m":"data",
			"sid": this.credentials, 
			"request_id": "API_article"};
		var _Ddata = {"domain": domain?domain:this.domain, "post_id": post_id};
		this.api(api_host,"POST",this._prepareRequest(_data, _Ddata),null,true, 
			function (_callbackSuccess, _callbackFailed, r) { this.doArticles_answer(r, _callbackSuccess, _callbackFailed)}.bind(this,_callbackSuccess, _callbackFailed));
	}

	this.doArticle_answer = function(raw,_callbackSuccess, _callbackFailed) {
		var r=JSON.parse(raw);
		if (r['r']=='ok') {
			_callbackSuccess(r['d']);
		} else {
			_callbackFailed(raw);
		}
	}

	
	this._prepareRequest = function (_raw, _Draw) {
		var tmp=new Array();
		for (var i in _raw) {
			tmp[tmp.length]=i+"="+encodeURIComponent(_raw[i]);
		}
		for (var i in _Draw) {
			tmp[tmp.length]="d["+i+"]="+encodeURIComponent(_Draw[i]);
		}
		return tmp.join("&");
	}
	
	this.api = function (url,method,args,cookies,async,_callback) {
		//console.warn("doAPI");
		global_ajax.send(url,method,args,cookies,async,_callback);
	}
}

module.exports = restapi;

