var pubnub = require('pubnub'),
	PUBLISHKEY = 'pub-c-ce05588f-4a03-446c-aacc-159f8a18b3d3',
	SUBSCRIBEKEY = 'sub-c-a898c26a-c62f-11e5-a316-0619f8945a4f';

module.exports = pubnub({
		publish_key: PUBLISHKEY,
		subscribe_key: SUBSCRIBEKEY
	});