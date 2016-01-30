var pubsubService = require('./services/pubsub-service'),
	localEnvironmentProvider = require('./providers/local-environment-provider');

function Communication() {
	var self = this,
		parentAppId,
		handlerCounter = 0,
		handler; // per the gm framework's implementation, we only support one subscribed watcher
	
	self.sendToApp = sendToApp;
	self.watchForData = watchForData;
	self.clearWatchForData = clearWatchForData;
	
	(function init() {
		parentAppId = window.ngiAppId;
		
		if(!parentAppId) {
			throw new Error('Failed to initialize the communication service. You must specify this app\'s ID at "window.ngiAppId".');
		}
		
		pubsubService.subscribe({
			channel: getChannel(parentAppId),
			message: receiveMessage,
			connect: log.bind(null, 'Communication Service Connected'),
			disconnect: log.bind(null, 'Communication Service Disconnected'),
			reconnect: log.bind(null, 'Communication Service Reconnected'),
			error: log.bind(null, 'Communication Service Error')
		});
	})();
	
	function sendToApp(appId, length, data) {
		if(typeof appId !== 'number' || appId <= 0) {
			throw new Error('Invalid parameter -- "appId" must be a positive integer.');
		}
		
		if(typeof data !== 'string') {
			throw new Error('Invalid parameter -- "data" must be valid stringified json.');
		}
		
		try {
			JSON.parse(data);
		} catch(error) {
			throw new Error('Invalid parameter -- "data" must be valid stringified json.');
		}
		
		pubsubService.publish({
			channel: getChannel(appId),
			message: {
				senderID: parentAppId,
				data: data
			}
		});
	}
	
	function watchForData(callback) {
		handler = callback;
		
		return ++handlerCounter;
	}
	
	function clearWatchForData(id) {
		if(id !== handlerCounter) {
			// not sure what the framework does if you pass in a handler ID that
			// doesn't correspond to the currently subscribed handler, since you can only have one
			throw new Error('No handler with id "' + id + '" exists.');
		}
		
		handler = null;
	}
	
	function receiveMessage(message) {
		if(!handler) {
			console.log('Received a message, but no handlers are subscribed.', message);
			return;
		}
		
		handler(message);
	}
	
	function getChannel(appId) {
		var localAppEnvironment = localEnvironmentProvider.get();
		
		return localAppEnvironment.id + '|' + appId;
	}
	
	function log(msg, msg2) {
		console.log(msg, msg2);
	}
}

module.exports = new Communication();