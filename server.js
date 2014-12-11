var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var socket = require('./src/chatController.js')(io);
var session;

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(request, response) {
  session = request.session;
  response.render('index');
});

app.post('/', function(request, response) {
  session.name = request.param.name;
  console.log(session.name);
})

app.get('/socket', function(request, response){
  response.render('socket');
});

server.listen(3000, function() {
  console.log("listening on port 3000");
});
