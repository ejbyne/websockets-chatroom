$(document).ready(function() {
  var socket = io.connect('/');

  $('#enter-name').submit(function() {
    event.preventDefault();
    var username = $('#name').val();
    $('#name').val('');
    $('#enter-name').fadeOut(500);

    $('#chat-form').submit(function() {
      socket.emit('chat message', {
        user: username,
        text: $('#message-text').val()
      });
      $('#message-text').val('');
      return false;
    });

    socket.on('chat message', function(msg) {
      $('#messages').append($('<li>').text(msg.user + ": " + msg.text));
    });
  });

});
