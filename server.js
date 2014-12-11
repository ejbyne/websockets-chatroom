var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/sockets', function(request, response){
  response.render('sockets');
});
