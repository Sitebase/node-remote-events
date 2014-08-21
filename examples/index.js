var remote = require('../src/lib/RemoteEvents');

remote.connect({
	host: '54.164.43.98',
	port: 22,
	username: 'ubuntu',
	privateKey: require('fs').readFileSync('/Users/wim/.ssh/Red5.pem'),
	events: {
		'play.movie': '[mM]ovie',
		'play.audio': 'audio',
		'login': 'Accepted publickey'
	}
}).done(function(conn) {
	console.log('connection ready');

	conn.on('play.movie', function( line ) {
		console.log('Movie start:', line);
	});

	conn.on('play.audio', function( line ) {
		console.log('Audio start:', line);
	});

	conn.on('login', function( line ) {
		console.log('Someone logged into the server');
	});
});