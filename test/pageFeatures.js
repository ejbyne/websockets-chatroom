describe('page features', function(){

  before(function(){
    casper.start('http://localhost:3000/');
  });

  it('shows the title and a request to enter the user\'s name', function(){
    casper.then(function(){
      expect('body').to.contain.text('Chatterbox');
      expect('body').to.contain.text('Please enter your name:');
    });
  });

  it('takes the user into the chatroom when he or she has entered his or her name', function() {
  	casper.then(function() {
  		this.fill('form#enter-name', {
  			'name': 'Ed'
  		}, true);
  	})
  	.then(function() {
  		expect('#messages').to.contain.text('Ed joined the chatroom');
  	});
  });

  it('contains a list of current users present', function() {
  	casper.then(function() {
  		expect('#users-present').to.contain.text('Ed');
  	});
  });

  it('enables the user to enter a message', function() {
  	casper.then(function() {
  		this.fill('form#chat-form', {
  			'message': 'Hi there!'
  		}, true);
  	})
  	.then(function() {
  		expect('#messages').to.contain.text('Hi there!');
  	});
  });

});
