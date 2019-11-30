// ANIMATION DOTS
var dots = setInterval(function () {
    var wait = document.getElementById("searching");
    if (wait.innerHTML.length > 24) {
        wait.innerHTML = "Buscando dispositivos";
    }
    else {
        wait.innerHTML += ".";
    }
}, 500);
//VARIABLES
var indexScroll = 0;
var indexServer = 0;
var isBtnReload = false;
var ActualParameters = {};
var gamestart = false;
var glob = new GlobalState();

var lenPlayers = 0
var numberPlayers = 0
var ready = [];
//SMARTV CONTROLLER ACTIONS
 $(document).ready(function () {
    
    //testflow()
}); 
/* $(document).keydown(function (e) {
    if (listAvaliableServers.length != 0) {
        console.log(e);
        switch (e.keyCode) {
            case 38:
                if (!isBtnReload) {
                    ChangeSelect(1);
                }
                break;
            case 37:
                isBtnReload = true;
                ChangeMode(false);
                break;
            case 39:
                isBtnReload = false;
                ChangeMode(true);
                break;
            case 40:
                if (!isBtnReload) {
                    ChangeSelect(-1);
                }
                break;
            case 13:
                if (!isBtnReload) {
                    entablishConnection(indexServer);
                }
                else {
                    location.reload();
                }
                break;
        }
    }
}); */
//TOGGLE RELOAD BUTTON
function ChangeMode(toggle) {
    if (toggle) {
        $("#server" + indexServer).addClass("Selected");
        $("#btnReload").removeClass("active");
    }
    else {
        $("#server" + indexServer).removeClass("Selected");
        $("#btnReload").addClass("active");
    }
}
//CHANGE INDEX SERVER FOUND
function ChangeSelect(value) {
    if (value == 1) {
        if (indexServer > 0) {
            $("#server" + indexServer).removeClass("Selected");
            $("#server" + (indexServer - 1)).addClass("Selected");
            indexServer = indexServer - 1;
            if (indexServer < indexScroll) {
                // alert(top)
                indexScroll -= 1;
                $("#list").scrollTop($("#server" + indexServer).offset().top - $("server0").offset().top);
            }
        }
    }
    else {
        if (indexServer < listAvaliableServers.length - 1) {
            $("#server" + indexServer).removeClass("Selected");
            $("#server" + (indexServer + 1)).addClass("Selected");
            indexServer = indexServer + 1;
            if (indexServer >= indexScroll + 3) {
                // alert($(`#server0`).offset().top)
                indexScroll += 1;
                $("#list").scrollTop($("#server" + (indexServer - 2)).offset().top -
                    $("#server0").offset().top);
            }
        }
    }
}
//ON FOUND SERVER
function found(url, indexElement) {
    clearInterval(dots);
    var listContainer = $("#list");
    $("#searching").remove();
    
    listContainer.addClass("listServers");
    var findIp = url.indexOf(':8080');
    var IpSelected = url[findIp - 2] == '.' ? url.substr(findIp - 1, 1) :
    url[findIp - 3] == '.' ? url.substr(findIp - 2, 2) :
    url[findIp - 4] == '.' ? url.substr(findIp - 3, 3) :
		'0'
    listContainer.append("<div onclick=\"onclickServer("+indexElement+");\"  id=\"server" + indexElement + "\" class=\"itemServer" + (indexElement == 0 ? " Selected" : "") + "\">\n      Sala " + IpSelected + "\n      </div>");
}

function onclickServer(value){
    ActualParameters.url = entablishConnection(value);
    connect(ActualParameters.url);
    sounds.drum.play(0,1,0.3)
    $("#screen1").css("display", "none");
    $("#screen2").css("display", "flex");
    $("#image1").css("display", "none");
    $("#image2").css("display", "flex");
    setStateListeners();
	var data=ActualParameters.url.substr(5,ActualParameters.url.length-11)
    var qr = qrcode(4, 'M');
    console.log("hola")
  	qr.addData(data);
	  qr.make();
	 var wd=$(window).height();
  	document.getElementById('token').innerHTML = qr.createImgTag(parseInt(wd/200),0);
}

//SCREEN2

