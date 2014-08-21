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

		conn.exec(command, function(err, stream) {
			if (err) throw err;
			stream.on('exit', function(code, signal) {
				console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
			}).on('close', function() {
				console.log('Stream :: close');
				conn.end();
			}).on('data', function(data) {
				conn.emit('someevent', 'This is a test');
				console.log('STDOUT: ' + data);
			}).stderr.on('data', function(data) {
				console.log('STDERR: ' + data);
			});
		});
	}).connect({
		host: options.host || null,
		port: options.port || null,
		username: options.username || null,
		privateKey: options.privateKey || null
	});

	return deferred.promise;
}

var events = new EventEmitter();


module.exports = {
	connect: Connect
}