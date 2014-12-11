var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var socket = require('./src/chatController.js')(io);
var session = require('express-session');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/session', function(request, response) {
  session.user = { name: request.body.name };
  response.json(session.user);
});

app.get('/session', function( request, response) {
  response.send(request.session);
});

server.listen(3000, function() {
  console.log("listening on port 3000");
});
