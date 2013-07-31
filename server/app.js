
var app = (function(){

  var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    nStore = require('nstore');

  //Helpers
  var _printDate = function() {
    var temp = new Date();
    var dateStr = _padStr(temp.getDate()) + '/' + _padStr(1 + temp.getMonth()) + '/' + _padStr(temp.getFullYear());
    return dateStr;
  }

  var _padStr = function(i) {
      return (i < 10) ? "0" + i : "" + i;
  }

  //Main

  var conversations = [];

  var boot = function(){

    var users = nStore.new('conversations.db', function () {
      console.log('Database created');
    });

    server.listen(3001);

    io.sockets.on('connection', function (socket) {
      socket.emit('welcome', { message: _printDate() });

      socket.on('send', function (data) {

        var receptorType = data.type == 'user' ? 'friend' : 'user';

        users.get("conversation::" + data.conversationId + "::" + receptorType, function (err, doc, key) {
          if (err) { throw err; }
          // You now have the document

          var receptorId = doc.id;

          //Send to receptor
          console.log('emit to room' + receptorId);
          io.sockets.in(receptorId).emit('message', data);

          //Send confirmation to user
          console.log('emit to room' + data.username);
          io.sockets.in(data.username).emit('sent', data);
        });

        
      });
      
      socket.on('join_room', function (roomIdentifier) {
        socket.join(roomIdentifier);
        console.log('User joined to room ' + roomIdentifier);
      });

      socket.on('join_conversation', function(conversationId, userId, userType){
        //localStorage.setItem('conversation::' + conversationId + '::' + userType, userId);
        users.save('conversation::' + conversationId + '::' + userType, {id: userId}, function (err) {
            if (err) { throw err; }
        });
      });
    });
  };

  return {
    boot : boot
  };

})();


app.boot();