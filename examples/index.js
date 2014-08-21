var remoteEvents = require('../src/lib/RemoteEvents');
var connection = remoteEvents.connect({
	host: '54.164.43.98',
	port: 22,
	username: 'ubuntu',
	privateKey: require('fs').readFileSync('/Users/wim/.ssh/Red5.pem')
});

connection.done(function(conn) {
	console.log('connection ready');

	conn.on('someevent', function() {
		console.log('Hello there');
	});
});

/*var openwrt = require('../src/lib/OpenWRT');

openwrt.on('bla', function() {
	console.log('Bla received');
});

openwrt.connect({
	host: '54.164.43.98',
	port: 22,
	username: 'ubuntu',
	privateKey: require('fs').readFileSync('/Users/wim/.ssh/Red5.pem')
});*/

//console.log(openwrt.connect());