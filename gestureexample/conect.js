var webSocket = {};
var ActualParameters;
var cursors;
$(document).ready(function () {
    getParametersFromUrl();
    console.log(ActualParameters.url);
    connect(ActualParameters.url);
});
function connect(url) {
    if (url != null) {
        var obj;
        webSocket.ws = new WebSocket(url);
        webSocket.ws.onmessage = function (e) {
            obj = JSON.parse(e.data);
            message = obj.body ? obj.body.message : null;
            if (message)
                execute(message)
        };
        
        
    }
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




