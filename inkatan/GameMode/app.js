$(document).ready(function () {
	setStateListeners();})

var nPlayers = getParameterByName("nplayer")
var players = $('#playersContainer')

for (var i = 1; i < nPlayers; i++) {
	console.log('<div id="player' + (i + 1) + '" class="player">' + (i + 1) + '. Waiting...</div>')
	players.append(
		'<div id="player' + (i + 1) + '" class="player">' + (i + 1) + '. Waiting...</div>'
	)
}

function setStateListeners(){
	glob.addState("GAMEMODE");
	glob.setCurrentState("GAMEMODE");
	glob.addListenertoState("GAMEMODE", "MODE", function (obj) {
		sendMessageServer({
			action:"CONNECTION",
			name: "Modo "+(obj.mode=="points"?"puntos":"expansion")+" seleccionado"
		})
		location.replace(location.href.replace("GameMode","Mode"+(obj.mode=="points"?"Points":"Expansion")))
		
	});
	//glob.printContent();
}

function test1(){
	glob.execute({action:"MODE",mode:"expand"})
}