var playersIcons = [
	'<div id="player1" class="itemPlayer"><div class="playerNumber">1</div><div class="avatar"><img class="user" src="../../assets/icons/user.png" /></div><div id="playerName1" class="playerName">Esperando...</div></div>',
	'<div id="player2" class="itemPlayer disabled"><div class="playerNumber">2</div><div class="avatar" style="background: rgb(171, 154, 31)"><img class="user" src="../../assets/icons/user.png" /></div><div id="playerName2" class="playerName">Esperando...</div></div>',
	'<div id="player3" class="itemPlayer disabled"><div class="playerNumber">3</div><div class="avatar" style="background: rgb(126, 34, 140)"><img class="user" src="../../assets/icons/user.png" /></div><div id="playerName3" class="playerName">Esperando...</div></div>',
	'<div id="player4" class="itemPlayer disabled"><div class="playerNumber">4</div><div class="avatar" style="background: rgb(140, 89, 34)"><img class="user" src="../../assets/icons/user.png" /></div><div id="playerName4" class="playerName">Esperando...</div></div>'
]

function setPlayers(valueCursor) {
	$("#messageWaiting").remove();
	$("#logo").remove();
    $("#titulo").css("display","block");
    sounds.drum.play(0,1,0.3)
	for (var i = 0; i < valueCursor; i++) {
		$("#playersContainer").append(playersIcons[i]);
		tasks.push(
			{name: ("Esperando al jugador #"+i), status:false},
		)
		ready.push(false)
	}
	tasks.push(
		{name: "Esperando la seleccion de modo de juego", status:false},
	)
	tasks.push(
		{name: "Esperando la seleccion del nivel de modo de juego", status:false},
	)
	numberPlayers = valueCursor
}

var listNames = []
var tasks=[]
function changeName(name) {
	if (lenPlayers < numberPlayers) {
		tasks[lenPlayers].status=true
		tasks[lenPlayers].name=name+" conectado"
		lenPlayers++;
		$('#playerName' + lenPlayers).text(name)
		$('#playerName' + lenPlayers).addClass("focus");
		listNames.push(name)
        $('#player' + lenPlayers).removeClass("disabled")
        sounds.drum.play(0,1.3,0.3)
		setReady(lenPlayers - 1)
	}
	console.log(tasks)
	sendMessageServer({
		action:"CONNECTION",
		name: tasks[lenPlayers-1].name
	})
}
var gameStarting = false;
var readyIndex = 0;

function setReady(index) {
	var toChange = ready[index]
	ready[index] = !toChange
	//alert('55')
	if (toChange) {
		$('#player' + (index + 1) + ' .avatar .user').attr('src', '../../assets/icons/user.png')
	} else {
		$('#player' + (index + 1) + ' .avatar .user').attr('src', '../../assets/icons/userReady.png')
	}
	readyIndex++;
	var noMoreReady = true;
	this.ready.map(function (itemReady) {
		if (!itemReady) {
			noMoreReady = false
		}
    })
    
	if (noMoreReady) {
		gameStarting = true
		//alert(1)
		var strNames = '';
		listNames.map(function (item) {
			strNames += ',' + item
		})
		console.log("holas");
		sendMessageServer({
			action:"ALLREADY"
		})
        ActualParameters.namesPlayers=listNames;
        ActualParameters.numberPlayers=numberPlayers;
        console.log(ActualParameters);
        setTimeout(function () {
            
			SetGameModeScreen();
		}, 1000)
        
		/*setTimeout(function () {
			location.replace(location.href.replace("SelectPlayers","GameMode")+"&namesPlayers="+strNames.substr(1)+"&numberPlayers="+numberPlayers)
			gameStarting = false
		}, 100)*/
	}
}

function setStateListeners(){
	glob.addState("LISTPLAYERS");
	glob.setCurrentState("LISTPLAYERS");
	glob.addListenertoState("LISTPLAYERS", "CANTIDAD", function (obj) {
		setPlayers(obj.value)
		glob.addListenertoState("LISTPLAYERS", "AGREGAR", function (obj) {
			changeName(obj.name)
		});
	});
}
function SetGameModeScreen(){
    sounds.drum.play(0,1,0.3)
    $("#screen2").css("display", "none");
    $("#screen3").css("display", "flex");
    $("#image2").css("display", "none");
    $("#image3").css("display", "flex");
    GameModeSetStateListeners();
}

