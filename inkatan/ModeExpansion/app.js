var expansionPorcentaje = 50
$(document).ready(function () {
	setStateListeners();
})
function modificarExpansion(mas) {
	document.getElementById('percentValue').innerHTML = mas + '%';
	sendMessageServer({
		action:"CONNECTION",
		name: "Inicia el juego"
	})
	
	setTimeout(function () {
		sendMessageServer({
			action:"STARTGAME"
		})
		location.replace(location.href.replace("ModeExpansion","GameCore")+"&gamemode=expansion&gamevalue="+mas)
		
		
		gameStarting = false
	}, 100)

}
function setStateListeners(){
	glob.addState("GAMEVALUE");
	glob.setCurrentState("GAMEVALUE");
	glob.addListenertoState("GAMEVALUE", "VALUE", function (obj) {
		modificarExpansion(obj.value);
	});
	//glob.printContent();
}