var pubnub = require('../services/pubnub-service'),
	localStorage = localStorage || new (require('node-localstorage').LocalStorage)('./localstorage');

function LocalEnvironmentProvider() {
	var self = this,
		KEY = 'mockgm.environment.id';
	
	self.get = get;
	
	function get() {
		var localEnvironmentInfo = localStorage.getItem(KEY);
		
		if(!localEnvironmentInfo) {
			localEnvironmentInfo = {
				id: pubnub.uuid()
			};
			
			try {
				set(localEnvironmentInfo);
			} catch(error) {
				console.error('An error occurred while setting the environment info.', error);
			}
			
			return localEnvironmentInfo;
		}
		
		return JSON.parse(localEnvironmentInfo);
	}
	
	function set(info) {
		var stringified = JSON.stringify(info);
		
		localStorage.setItem(KEY, stringified);
	}
}

module.exports = new LocalEnvironmentProvider();