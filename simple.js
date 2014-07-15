var handle = require('oban');
var http   = require('http');
var route  = require('livewire');
var resp   = require('dram');

var server = http.createServer(handle(
		route.get('/', function(req) {
			return resp.ok('dreams came on in the Japanese night');
		})
));
server.listen(process.env.PORT || 3000);
