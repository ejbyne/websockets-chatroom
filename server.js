var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var socket = require('./src/socketController.js')(io);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/public'));

app.get('/sockets', function(request, response){
  response.render('socket');
});

app.listen(3000, function() {
  console.log("listening on port 3000");
});
