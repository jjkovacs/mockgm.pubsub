var communication = require('./communication');

function Comm() {
	var self = this;
	
	self.sendToApp = sendToApp;
	self.watchForData = watchForData;
	self.clearWatchForData = clearWatchForData;
	
	function sendToApp(msg) {
		return communication.sendToApp(msg);
	}
	
	function watchForData(callback) {
		return communication.watchForData(callback);
	}
	
	function clearWatchForData(handle) {
		return communication.clearWatchForData(handle);
	}
}

module.exports = new Comm();