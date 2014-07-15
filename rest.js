var handle = require('oban');
var http   = require('http');
var route  = require('livewire');
var resp   = require('dram');

var quotes = [{
  author: 'Audrey Hepburn',
  text: 'Nothing is impossible, the word itself says \'I\'m possible\'!'
}, {
  author: 'Walt Disney',
  text: 'You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you'
}, {
  author: 'Unknown',
  text: 'Even the greatest was once a beginner. Don\'t be afraid to take that first step.'
}, {
  author: 'Neale Donald Walsch',
  text: 'You are afraid to die, and you\'re afraid to live. What a way to exist.'
}];

function json(obj) {
  return resp.ok(JSON.stringify(obj))
    .withHeader('Content-Type', 'application/json');
}

http.createServer(handle(route.route([
  route.get('/quotes', function() {
    return json(quotes);
  }),
  route.get('/random', function() {
    var id = Math.floor(Math.random() * quotes.length);
    return json(quotes[id]);
  }),
  route.get('/quote/:id', function(req) {
    if(quotes[req.params.id]) {
      return json(quotes[req.params.id]);
    }
    return resp.notFound('No quote found');
  }),
  route.post('/quote', function(req) {
    return route.json(req).flatMap(function(body) {
      var newquote = {
        author: body.author,
        text: body.text
      };
      quotes.push(newquote);
      return json(newquote);
    });
  }),
  function(req) { return resp.notFound(req.url + ' not found'); }
]))).listen(process.env.PORT || 3000);
