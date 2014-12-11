$(document).ready(function() {

  var socket = io.connect('/');

  function clearForm() {
      $('#name').val('');
      $('#enter-name').fadeOut(500);
    };

  function receiveMessage(message, username) {
    if(message.user === username) {
      $('#messages').append($('<li>').text("You" + message.text));
    } else {
      $('#messages').append($('<li>').text(message.user + message.text));
    };
  }

  $('#enter-name').submit(function() {
    event.preventDefault();
    var username = $('#name').val();
    socket.emit('username', username);
    clearForm();

    $('#chat-form').submit(function() {
      event.preventDefault();
      var message = {
        user: username,
        text: ' said: ' + $('#message-text').val()
      }
      socket.emit('chat message', message);
      $('#message-text').val('');
      receiveMessage(message);
    });

    socket.on('chat message', function(message, username) {
      receiveMessage(message);
    });

  });

});
