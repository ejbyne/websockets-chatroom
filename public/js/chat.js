$(document).ready(function() {

  var socket = io.connect('/');

  function startChat() {
      $('#name').val('');
      $('#enter-name').fadeOut(500, function() {
        $('#messages').fadeIn();
        $('#users-present').fadeIn();
        $('#typing-update').fadeIn();
        $('#chat-form').fadeIn();        
      });
    };

  function receiveMessage(message, username) {
    if(message.user === username) {
      $('#messages').append("<li class=own-message>You" + message.text + "</li>");
    } else {
      $('#messages').append("<li class=other-message>" + message.user + message.text + "</li>");
    };
    $('#messages').animate({"scrollTop": $('#messages')[0].scrollHeight}, "fast");
  }

  $('#enter-name').submit(function() {
    event.preventDefault();
    var username = $('#name').val();
    socket.emit('user joined', username);
    startChat();

    $('#message-text').on('focus', function() {
      socket.emit('started typing');
    });

    $('#message-text').on('blur', function() {
      socket.emit('finished typing');
    });

    $('#chat-form').submit(function() {
      event.preventDefault();
      var message = {
        user: username,
        text: ' said: ' + $('#message-text').val()
      }
      socket.emit('chat message', message);
      $('#message-text').val('');
      receiveMessage(message, username);
    });

    socket.on('chat message', function(message, username) {
      receiveMessage(message, username);
    });

    socket.on('user joined', function(username, currentUsers) {
      $('#messages').append($('<li>').text(username + ' joined the chatroom'));
      $('#messages').animate({"scrollTop": $('#messages')[0].scrollHeight}, "fast");
      $('#users-present li').remove();
      currentUsers.forEach(function(user) {
        $('#users-present').append($('<li>').text(user));
      });
    });

    socket.on('disconnect', function(username, currentUsers) {
      $('#messages').append($('<li>').text(username + ' left the chatroom'));
      $('#messages').animate({"scrollTop": $('#messages')[0].scrollHeight}, "fast");
      $('#users-present li').remove();
      currentUsers.forEach(function(user) {
        $('#users-present').append($('<li>').text(user));
      });
    });

    socket.on('started typing', function(username) {
      $('#typing-update').text(username + ' is typing');
    });

    socket.on('finished typing', function(username) {
      $('#typing-update').empty();
    });

  });

});
