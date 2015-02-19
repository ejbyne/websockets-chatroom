var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var socket = require('./src/chatController.js')(io);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(request, response) {
  response.render('index');
});

var port = process.env.PORT || 3000;

server.listen(port, function() {
  console.log("listening on port" + port);
});
