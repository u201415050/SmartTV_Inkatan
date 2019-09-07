var pointsValue = 5

function modificarPuntos(mas) {

	document.getElementById('pointsValue').innerHTML = mas;
	sendMessageServer({
		action:"CONNECTION",
		name: "Inicia el juego"
	})
	setTimeout(function () {
		sendMessageServer({
			action:"STARTGAME"
		})
		location.replace(location.href.replace("ModePoints","GameCore")+"&gamemode=points&gamevalue="+mas)
		
		gameStarting = false
	}, 100)
}

function setStateListeners(){
	glob.addState("GAMEVALUE");
	glob.setCurrentState("GAMEVALUE");
	glob.addListenertoState("GAMEVALUE", "VALUE", function (obj) {
		modificarPuntos(obj.value);
	});
	//glob.printContent();
}