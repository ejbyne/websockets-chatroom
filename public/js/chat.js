$( document ).ready(function(){
  var socket = io.connect('/');

  $('#enter-name').submit(function() {
    // var name = $('#name').val();
  });

  $('#chat-form').submit(function(){
    socket.emit('chat message', $('#message-text').val());
    $('#message-text').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

});
