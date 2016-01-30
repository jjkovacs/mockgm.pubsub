

function DataWatcherService() {
	var self = this,
		handlerCounter = 0,
		handlers = {};
		
	self.addHandler = addHandler;
	self.removeHandler = removeHandler;
	self.dataReceiver = dataReceiver;
	
	function addHandler(callback) {
		if(!callback || typeof callback !== 'function') {
			throw new Error('Invalid parameter -- "callback" must be a function.');
		}
		
		var id = ++handlerCounter;
		
		handlers[id] = callback;
		
		return id;
	}
	
	function removeHandler(id) {
		if(!id || typeof id !== 'number') {
			throw new Error('Invalid parameter -- "handle" must be a valid callback handle.');
		}
		
		if(!handlers[id]) {
			throw new Error('No handler with id "' + id + '" exists.');
		}
		
		delete handlers[id];
	}
	
	function dataReceiver(data) {
		for(var key in handlers) {
			var handler = handlers[key];
			
			try {
				handler(data);
			} catch(error) {
				console.error('An unhandled error occurred in watchForData handler ' + key + '.', error);
			}
		}
	}
}

module.exports = new DataWatcherService();