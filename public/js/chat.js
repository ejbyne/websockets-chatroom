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
    socket.emit('user joined', username);
    clearForm();
    $('#typing-update').fadeIn();
    $('#chat-form').fadeIn();

    $('#message-text').on('focus', function() {
      socket.emit('started typing', username);
    });

    $('#message-text').on('blur', function() {
      socket.emit('finished typing', username);
    });

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

    // socket.on('user joined', function(username) {
    //   $('#users-present').append($('<li id=' + username + '-present>').text(username));
    // });

    socket.on('started typing', function(username) {
      $('#typing-update').append($('<li id=' + username + '>').text(username + ' is typing'));
    });

    socket.on('chat message', function(message, username) {
      receiveMessage(message);
    });

    socket.on('finished typing', function(username) {
      $(('#' + username)).remove();
    });

    // socket.on('disconnect', function(username) {
    //   $(('#' + username + '-present')).remove();
    // })

  });

});
