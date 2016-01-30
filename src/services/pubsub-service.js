var pubnub = require('pubnub'),
	PUBLISHKEY = 'pub-c-ce05588f-4a03-446c-aacc-159f8a18b3d3',
	SUBSCRIBEKEY = 'sub-c-a898c26a-c62f-11e5-a316-0619f8945a4f';
	
function PubSubService() {
	var self = this,
		pubnubInst;
	
	self.subscribe = subscribe;
	self.publish = publish;
	self.uuid = uuid;
	
	(function init() {
		pubnubInst = pubnub({
			publish_key: PUBLISHKEY,
			subscribe_key: SUBSCRIBEKEY
		});
	})();
	
	function subscribe(options) {
		return pubnubInst.subscribe(options);
	}
	
	function publish(options) {
		options.publish_key = PUBLISHKEY;
		
		return pubnubInst.publish(options);
	}
	
	function uuid() {
		return pubnubInst.uuid();
	}
}

module.exports = new PubSubService();