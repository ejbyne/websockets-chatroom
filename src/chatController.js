var socket = function(io, session) {

  io.on('connection', function(socket){

    console.log('A user connected!');

    socket.on('username', function(username) {
      session.user = { name: username };
      console.log(session.user.name + ' joined the chatroom!');
      io.emit('chat message', {
        user: username,
        text: " joined the chatroom"
      });

      socket.on('chat message', function(message) {
        console.log(session.user.name + ' posted a message!')
        io.emit('chat message', message);
      });

      socket.on('disconnect', function() {
        console.log(session.user.name + ' left the chatroom!')
        io.emit('chat message', {
          user: session.user.name,
          text: " left the chatroom"
        });
      });
  
    });

  });

};

module.exports = socket;
