var EventEmitter = require('events').EventEmitter;
var util = require('util');
var ssh2 = require('ssh2');
var Q = require('q');

function Connect( options )
{
	var deferred = Q.defer();
	console.log('Connect to open WRT');
	var conn = new ssh2();
	conn.on('ready', function() {
		console.log('Connection :: ready');

		util.inherits(conn, EventEmitter);
		deferred.resolve(conn);

		// Command to do the monitoring on
		var command = options.monitorCmd || 'logread -f';

		console.log('Exec: ', command);

		conn.exec(command, function(err, stream) {
			if (err) throw err;
			stream.on('exit', function(code, signal) {
				console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
			}).on('close', function() {
				console.log('Stream :: close');
				conn.end();
			}).on('data', function(data) {
				var line = data.toString();
				//conn.emit('event.line', data.toString());
				//console.log('STDOUT: ' + data);
				
				for(name in options.events) {
					var regex = options.events[name];

					if( line.match( regex ) )
						conn.emit(name, line);
				}

			}).stderr.on('data', function(data) {
				console.log('STDERR: ' + data);
			});
		});
	}).connect({
		host: options.host || null,
		port: options.port || null,
		username: options.username || null,
		password: options.password || null,
		privateKey: options.privateKey || null
	});

	return deferred.promise;
}

var events = new EventEmitter();


module.exports = {
	connect: Connect,
	LINE: 'event.line'
}