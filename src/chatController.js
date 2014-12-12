var socket = function(io, session) {

  io.on('connection', function(socket){

    console.log('A user connected!');

    socket.on('user joined', function(username) {
      session.user = { name: username };
      console.log(session.user.name + ' joined the chatroom!');
      io.emit('chat message', {
        user: username,
        text: " joined the chatroom"
      });
      socket.broadcast.emit('user joined', username);

      socket.on('started typing', function(username) {
        console.log(username);
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
        console.log(session.user.name + ' left the chatroom!')
        io.emit('chat message', {
          user: session.user.name,
          text: " left the chatroom"
        });
        // socket.broadcast.emit('disconnect', session.user.name);
      });
  
    });

  });

};

module.exports = socket;
