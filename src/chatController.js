var socket = function(io) {

  var currentUsers = [];

  io.on('connection', function(socket){
    var socketUser;
    console.log('A user connected!');

    socket.on('user joined', function(username) {
      socketUser = username;
      currentUsers.push(socketUser);
      console.log(socketUser + ' joined the chatroom!');
      io.emit('user joined', socketUser, currentUsers);

      socket.on('started typing', function() {
        console.log(socketUser + ' started typing');
        socket.broadcast.emit('started typing', socketUser);
      });

      socket.on('finished typing', function() {
        console.log(socketUser + ' finished typing');
        socket.broadcast.emit('finished typing', socketUser);
      });

      socket.on('chat message', function(message) {
        console.log(socketUser + ' posted a message!')
        socket.broadcast.emit('chat message', message);
      });

      socket.on('disconnect', function() {
        var index = currentUsers.indexOf(socketUser);
        currentUsers.splice(index, 1);
        console.log(socketUser + ' left the chatroom!');
        io.emit('disconnect', socketUser, currentUsers);
      });
    });
  });
};

module.exports = socket;
