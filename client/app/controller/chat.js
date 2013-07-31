
var chatController = (function($){

	var messages = [],
		socket = null,
		conversationId = 1;

	var init = function(type){

		//Save type
		chatModel.saveType(type);

		//Identifier
		var identifier = chatModel.getIdentifier();
		console.log(identifier);

		socket = io.connect('http://localhost:3001', {
	      'reconnection delay': 100, // defaults to 500
	      'reconnection limit': 100, // defaults to Infinity
	      'max reconnection attempts': Infinity // defaults to 10
	    });

		socket.emit('join_room', identifier);

		socket.emit('join_conversation', conversationId, identifier, type);
	
		_events();
		_listeners();
	};

	var _events = function(){

		$('#send').on('click', function() {
	        
	        var msg = chatView.getInputValue();

	        var obj = { 
	        	message: msg, 
	        	id: chatModel.getId(),
	        	username: chatModel.getIdentifier(), 
	        	type: chatModel.getType(),
	        	conversationId : conversationId
	        };

	        if(msg == "") {
	            alert("Please type your name!");
	        } else {
	            socket.emit('send', obj);
	        }

	        chatView.cleanInput();
	        chatView.addMessage(obj);

	    });
	};

	var _listeners = function(){
		
		socket.on('message', function (data) {
	        if(data.message) {
	            messages.push(data);
	            chatView.receiveMessage(data);
	        } else {
	            console.log("There is a problem:", data);
	        }
	    });

	    socket.on('sent', function (data) {
	        if(data.id) {
	        	chatView.markAsSent(data.id);
	        }
	    });

	    socket.on('welcome', function (data) {
	    	chatView.addWelcomeMessage(data);
	    });
	};


	return {
		init : init
	}

})($);