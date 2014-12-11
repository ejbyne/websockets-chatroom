var socket = function(io, session) {

  io.on('connection', function(socket){

    console.log('Client connected!');

    socket.on('disconnect', function() {
      console.log('Client disconnected!');
    });

    socket.on('chat message', function(msg) {
      io.emit('chat message', msg);
    });

    socket.on('username', function(username) {
      session.user = { name: username };
      console.log(session.user)
      io.emit('chat message', {
        user: username,
        text: " joined the chatroom"
      });
    });

  });

};

module.exports = socket;
