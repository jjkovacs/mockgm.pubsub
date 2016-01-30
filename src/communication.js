var pubnub = require('./services/pubnub-service'),
	localEnvironmentProvider = require('./providers/local-environment-provider');

function Communication() {
	var self = this;
	
	self.sendToApp = sendToApp;
	self.watchForData = watchForData;
	
	(function init() {
		var localAppEnvironment = localEnvironmentProvider.get();
		
		pubnub.subscribe({
			channel: localAppEnvironment.id,
			message: function(message){
				console.log(message);
			},
			connect: log.bind(null, 'Communication Service Connected'),
			disconnect: log.bind(null, 'Communication Service Disconnected'),
			reconnect: log.bind(null, 'Communication Service Reconnected'),
			error: log.bind(null, 'Communication Service Error')
		});
	})();
	
	function sendToApp() {
		throw new Error('Not Implemented');
	}
	
	function watchForData() {
		throw new Error('Not Implemented');
	}
	
	function log(msg, msg2) {
		console.log(msg, msg2);
	}
}

module.exports = new Communication();