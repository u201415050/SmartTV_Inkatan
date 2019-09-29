var listAvaliableServers = []

function entablishConnection(index) {
	//$(location).attr('href', "./?url=" + ipConnected);
	//
	//alert(1)
	connect(listAvaliableServers[index])
	//clearInterval(intervalReload)
	ipConnected = listAvaliableServers[index]
	var findIp = ipConnected.indexOf(':8080');
	var IpSelected = ipConnected[findIp - 2] == '.' ? ipConnected.substr(findIp - 1, 1) :
		ipConnected[findIp - 3] == '.' ? ipConnected.substr(findIp - 2, 2) :
		ipConnected[findIp - 4] == '.' ? ipConnected.substr(findIp - 3, 3) :
		'0'
	//$(location).attr('href', location.href.substr(0, location.href.length - 10) + "Inkatan/SelectPlayers/index.html?url=" + ipConnected + "&ipSelected=" + IpSelected);
	//onsole.log(location.href.substr(0, location.href.length - 10)+"inkatan/SelectPlayers/index.html?url=" + ipConnected + "&ipSelected=" + IpSelected);
	location.replace(location.href.substr(0, location.href.length - 10)+"inkatan/SelectPlayers/index.html?url=" + ipConnected + "&ipSelected=" + IpSelected)
	//location.replace(location.href.substr(0, location.href.length - 10)+"gestureexample/main.html?url=" + ipConnected + "&ipSelected=" + IpSelected)
	//$(location).attr('href', "./Inkatan/SelectPlayers/?url=" + ipConnected + "&ipSelected=" + IpSelected);
}

function availableServersToDiv(server) {
	
	console.log(server);
	listAvaliableServers.push(server);
	
	found(server, listAvaliableServers.length - 1)
}

var Synapse = new window.Synapse(8080);

function findServers() {
	Synapse.findServers(15,
		5000,
		availableServersToDiv,
		null)
}

//#region STARS

//#endregion

$(document).ready(function () {
	//renderStars();
	//renderLitleStars();
	setTimeout(findServers, 3000);
});


