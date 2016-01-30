var communication = require('./communication'),
	dataWatcherService = require('./services/data-watcher-service');

function Comm() {
	var self = this,
		watching = false;
	
	self.sendToApp = sendToApp;
	self.watchForData = watchForData;
	self.clearWatchForData = clearWatchForData;
	
	function sendToApp(appId, length, msg) {
		return communication.sendToApp(appId, length, msg);
	}
	
	function watchForData(callback) {
		if(!callback || typeof callback !== 'function') {
			throw new Error('Invalid parameter -- "callback" must be a function.');
		}
		
		var handleId = dataWatcherService.addHandler(callback);
		
		// dont register the internal watcher until comm.watchForData has been called.
		// this mimicks App0's behavior.
		if(!watching) {
			communication.watchForData(dataWatcherService.dataReceiver);
			watching = true;
		}
		
		return handleId;
	}
	
	function clearWatchForData(handle) {
		if(!handle || typeof handle !== 'number') {
			throw new Error('Invalid parameter -- "handle" must be a valid callback handle.');
		}
		
		dataWatcherService.removeHandler(handle);
	}
}

module.exports = new Comm();