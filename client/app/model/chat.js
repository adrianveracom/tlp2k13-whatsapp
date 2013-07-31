var chatModel = (function(){

  var saveType = function(type){
    if (type != '')
      localStorage.setItem('type', type);
  };

  var getType = function(){
    return localStorage.getItem('type');
  };

	var getIdentifier = function(){

		var identifier = localStorage.getItem('identifier');

		if (!identifier) {
			//Generating random identifier
			identifier =  'user-' + Math.round(Date.now() * Math.random());
      localStorage.setItem('identifier', identifier);
		}

    return identifier;
	};

  var getId = function(){
    //TODO this should not be random
    return Math.floor((Math.random()*1000000)+1);;
  };

	return {
    saveType : saveType,
    getType : getType,

		getIdentifier : getIdentifier,
    getId : getId
	}

})();