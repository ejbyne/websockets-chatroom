var socket = function(io, session) {

  var currentUsers = [];

  io.on('connection', function(socket){

    console.log('A user connected!');

    socket.on('user joined', function(username) {

      session.user = { name: username };
      currentUsers.push(username);
      console.log(session.user.name + ' joined the chatroom!');
      io.emit('user joined', session.user.name, currentUsers);

      socket.on('started typing', function(username) {
        console.log(username + ' started typing');
        socket.broadcast.emit('started typing', username);
      });

      socket.on('finished typing', function(username) {
        console.log(username + ' finished typing');
        socket.broadcast.emit('finished typing', username);
      });

      socket.on('chat message', function(message) {
        console.log(session.user.name + ' posted a message!')
        socket.broadcast.emit('chat message', message);
      });

      socket.on('disconnect', function() {
        var index = currentUsers.indexOf(session.user.name);
        currentUsers.splice(index, 1);
        console.log(session.user.name + ' left the chatroom!');
        io.emit('disconnect', session.user.name, currentUsers);
      });
  
    });

  });

};

module.exports = socket;
