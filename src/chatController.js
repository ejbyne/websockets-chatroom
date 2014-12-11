var socket = function(io) {

  io.on('connection', function(socket){

    console.log('Client connected!');

    socket.on('disconnect', function() {
      console.log('Client disconnected!');
    });

    socket.on('chat message', function(msg) {
      io.emit('chat message', msg);
    });

  });

};

module.exports = socket;
