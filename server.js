var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = require('./src/socketController.js')(io);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/socket', function(request, response){
  response.render('socket');
});

server.listen(3000, function() {
  console.log("listening on port 3000");
});
