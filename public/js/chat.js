$( document ).ready(function(){
  var socket = io.connect('/');

  $('form').submit(function(){
    socket.emit('chat message', $('#message-text').val());
    $('#message-text').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

});
