var listAvaliableServers = []

function getServers() {
	console.log('Busca Servers');
	$('#title').html('Escoja el servidor a conectarse');
	try {
		webapis.network.getAvailableNetworks(successCB, errorCB);
	} catch (error) {
		console.log(error.name);
	}
}
var ipConnected = ''
	
function avaliableServersToDiv() {
	console.log("[discoveryHelper] Avaliable: servers:\n");
	var addOptions = "";
	for (var it = 0; it < listAvaliableServers.length; it++) {
		addOptions += '<button type="button" id="' + (it + 2) +
			'" class="button-list" onclick="entablishConnection(\'' +
			listAvaliableServers[it] + '\');" >' +
			listAvaliableServers[it] + "</button>";
		console.log(listAvaliableServers[it] + "\n");
	}
	ipConnected = listAvaliableServers[0]
	//alert(1)
	entablishConnection('')
	var div = document.getElementById("avaliableServers");
	div.innerHTML = addOptions;
}

function discoveryServers() {
	console.log("[discoveryHelper] executing discoveryServers()");
	// pMethods.clearListServer();
	// pMethods.resetIterator();
	var serverArrayTest = [];
	for (var i = 0; i < 255; i++) {
		var ws = new WebSocket("ws://192.168.1." + i + ":8080");
		serverArrayTest.push(ws);
		serverArrayTest[i].onopen = function () {
			attribs.listAvaliableServers.push(this.url);
			console.log('[discoveryHelper] Websocket found in :' + this.url);
			this.close();
			avaliableServersToDiv();
		};
	}
}

function getUserIP(onNewIP) {

	var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
	var pc = new myPeerConnection({
			iceServers: []
		}),
		noop = function () {},
		localIPs = {},
		ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
		key;

	function iterateIP(ip) {
		if (!localIPs[ip]) onNewIP(ip);
		localIPs[ip] = true;
	}
	pc.createDataChannel("");

	pc.createOffer(function (sdp) {
		sdp.sdp.split('\n').forEach(function (line) {
			if (line.indexOf('candidate') < 0) return;
			line.match(ipRegex).forEach(iterateIP);
		});

		pc.setLocalDescription(sdp, noop, noop)
	}, function (reason) {})

	pc.onicecandidate = function (ice) {
		if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
		ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	};
}

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
	$(location).attr('href', location.href.substr(0, location.href.length - 10) + "Inkatan/SelectPlayers/index.html?url=" + ipConnected + "&ipSelected=" + IpSelected);
	//$(location).attr('href', "./Inkatan/SelectPlayers/?url=" + ipConnected + "&ipSelected=" + IpSelected);
}
// Usage

getUserIP(function (ip) {

	var toSplit = ip;
	var ipBase = toSplit.split(".", 3);
	var ipWS = -1;
	ipWS = ipBase[0] + "." + ipBase[1] + "." + ipBase[2];

	for (var i = 0; i < 255; i++) {
		var ws = new WebSocket("ws://" + ipWS + "." + i + ":8080");
		ws.onopen = function () {
			listAvaliableServers.push(this.url);

			//console.log()
			console.log('[discoveryHelper] Websocket found in :' + this.url);
			clearInterval(intervalReload)
			console.log(this)
			var canAdd = true
			listAvaliableServers.map(function (serverFound) {
				if (serverFound == this.url) {
					canAdd = false
				}
			})
			if (canAdd) {
				found(this.url, listAvaliableServers.length - 1)
			}
			//avaliableServersToDiv();
		};
	};
});
var intervalReload = setInterval(function () {
	//location.reload()
}, 20000)