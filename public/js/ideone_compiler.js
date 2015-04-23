var rpc = require('./jsonrpc.js');
var sys = require('sys');

var JsonRpcWrapper = function(){
	this.client = rpc.getClient(80, 'ideone.com');
	this.path = '/api/1/service.json';
	this.call = function(method, params, callback){
		this.client.call(method, params, callback, null, this.path);
	}
}
var user = 'rahulmadduluri';
var pass = 'gateway#725';


// ideone client
var ideone = new JsonRpcWrapper();

// test
ideone.call('testFunction', [user, pass], function(error, result) {
	console.log('IDEONE compiler testFunction: ' + result['error']);
});


exports.run = function(source, lang, input) {
	ideone.call('createSubmission', ['rahulmadduluri', 'gateway#725', source, lang, input, true, false], function(error, result) {
		if(result['error'] == 'OK'){
			link = result['link'];
			console.log('link: http://ideone.com/' + link);
			wait();
		} else {
			console.log(result['error']);
		}
	});
};

var wait = function(){
	ideone.call('getSubmissionStatus', [user, pass, link], function(error, result){
		console.log(result);
		if(result['status'] != 0){
			setTimeout(wait, 1000);
		} else {
			details();
		}
	});
};

var details = function(){
	ideone.call('getSubmissionDetails', [user, pass, link, false, false, true, true, true], function(error, result){
		console.log(result);
	});
}

