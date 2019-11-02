var webSocket = {};
/*var glob = new GlobalState();
var ActualParameters;*/
var cursors;
function connect(url) {
    
    if (url != null) {
        var obj_1;
        webSocket.ws = new WebSocket(url);
        webSocket.ws.onmessage = function (e) {
            obj_1 = JSON.parse(e.data);
            message = obj_1.body ? obj_1.body.message : null;
            if (message)
                glob.execute(JSON.parse(message));
        };

        logs(url)
        webSocket.ws.onopen = function () {
           
                    if (ActualParameters.namesPlayers != null) {
                        var listPlayers = ActualParameters.namesPlayers.split(",");
                        sendMessageServer({
                            action: "TURNO",
                            player: listPlayers[0]
                        });
                    
        }
        };
        webSocket.ws.onclose = function () {
            console.log("closed");
        };
    }
}
function sendMessageServer(texto) {
    console.log("SENDED");
    console.log(texto);
    webSocket.ws.send(JSON.stringify(texto));
}
function getParametersFromUrl() {
    var newStr = location.href.substr(location.href.indexOf("?") + 1);
    console.log(newStr);
    var objParameters = {};
    newStr.split("&").map(function (item) {
        var pairs = item.split("=");
        objParameters[pairs[0]] = pairs[1];
    });
    ActualParameters = objParameters;
}