function GameModeSetStateListeners(){
	glob.addState("GAMEMODE");
	glob.setCurrentState("GAMEMODE");
	glob.addListenertoState("GAMEMODE", "MODE", function (obj) {
        sounds.drum.play(0,1,0.3)
        console.log("xxx")
		sendMessageServer({
			action:"CONNECTION",
			name: "Modo "+(obj.mode=="points"?"puntos":"expansion")+" seleccionado"
        })
        $("#screen3").css("display", "none");
        if(obj.mode=="points"){
            
            $("#screen5").css("display", "flex");
        }else{
            $("#screen4").css("display", "flex");
        }
        GameValueSetStateListeners(obj.mode)
		//location.replace(location.href.replace("GameMode","Mode"+(obj.mode=="points"?"Points":"Expansion")))
		
	});
}

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
	}, 100)
}
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
		
		gameStarting = false
	}, 100) 

}
function GameValueSetStateListeners(mode){
        glob.addState("GAMEVALUE");
        glob.setCurrentState("GAMEVALUE");
        if(mode=="points"){
            glob.addListenertoState("GAMEVALUE", "VALUE", function (obj) {
                ActualParameters.gamemode="points";
                ActualParameters.gamevalue=obj.value
                sounds.drum.play(0,1.3,0.3)
                modificarPuntos(obj.value);
                setTimeout(function(){console.log(ActualParameters);
                    sounds.drum.play(0,1,0.3)
                    $("#screen4").css("display", "none");
                    $("#screen5").css("display", "none");
                    $("#image3").css("display", "none");
                   // $("#image4").css("display", "flex");
                    $("#contain").css("display", "flex");
                    gamestart=true
                    setup()},1000)
            });
        }else{
            glob.addListenertoState("GAMEVALUE", "VALUE", function (obj) {
                ActualParameters.gamemode="expansion";
                ActualParameters.gamevalue=obj.value
                sounds.drum.play(0,1.3,0.3)
                modificarExpansion(obj.value);
                console.log(ActualParameters);
                setTimeout(function(){
                    sounds.drum.play(0,1,0.3)
                    $("#screen4").css("display", "none");
                    $("#screen5").css("display", "none");

                    $("#image3").css("display", "none");
                    //$("#image4").css("display", "flex");
                    $("#contain").css("display", "flex");
                    gamestart=true
                    setup()
                },1000)
                    
                    
            });
        }
        //glob.printContent();
}
//TEST 
function testflow(){
    setTimeout(function(){
        availableServersToDiv("ws://192.168.0.6:8080")
        setTimeout(function(){
            onclickServer(0);
            setTimeout(function(){
                glob.execute({action:"CANTIDAD",value:2})
                setTimeout(function(){
                    glob.execute({action:"AGREGAR",name:"Jesus"})
                    setTimeout(function(){
                        glob.execute({action:"AGREGAR",name:"Raphael"})
                        
                        setTimeout(function(){
                             glob.execute({action:"MODE",mode:"expansion"})
                            setTimeout(function(){
                                glob.execute({action:"VALUE",value:8})
                            },2000) 
                        },2000)
                    },2000)
                },2000)
            },2000)
        },2000)
    },2000)
}

function testflow2(){
    setTimeout(function(){
        availableServersToDiv("ws://192.168.0.6:8080")
        setTimeout(function(){
            onclickServer(0);
            setTimeout(function(){
                glob.execute({action:"CANTIDAD",value:2})
                setTimeout(function(){
                    glob.execute({action:"AGREGAR",name:"Jesus"})
                    setTimeout(function(){
                        glob.execute({action:"AGREGAR",name:"Raphael"})
                        setTimeout(function(){
                            glob.execute({action:"MODE",mode:"points"})
                            setTimeout(function(){
                                glob.execute({action:"VALUE",value:3})
                            },500)
                        },1000)
                    },500)
                },500)
            },1000)
        },1000)
    },1000)
}