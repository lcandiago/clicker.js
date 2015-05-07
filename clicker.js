// Clicker Framework 0.1.0

// Turn an element Clickable by ID
function turnClickable(id){
	var element = document.getElementById(id);

	if(!element.clickable){
		element.clickable = true;

		element.addEventListener("click", function() {addScore(element)}, false)

		if(window.localStorage[element.id+"_score"] == null){
			window.localStorage[element.id+"_score"] = "0";
		}
		createScoreTable(element);
	}

}

// Add element score on Local Storage
function addScore(element){
	window.localStorage[element.id+"_score"]++;

	var ele = document.getElementById(element.id + "_scoretable");
	ele.getElementsByTagName("p")[0].innerHTML = window.localStorage[element.id+"_score"];

	console.log(window.localStorage[element.id+"_score"]);
}


function createScoreTable(element){
	var dive = document.createElement("div");
	var para = document.createElement("p");
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
	if(!document.getElementById("on_off_button")){
		var dive = document.createElement("div");
		var para = document.createElement("p");
		var node = document.createTextNode("Let's Click!");

		dive.className = "score_table";
		dive.id = "on_off_button";

		dive.style.right = "20px";
		dive.style.top = "15px";

		para.appendChild(node);
		dive.appendChild(para);
		document.body.appendChild(dive);

		dive.addEventListener("click", function() {setConfigs()}, false);
	}
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

///
window.addEventListener("load", function() {
	createOnOffButton();
}, false);

function setConfigs(){
	turnClickable("guitar1");
	turnClickable("guitar2");
	turnClickable("bass");
	turnClickable("drums");

	var botao = document.getElementById("on_off_button");
	botao.getElementsByTagName("p")[0].innerHTML = "Stop the Clicks!!";
	botao.addEventListener("click", function() {location.reload()}, false);
}
