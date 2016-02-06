// Clicker Framework 0.1.0

var mq = window.matchMedia( "(min-width: 767px)" );

if (mq.matches) {
	function prepareClickerJS(){
		createOnOffButton();
	}

	// Turn an element Clickable by ID
	function turnClickable(id){
		if(window._CLICKERJS.ids.indexOf(id) > -1)
			return;

		window._CLICKERJS.ids.push(id);
		if(window._CLICKERJS.active)
			displayScore(id);
	}

	function displayScore(id){
		var element = document.getElementById(id);
		if(!element)
			throw 'Clicker.js: Element with id "' + id + '" not found!';

		element.addEventListener("click", clickerJSListener, false);
		if(window.localStorage[element.id+"_score"] == null){
			window.localStorage[element.id+"_score"] = "0";
		}
		createScoreTable(element);
	}

	function removeScore(id){
		var element = document.getElementById(id);
		if(!element)
			throw 'Clicker.js: Element with id "' + id + '" not found!';

		element.removeEventListener("click", clickerJSListener);
		var score = document.getElementById(element.id + "_scoretable");
		if(score)
			document.body.removeChild(score);
	}

	function clickerJSListener(){
		addScore(this);
	}

	// Add element score on Local Storage
	function addScore(element){
		window.localStorage[element.id+"_score"]++;

		var ele = document.getElementById(element.id + "_scoretable");
		ele.getElementsByTagName("span")[0].innerHTML = window.localStorage[element.id+"_score"];

		console.log(window.localStorage[element.id+"_score"]);
	}


	function createScoreTable(element){
		var dive = document.createElement("div");
		var para = document.createElement("span");
		var node = document.createTextNode(window.localStorage[element.id+"_score"]);
		
		dive.className = "score_table";
		dive.id = element.id + "_scoretable";

		var posi = getPosicaoElemento(element.id);

		dive.style.left = posi.left + "px";
		dive.style.top = posi.top + "px";

		para.appendChild(node);
		dive.appendChild(para);
		document.body.appendChild(dive);
	}

	function createOnOffButton(){
		var id = 'on_off_button';
		if(document.getElementById(id))
			return;

		var dive = document.createElement("div");
		var para = document.createElement("span");
		var node = document.createTextNode("Let's Click!");

		dive.className = "score_table";
		dive.id = id;

		dive.style.right = "20px";
		dive.style.top = "15px";

		para.appendChild(node);
		dive.appendChild(para);
		document.body.appendChild(dive);

		dive.addEventListener("click", function(){ clickerJSToggleActive(); }, false);
	}

	function clickerJSToggleActive(){
		var status = window._CLICKERJS.active = !window._CLICKERJS.active;

		var functionName = status ? 'displayScore' : 'removeScore';
		for(var len = window._CLICKERJS.ids.length; len--;)
			window[functionName](window._CLICKERJS.ids[len]);

		var botao = document.getElementById("on_off_button");
		botao.getElementsByTagName("span")[0].innerHTML = status ? "Stop the Clicks!!" : "Let's Click!";
	}

	function getPosicaoElemento(elemID){
	    var offsetTrail = document.getElementById(elemID);
	    var offsetLeft = 0;
	    var offsetTop = 0;
	    while (offsetTrail) {
	        offsetLeft += offsetTrail.offsetLeft;
	        offsetTop += offsetTrail.offsetTop;
	        offsetTrail = offsetTrail.offsetParent;
	    }
	    if (navigator.userAgent.indexOf("Mac") != -1 && 
	        typeof document.body.leftMargin != "undefined") {
	        offsetLeft += document.body.leftMargin;
	        offsetTop += document.body.topMargin;
	    }
	    return {left:offsetLeft, top:offsetTop};
	}

	(function(){
		window._CLICKERJS = window._CLICKERJS || { active: false, ids: [] };

		if(document.readyState === 'complete')
			prepareClickerJS();
		else
			window.addEventListener('load', function() { prepareClickerJS(); }, false);
	})();
}