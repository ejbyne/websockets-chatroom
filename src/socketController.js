var socket = function(io) {

  io.on('connection', function(){
    console.log('Client connected!');
  });

};

module.exports = socket;
