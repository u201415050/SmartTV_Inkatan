var widthHtml = $(window).width();
var arrayElements = [
	'<div id="player1" class="itemPlayer"><div id="avatar1" class="avatar turnActive" style="border-radius: ' + widthHtml * 0.07 + 'px;width:' + widthHtml * 0.14 + 'px; height:' + widthHtml * 0.14 + 'px"><img id="userImage1" class="user" src="../../assets/icons/user.png" style="width:' + widthHtml * 0.12 + 'px; height:' + widthHtml * 0.12 + 'px"/></div><div id="playerName1" class="playerName" style="color:white; font-size:' + widthHtml * 0.022 + 'px">',
	'<div id="player2" class="itemPlayer"><div id="avatar2" class="avatar " style="border-radius: ' + widthHtml * 0.07 + 'px;width:' + widthHtml * 0.14 + 'px; height:' + widthHtml * 0.14 + 'px; background: rgb(171, 154, 31)"><img id="userImage2" class="user" src="../../assets/icons/user.png" style="width:' + widthHtml * 0.12 + 'px; height:' + widthHtml * 0.12 + 'px"/></div><div id="playerName2" class="playerName" style="color:white; font-size:' + widthHtml * 0.022 + 'px">',
	'<div id="player3" class="itemPlayer"><div id="avatar3" class="avatar " style="border-radius: ' + widthHtml * 0.07 + 'px;width:' + widthHtml * 0.14 + 'px; height:' + widthHtml * 0.14 + 'px; background: rgb(126, 34, 140)"><img id="userImage3" class="user" src="../../assets/icons/user.png" style="width:' + widthHtml * 0.12 + 'px; height:' + widthHtml * 0.12 + 'px"/></div><div id="playerName3" class="playerName" style="color:white; font-size:' + widthHtml * 0.022 + 'px">',
	'<div id="player4" class="itemPlayer"><div id="avatar4" class="avatar " style="border-radius: ' + widthHtml * 0.07 + 'px;width:' + widthHtml * 0.14 + 'px; height:' + widthHtml * 0.14 + 'px; background: rgb(140, 89, 34)"><img id="userImage4" class="user" src="../../assets/icons/user.png" style="width:' + widthHtml * 0.12 + 'px; height:' + widthHtml * 0.12 + 'px"/></div><div id="playerName4" class="playerName" style="color:white; font-size:' + widthHtml * 0.022 + 'px">'
]

var turnIndex = 0

function PaseTurno() {
	//alert(1)
	
	$('#avatar' + (turnIndex + 1)).removeClass("turnActive");
	if (turnIndex + 1 == ActualParameters.numberPlayers) {
		turnIndex = 0;
	} else {
		turnIndex += 1
	}
	//alert(turnIndex)
	$('#avatar' + (turnIndex + 1)).addClass("turnActive");
	sendMessageServer({
		action:"TURNO",
		player: PlayersDetails[turnIndex].name
	})
	if(game.status!='START'){
		sounds.drum.play(0,1,0.3)
	}
	activeTurn = true
	dado=true;
	modal.showUp("Es turno de "+PlayersDetails[turnIndex].name, 2);
	mostrarAsignacion=false
}
function BackTurno() {
	//alert(1)
	$('#avatar' + (turnIndex + 1)).removeClass("turnActive");
	if (turnIndex == 0) {
		turnIndex = ActualParameters.numberPlayers - 1;
	} else {
		turnIndex -= 1
	}
	//alert(turnIndex)
	$('#avatar' + (turnIndex + 1)).addClass("turnActive");
	sendMessageServer({
		action:"TURNO",
		player: PlayersDetails[turnIndex].name
	})
	modal.showUp("Es turno de "+PlayersDetails[turnIndex].name, 2);
}