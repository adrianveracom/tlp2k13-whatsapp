
var App = (function(){

  var boot = function() {
	var type = window.location.hash.replace('#', '');
    chatController.init(type);
  };

  return {
    boot : boot
  }

})();