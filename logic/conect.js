var webSocket = {};
var obj;
var glob = new GlobalState();
function connect(url) {
     /*webSocket.ws = new WebSocket(url);

    webSocket.ws.onmessage = function (e) {
        obj = JSON.parse(e.data);

        //divMessage = document.getElementById('listDisc');

        cursors = obj.body?obj.body.message:null;
        //console.log(cursors)
        if (cursors) update(cursors);

    };
    webSocket.ws.onopen= function(){
        var element = $("#loading")
        if(element) element.remove()
        if(PlayersDetails!=null){
            if(ActualParameters.namesPlayers!=null){
            var players = ActualParameters.namesPlayers.split(',')
            console.log(players)
        sendMessageServer({
            action:"TURNO",
            player: players[turnIndex]
        })
    }
    }
    }
    /*setTimeout(()=>{
      webSocket.ws.send('{"body":{"message":"aqui"}}')
    },2000)*/

    /*webSocket.ws.onclose = function () {
        //alert("closed")
    }; */

};

function sendMessageServer(texto) {
    console.log(texto)
   // webSocket.ws.send(JSON.stringify(texto));

}

function getParameterByName(name) {
    return location.search.substr(location.search.indexOf(name) + name.length + 1)
}
var ActualParameters;

function getParametersFromUrl() {
    var newStr = location.href.substr(location.href.indexOf('?') + 1)
    console.log(newStr)
    var objParameters = {};
    newStr.split('&').map(function (item) {
        var pairs = item.split('=')

        objParameters[pairs[0]] = pairs[1]
    })
    ActualParameters = objParameters
}
$(document).ready(function () {
    getParametersFromUrl()
    //console.log(SendMessages)
    //elementTest(1)

    console.log(ActualParameters.url);

    connect(ActualParameters.url);
});

var cursors;

function parseUrl(url, path, parameters) {
    var index = url.indexOf('?')
    var local = url.indexOf('inkatan')
    var urlParam = '';
    if (parameters.length == 0) {
        urlParam = ''
    } else {
        parameters.map(function (item) {
            urlParam +=
                '&' + (item.name) + '=' + (item.value)

        })
    }
    //alert(urlParam)
    return path + "/index.html" + url.substr(index) + urlParam
}

function goToScreen(path, parameters) {
    location.replace(parseUrl(location.href, path,
        parameters))
}

function update(cursor) {
    glob.execute(JSON.parse(cursor))
    //alert(1)
    /*if (typeof (cursor) == "string") {
        var obj
        console.log(cursor)
        switch (true) {
            case cursor === 'two':
                setPlayers(2);
                break;
            case cursor === 'four':
                setPlayers(4);
                break;
            case cursor.indexOf("add") != -1:
                obj = JSON.parse(cursor)
                Add(obj);
                break;
            case cursor === 'expand':
                    sendMessageServer({
                        action:"CONNECTION",
                        name: "Modo expansion seleccionado"
                    })
                location.replace(parseUrl(location.href, "/ModeExpansion",
                    []))
                break;
            case cursor === 'points':
                    sendMessageServer({
                        action:"CONNECTION",
                        name: "Modo puntos seleccionado"
                    })
                location.replace(parseUrl(location.href, "/ModePoints",
                    []))
                break;
            case cursor.indexOf("dice") != -1:
                    obj = JSON.parse(cursor)
                ThrowDice(obj)
                break;
            case cursor.indexOf("Card") != -1:
                obj = JSON.parse(cursor)
                console.log("aqui")
                callCard(obj.action, obj.player)
                break;
            case cursor.indexOf("PUERTO") != -1:
                obj = JSON.parse(cursor)
                IsPort( obj.player)
                break;
            case cursor.indexOf("INTERCAMBIOPUERTO") != -1:
                obj = JSON.parse(cursor)
                ExchangeOut(obj)
                break;
            case cursor.indexOf("build") != -1:
                obj = JSON.parse(cursor)
                SetBuildMode({player:obj.player, type:obj.tipo,amount:1})
                break;
            case cursor.indexOf("CancelBuild") != -1:
                    //obj = JSON.parse(cursor)
                    CancelBuild()
                    break;
            case cursor.indexOf("PlayerName") != -1:
                obj = JSON.parse(cursor)
                changeName(obj.PlayerName)
                break;
            case cursor.indexOf("valueExpansion") != -1:
                obj = JSON.parse(cursor)
                try {
                    modificarPuntos(obj.valueExpansion)
                } catch (error) {

                }
                try {
                    modificarExpansion(obj.valueExpansion)
                } catch (error) {

                }

                break;
            case cursor == "pass":

                PaseTurno();
                break;
        }

        if (cursor == "start") {

        } else if (cursor.indexOf("move") != -1) {
            obj = JSON.parse(cursor)
            Move(obj)
            //break;
        } else if (cursor.indexOf("name")) {
            changeName(cursor.substr(5))
        } else if (cursor == "expansion") {
            sendMessageServer({
                action:"CONNECTION",
                name: "Modo expansion seleccionado"
            })
            location.replace(parseUrl(location.href, "ModeExpansion/",
                []))

        } else if (cursor == "puntos") {
            sendMessageServer({
                action:"CONNECTION",
                name: "Modo puntos seleccionado"
            })
            location.replace(parseUrl(location.href, "ModePoints/",
                []))
        } 

        //console.log(cursor)
    }
*/
}

