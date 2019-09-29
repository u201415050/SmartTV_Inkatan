let webSocket: Object = {};
var glob = new GlobalState();
var ActualParameters;
var cursors;
$(document).ready(function() {
  getParametersFromUrl();
  console.log(ActualParameters.url);
  connect(ActualParameters.url);
});

function connect(url) {
  if (url != null) {
    let obj: any;

    webSocket.ws = new WebSocket(url);

    webSocket.ws.onmessage = function(e) {
      obj = JSON.parse(e.data);
      message = obj.body ? obj.body.message : null;
      if (message) glob.execute(JSON.parse(message));
    };

    webSocket.ws.onopen = function() {
      if (PlayerDetails) {
        setTimeout(() => {
          if (ActualParameters.namesPlayers != null) {
            let listPlayers = ActualParameters.namesPlayers.split(",");
            sendMessageServer({
              action: "TURNO",
              player: listPlayers[0]
            });
          }
        }, 3000);
      }
    };

    webSocket.ws.onclose = function() {
      console.log("closed");
    };
  }
}

function sendMessageServer(texto) {
  console.log(texto);
  webSocket.ws.send(JSON.stringify(texto));
}

function getParametersFromUrl() {
  var newStr = location.href.substr(location.href.indexOf("?") + 1);
  console.log(newStr);
  var objParameters = {};
  newStr.split("&").map(function(item) {
    var pairs = item.split("=");

    objParameters[pairs[0]] = pairs[1];
  });
  ActualParameters = objParameters;
}
