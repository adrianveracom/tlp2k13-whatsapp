var chatView = (function($){

	var addMessage = function(data){
		var content = $('.messages');
		var template = '<li data-id="' + data.id + '"><div class="msg">' + data.message + '</div><div class="tick"></div><div class="doubletick"></div></li>';
		content.append(template);
	};

	var receiveMessage = function(data){
		var content = $('.messages');
		var template = '<li class="other" data-id="' + data.id + '"><div class="msg">' + data.message + '</div></li>';
		content.append(template);
	};

	var addWelcomeMessage = function(data) {
		var content = $('.messages');
		var template = '<li class="welcome">' + data.message + '</li>';
		content.append(template);	
	};

	var getInputValue = function(data){
		return $('#message').val();
	};

	var cleanInput = function(){
		$('#message').val('');
	};

	var markAsSent = function(id){
		$('li[data-id="' + id + '"] .tick').css('display', 'inline-block');
	};

	return {
		addMessage : addMessage,
		receiveMessage : receiveMessage,
		addWelcomeMessage : addWelcomeMessage,
		getInputValue : getInputValue,
		cleanInput : cleanInput,
		markAsSent: markAsSent
	}

})($);