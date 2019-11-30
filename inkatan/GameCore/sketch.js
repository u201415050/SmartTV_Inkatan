console.log("HI")
var widthCanvas = $(window).width();
var heightCanvas = $(window).height();
var font;
var colorsPointer = ['rgba(9, 82, 9,0.7)', 'rgba(171, 154, 31,0.7)', 'rgba(126, 34, 140,0.7)', 'rgba(140, 89, 34,0.7)']
var colorsPointerTotal = ['rgba(9, 82, 9,1)', 'rgba(171, 154, 31,1)', 'rgba(126, 34, 140,1)', 'rgba(140, 89, 34,1)']
var colorsPointerOpacity = ['rgba(9, 82, 9,0.4)', 'rgba(171, 154, 31,0.4)', 'rgba(126, 34, 140,0.4)', 'rgba(140, 89, 34,0.4)']
var colorsPointerLight =['rgba(140, 200, 140,1)', 'rgba(220, 210, 170,1)', 'rgba(210, 140, 230,1)', 'rgba(220, 170, 150,1)']
var activeTurn = true
var mapDelimit = widthCanvas * 0.72
var paddingLeft = widthCanvas * 0.28 / 2
var centerMapH = heightCanvas / 2
var radio = mapDelimit / 12
var paddingHeight = centerMapH - (radio * 5*0.68 )
var dices = [];
var mapa = Mapa()
var game = Game()
var dice = Dice()
var longRoad=''
var mapPlayers = {}
var PlayersDetails = []
var cards = Cards()
var modal = Modal()
var backImage;
var bloque;
var houseBloque;
var bloquePuerto;
var camino;
var camino2;
var caminos;
var camino_b;
var casas;
var bloqueActivo;
var userIcon;
var userActiveIcon;
var dado = true;
var gamestarted=false;
var desierto;
var spritDice;
var userDisabled;
var mostrarAsignacion =false;
var asignaciones = [{"name":"Jesus","resource":[{"name":"stone","amount":1}]},{"name":"Raphael","resource":[{"name":"stone","amount":1},{"name":"stone","amount":1},{"name":"stone","amount":1}]}];
var asignacionesContador = 0;
var sounds = {}
var winneras = {}

// PRELOAD IMAGES
 function preload() {
    mapa.preload()
    mapa.resources.preload()
    backImage=loadImage('./inkatan/GameCore/assets/background.jpg');
    bloque=loadImage('./inkatan/GameCore/assets/bloque.png');
    bloquePuerto=loadImage('./inkatan/GameCore/assets/bloquePuerto.png');
    houseBloque=loadImage('./inkatan/GameCore/assets/houses/1.png');
    spritDice = [loadImage('./inkatan/GameCore/assets/dices/sprite1.png'),
    loadImage('./inkatan/GameCore/assets/dices/sprite2.png'),
    loadImage('./inkatan/GameCore/assets/dices/sprite3.png'),
    loadImage('./inkatan/GameCore/assets/dices/sprite2.png')]
    dices=[loadImage('./inkatan/GameCore/assets/dices/dice1.png'),
    loadImage('./inkatan/GameCore/assets/dices/dice2.png'),
    loadImage('./inkatan/GameCore/assets/dices/dice3.png'),
    loadImage('./inkatan/GameCore/assets/dices/dice4.png'),
    loadImage('./inkatan/GameCore/assets/dices/dice5.png'),
    loadImage('./inkatan/GameCore/assets/dices/dice6.png')];
    winneras.frame = loadImage('./inkatan/GameCore/assets/winner/frame.png')
    winneras.knight = loadImage('./inkatan/GameCore/assets/runa/winner.png')
    casas = [
        {a:loadImage('./inkatan/GameCore/assets/casas/1a.png'),b:loadImage('./inkatan/GameCore/assets/casas/1b.png')},
        {a:loadImage('./inkatan/GameCore/assets/casas/2a.png'),b:loadImage('./inkatan/GameCore/assets/casas/2b.png')},
        {a:loadImage('./inkatan/GameCore/assets/casas/3a.png'),b:loadImage('./inkatan/GameCore/assets/casas/3b.png')},
        {a:loadImage('./inkatan/GameCore/assets/casas/4a.png'),b:loadImage('./inkatan/GameCore/assets/casas/4b.png')},
    ]
    desierto=loadImage('./inkatan/GameCore/assets/dessert/desierto.png')
    caminos = [
        {left: loadImage('./inkatan/GameCore/assets/caminos/1a.png'),right:loadImage('./inkatan/GameCore/assets/caminos/1b.png')},
        {left: loadImage('./inkatan/GameCore/assets/caminos/2a.png'),right:loadImage('./inkatan/GameCore/assets/caminos/2b.png')},
        {left: loadImage('./inkatan/GameCore/assets/caminos/3a.png'),right:loadImage('./inkatan/GameCore/assets/caminos/3b.png')},
        {left: loadImage('./inkatan/GameCore/assets/caminos/4a.png'),right:loadImage('./inkatan/GameCore/assets/caminos/4b.png')},
    ]
    
    caminos_b = [
        {left: loadImage('./inkatan/GameCore/assets/caminos_b/1a.png'),right:loadImage('./inkatan/GameCore/assets/caminos_b/1b.png')},
        {left: loadImage('./inkatan/GameCore/assets/caminos_b/2a.png'),right:loadImage('./inkatan/GameCore/assets/caminos_b/2b.png')},
        {left: loadImage('./inkatan/GameCore/assets/caminos_b/3a.png'),right:loadImage('./inkatan/GameCore/assets/caminos_b/3b.png')},
        {left: loadImage('./inkatan/GameCore/assets/caminos_b/4a.png'),right:loadImage('./inkatan/GameCore/assets/caminos_b/4b.png')},
    ]
    bloqueActivo=loadImage('./inkatan/GameCore/assets/bloqueActivo.png');
    userIcon=loadImage('./inkatan/GameCore/assets/user.png');
    userDisabled=loadImage('./inkatan/GameCore/assets/userDisabled.png');
    userActiveIcon=loadImage('./inkatan/GameCore/assets/userReady.png');
    font = loadFont('./inkatan/GameCore/font.otf');
    sounds["background"]=loadSound('./inkatan/GameCore/sounds/background.mp3');
}

//CALL CARD
 function callCard(typeCard, playerCard) {
    cards.action(typeCard, mapPlayers[playerCard])
}  
//SETUP MAP AND PLAYERS
function setup() {
    sounds["drum"]=loadSound('./inkatan/GameCore/sounds/drum.mp3');
    
    if(gamestart){
    console.log("HERE");
    createCanvas(widthCanvas, heightCanvas);
    //canvas.parent('#canvas')
    frameRate(1000);
    background(100, 180, 100)
    mapa.setup()
    setPlayer() 
    GamesetStateListeners();
    textFont(font)
    console.log("finish");
    gamestarted=true;
    sounds["dices"]=loadSound('./inkatan/GameCore/sounds/dices.mp3');
    sounds["build"]=loadSound('./inkatan/GameCore/sounds/build.mp3');
    sounds["shout"]=loadSound('./inkatan/GameCore/sounds/shout.mp3');
    sounds["select"]=loadSound('./inkatan/GameCore/sounds/select.mp3');

    
}else{
    print("start");
    setTimeout(function(){

        sounds.background.loop(0,1,0.4);
    },1000)
}
}

//DRAW
function draw() {
    if(gamestarted){
    background(100, 180, 100)
    image(backImage, 0, 0, widthCanvas, heightCanvas)
     mapa.printAll()
    //mapa.printObjects(PlayersDetails)
    game.Game(mapa, PlayersDetails)
    //showPointer()
    playersInformation();
    modal.draw()
}
    //menu()
   // text(frameCount, 10, 10); 
}

//SHOW MAP POINTER
function showPointer(index) {
    switch (mapa.select) {
        case 'vertice':
            //print(parseInt(PlayersDetails[turnIndex].indicators.vertice.fi/2))
            //print(index)
            if(PlayersDetails[turnIndex].indicators.vertice.fi==index)
            mapa.printPoint(PlayersDetails[turnIndex].indicators.vertice.fi,
                PlayersDetails[turnIndex].indicators.vertice.fj)
                
            break;
        case 'arista':
            if(PlayersDetails[turnIndex].indicators.arista.fi==index)
            mapa.printArista(PlayersDetails[turnIndex].indicators.arista.fi,
                PlayersDetails[turnIndex].indicators.arista.fj)
            break
        case 'rombo':
            mapa.printRombo(PlayersDetails[turnIndex].indicators.rombo.fi,
                PlayersDetails[turnIndex].indicators.rombo.fj)
            break
    }
}

//TEST ACTIONS
function keyPressed() {
    console.log(key);
    if (keyCode === DOWN_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'down')
    } else if (keyCode === UP_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'up')
    } else if (keyCode === RIGHT_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'right')
    } else if (keyCode === LEFT_ARROW) {
        mapa.move(PlayersDetails[turnIndex], 'left')
    } else if (keyCode === 32) {
        mapa.addObject(PlayersDetails[turnIndex])
    } else if (key === 'q') {
        mapa.changeSelect()
    } else if (key === 'd') {
        
        if(dado){
           dice.throwDice() 
           dado=false
        }
        
    } else if (key === 'c') {
        //alert(turnIndex)
        cards.action(card_names.TUCUY, turnIndex)
    }
    else if (key === 'a') {
        //alert(turnIndex)
        GetLongRoad()
    } else if (key === 'p') {
        //alert(turnIndex)
        IsPort(0)
    }else if (key === 'y') {
        //alert(turnIndex)
        PaseTurno()
    }else if (key === 'b') {
        //alert(turnIndex)
        SetBuildMode({
            player:PlayersDetails[0].name,
            type:'h',
            amount:1
        })
        
    }
    else if (key === 't') {
        //alert(turnIndex)
        SetBuildMode({
            player:PlayersDetails[0].name,
            type:'t',
            amount:1
        })
        
    }
}
function SetBuildMode(data){
    console.log(data)
    if(data.type=='h'||data.type=='t'){
    glob.setCurrentState("BUILD");
    game.data={
        player:mapPlayers[data.player],
        type: data.type,
        previous:PlayersDetails[mapPlayers[data.player]][data.type=='h'?'houses':'ways'].length,
        amount: data.amount
    }
    
    game.ChangeStatus('BUILD')
    //alert(data.type=='h'? "vertice": 'arista')
    mapa.select=data.type=='h'||data.type=='i'? "vertice": 'arista'
    console.log(game)
}
}
//CALL MOVE FUNCTIONS
function Move(val) {
    if(val.player==PlayersDetails[turnIndex].name){
        mapa.move(PlayersDetails[turnIndex], val.direction)
    }
    
}

//DICE ACTION
function ThrowDice(obj) {
    if(obj.player==PlayersDetails[turnIndex].name){
        dice.throwDice()
    }
}

//ADD AN OBJECT
function Add(obj) {
    if(obj.player==PlayersDetails[turnIndex].name){
    mapa.addObject(PlayersDetails[turnIndex])
    }
}

//CONFIGURE PLAYERS
function setPlayer() {
    var players = ActualParameters.namesPlayers
    console.log(players);
    players.map(function (player, i) {
        var specialcards={}
        Entries(card_names).map(function(name){
            specialcards[name[1]]=0
        })
        mapPlayers[player] = i
        PlayersDetails.push({
            id:i,
            name: player,
            colorTotal: colorsPointerTotal[i],
            color: colorsPointer[i],
            colorOpacity: colorsPointerOpacity[i],
            colorLight:colorsPointerLight[i],
            houses: [],
            ways: [],
            avatar: i==0?{posx:widthCanvas*0.1,posy:heightCanvas*0.1}
            :i==1?{posx:widthCanvas*0.1,posy:heightCanvas*0.9}
            :i==2?{posx:widthCanvas*0.9,posy:heightCanvas*0.1}
            :{posx:widthCanvas*0.9,posy:heightCanvas*0.9},
            resources: {
                stone: 0,
                wool: 0,
                potato: 0,
                quinoa: 0,
                gold: 0,
                wood: 0,
            },
            indicators: {
                vertice: positionsVertice[i],
                arista: positionsAristas[i],
                rombo: {
                    fi: 0,
                    fj: 0
                }
            },
            specialcards,
            longRoad: 0,
            points:0,
            expansion:0
        })
    })
    console.log(PlayersDetails)
}

function Struct(){
    return {
        start:[],
        end:[]
    }
}
function GetLongRoadPlayer(index){
    var listWays = PlayersDetails[index].ways;
    var treeWays = listWays.map(function(){return Struct()})
    var visited =  listWays.map(function(){return false})
    
    for(var i=0; i<listWays.length;i++){
        for(var j=i; j<listWays.length;j++){
            if(j!=i){
                if(listWays[i].start.id==listWays[j].start.id || listWays[i].start.id==listWays[j].end.id){
                    if(listWays[i].start.id==listWays[j].start.id){
                        treeWays[j].start.push(i)
                    }else{
                        treeWays[j].end.push(i)
                    }
                    treeWays[i].start.push(j)
                    
                }else if(listWays[i].end.id==listWays[j].start.id || listWays[i].end.id==listWays[j].end.id){
                    if(listWays[i].end.id==listWays[j].start.id){
                        treeWays[j].start.push(i)
                    }else{
                        treeWays[j].end.push(i)
                    }
                    treeWays[i].end.push(j)
                    
                }
            }
        }
    }
    var posibleInit=treeWays.filter(function(item,i){
            return item.start.length==0||item.end.length==0
        }).map(function(item,i){
        return i;
    })
    var lastVal=0
    var response =0
    for (var i = 0; i < posibleInit.length; i++) {
        var init = posibleInit[i]
        if(!visited[i]){
            response= DFS(init, visited,treeWays,0,-1)
            if(lastVal<response){
                lastVal=response
            }
        }
    }
    //var init = 0
    //while(!visited.includes(false)){
       /* treeWays= [
            {end:[1], start:[]},
            {end:[2,4], start:[0]},
            {end:[2,4], start:[1]},
            {end:[], start:[]},
            {end:[], start:[]},
            {end:[], start:[]},
        ]*/
      //visited[init]
    //}
    
    return response
}

function DFS(index, visited, treeWays, cant,source){
    if(visited[index]) return cant;
    visited[index]=true
    var total =  cant+1;
    var canEnd=true
    var canStart=true
    var nextEnd = treeWays[index].end
    for(var i=0;i<nextEnd.length;i++){
        if(nextEnd[i]==source){
            canEnd=false
        }
    }
    var nextStart = treeWays[index].start
    for(var i=0;i<nextStart.length;i++){
        if(nextStart[i]==source){
            canStart=false
        }
    }
    if(nextEnd.length==0 && nextStart.length==0){
        return total;
    }else{
        var temp=total;  
        if(canEnd){
            //console.log("end")
            for(var i=0;i<nextEnd.length;i++){
                var value = DFS(nextEnd[i],visited,treeWays,total,index)
                if(value>temp){
                    temp=value
                }
            }
        }
        if(canStart){
            //console.log("start")
            for(var i=0;i<nextStart.length;i++){
                var value = DFS(nextStart[i],visited,treeWays,total,index)
                if(value>temp){
                    temp=value
                }
            }
        }
        return temp;
       
    }
}

function ProcessLongRoad(){
    var ext = 0;
    var playerLong = '';
    for (var i = 0; i < PlayersDetails.length; i++) {
        if(ext<PlayersDetails[i].longRoad && PlayersDetails[i].longRoad>=4){
            ext=PlayersDetails[i].longRoad
            playerLong= i
        }
    }
    console.log("LONGROAD",longRoad,ext,playerLong)
    if(longRoad!=''){
        if(longRoad.dist<ext){
            if(longRoad.player!=playerLong){
                console.log("one")
                //alert(PlayersDetails[longRoad.player].name+" quitar carta")
                /*SpecialCardsController([{
                    name: PlayersDetails[longRoad.player].name,
                    specialcards:[
                        {name: card_names.LONGROUTE, amount: -1}
                    ]
                }])*/
                sendMessageServer({
                player: PlayersDetails[longRoad.player].name,
                action: "specialCard",
                amount:-1
            })
            console.log("two")
            /*alert(PlayersDetails[playerLong].name+" dar carta")
            SpecialCardsController([{
                name: PlayersDetails[playerLong].name,
                specialcards:[
                    {name: card_names.LONGROUTE, amount: 1}
                ]
            }])*/
            sendMessageServer({
                player: PlayersDetails[playerLong].name,
                action: "specialCard",
                amount:1
            })
            }
            
            longRoad.dist=ext;
            longRoad.player=playerLong;
            
            console.log(longRoad)
        }
    }else{
        if(4<=ext){
            console.log("three")
            /*SpecialCardsController([{
                name: PlayersDetails[playerLong].name,
                specialcards:[
                    {name: card_names.LONGROUTE, amount: 1}
                ]
            }])*/
            sendMessageServer({
                player: PlayersDetails[playerLong].name,
                action:"specialCard",
                amount: 1,
            })
            longRoad={}
           // alert(PlayersDetails[playerLong].name+" dar carta")
            longRoad.dist=ext;
            longRoad.player=playerLong;
            console.log(longRoad)
        }
    }
}

function IsPort(playerName){
    
    var player = mapPlayers[playerName]
    var ports= []
    for (var i = 0; i < PlayersDetails[player].houses.length; i++) {
        portos.map(function(item){
            if(PlayersDetails[player].houses[i].id==item.fi+'-'+item.fj){
                ports.push(item.resource)
            }
        })
    } 
    setTimeout(function(){
        sendMessageServer({action:"PUERTO",puertos:ports, player:PlayersDetails[player].name})
    },1000);
    
}
function ExchangeOut(data){
    
    var value = {
        player: data.player,
        resource:[{
            name: data.input,
            amount: -1*data.cantidad,
        },{
            name: data.output,
            amount: 1,
        }]
    }
    modal.showUp(data.player+" intercambio "+ data.cantidad+ " de "+(mapa.resources.translation[data.input])+" por "+ 1+ " de "+(mapa.resources.translation[data.output]), 2);
            
    ResourcesController([value],false)
}
function ResourcesController(data,send){ //[{name,list}]
    for (var i = 0; i < data.length; i++) {
        var name = data[i].name
        var resource = data[i].resource
        console.log(data)
        for (var j = 0; j < resource.length; j++) {
            console.log(resource)
            PlayersDetails[mapPlayers[name]].resources[resource[j].name] =
            PlayersDetails[mapPlayers[name]].resources[resource[j].name]+resource[j].amount
        }

        var message = {
            player: name,
            action:'resources',
            resource:resource
        }
        if(send){
            sendMessageServer(message)
        }
    }
}
function SpecialCardsController(data){ //[{name,list}]
    for (var i = 0; i < data.length; i++) {
        
        var name = data[i].name
        var specialcards = data[i].specialcards
        for (var j = 0; j < specialcards.length; j++) {
            PlayersDetails[mapPlayers[name]].specialcards[specialcards[i].name] =
            PlayersDetails[mapPlayers[name]].specialcards[specialcards[i].name]+specialcards[i].amount
        }

        var message = {
            player: name,
            action:'specialcards',
            specialcards:specialcards
        }
        sendMessageServer(message)
    }
    console.log(PlayersDetails)
}
function KnightController(data){ //{name}
    
    var message = {
        player: data.name,
        action: "knight"
    }
    sendMessageServer(message)
    game.ChangeStatus('KNIGHT')
    glob.setCurrentState("BUILD");
    PlayersDetails[mapPlayers[data.name]].indicators.rombo.fi = mapa.knight.iIndex
    PlayersDetails[mapPlayers[data.name]].indicators.rombo.fj = mapa.knight.jIndex
}
function CancelBuild(){
    game.data={}
    game.ChangeStatus('ROUND')
    glob.setCurrentState("TURN");
    //alert(data.type=='h'? "vertice": 'arista')
    mapa.select=''
}

function GamesetStateListeners(){
    
    glob.addState("FIRSTROUND");
    glob.addState("TURN");
    glob.addState("BUILD");
    glob.addState("KNIGHT");
    glob.addState("ANIMATION");
    glob.setCurrentState("FIRSTROUND");
    //FIRSTURN
	glob.addListenertoState("FIRSTROUND", "MOVE", function (obj) {
		Move(obj)
    });
    glob.addListenertoState("FIRSTROUND", "BUILD", function (obj) {
		Add(obj)
    });
    //TURN
    glob.addListenertoState("TURN", "DICE", function (obj) {
        if(dado){
          ThrowDice(obj)  
          dado=false;
        } 
    });
    glob.addListenertoState("TURN", "BUILD", function (obj) {
        obj.amount=1
		SetBuildMode(obj)
    });
    glob.addListenertoState("TURN", "TURNO", function (obj) {
        if(obj.player==PlayersDetails[turnIndex].name){
            PaseTurno()
        }
    });
    glob.addListenertoState("TURN", "PUERTO", function (obj) {
		IsPort(obj.player)
    });
    glob.addListenertoState("TURN", "INTERCAMBIO", function (obj) {
		ExchangeOut(obj)
    });
    glob.addListenertoState("TURN", "SPECIALCARD", function (obj) {
        print("hola")
		callCard(obj.type,obj.player)
    });
    //BUILD
    
	glob.addListenertoState("BUILD", "MOVE", function (obj) {
		Move(obj)
    });
    glob.addListenertoState("BUILD", "BUILD", function (obj) {
		Add(obj)
    });
    glob.addListenertoState("BUILD", "CANCELBUILD", function (obj) {
		CancelBuild()
    });
    
}

function playersInformation(){
    //console.log(widthCanvas)
    push() 
    noStroke()
    ellipseMode(CORNER)
    var scale = widthCanvas*0.0008
    var coords = [
        {posx:scale*20,posy:scale*20},
        {posx:scale*20,posy:heightCanvas-(scale*100)},
        {posx:widthCanvas,posy:scale*20},
        {posx:widthCanvas,posy:heightCanvas-(scale*100)},
    ]
    
    textSize(scale*22);
    for (var i = 0; i < PlayersDetails.length; i++) {
        imageMode(CORNER)
        push()
        //if(i!=turnIndex)
        //tint(255, 127);

        fill(i!=turnIndex?PlayersDetails[i].colorLight: PlayersDetails[i].colorTotal);
        noStroke()
        var posx =coords[i].posx
        var posy =coords[i].posy
        var name = PlayersDetails[i].name;
        name = name.length>8?name.substr(0,7)+"...":name;
        if(i>1){
            rect(posx-(scale*225),posy+(scale*18),(scale*130),(scale*44),scale*5)
            ellipse(posx-(scale*107), posy-(scale*7), scale*94)
            ellipse(posx-(scale*107), posy-(scale*7), scale*94)

            image(turnIndex==i?userActiveIcon: userDisabled,posx-(scale*100),posy,scale*80,scale*80);
            textAlign(CENTER, CENTER);
            fill('white');
            text(name, posx-(scale*163),posy+(scale*37))
            if (ActualParameters.gamemode=='expansion') {
                text((PlayersDetails[i].expansion.toFixed(1))+"/"+ActualParameters.gamevalue+ "%", posx-(scale*163),posy+(scale*37)+((i%2==0?1:-1.1)*scale*36))
            }else{
                text(PlayersDetails[i].points+"/"+ActualParameters.gamevalue+ " puntos", posx-(scale*163),posy+(scale*37)+((i%2==0?1:-1.1)*scale*36))
            }
            textAlign(LEFT, CORNER);
            if(mostrarAsignacion){
                for (var j = 0; j < asignaciones[i].resource.length; j++) {
                    imageMode(CENTER)
                    image((mapa.resources.assets[asignaciones[i].resource[j].name].icon),posx+scale*30-(scale*100),posy-(asignaciones[i].resource[j].name=="wool"?0:scale*7)+(scale*28*j)+(i%2==0?(scale*110):-(scale*10+scale*20*asignaciones[i].resource.length)),asignaciones[i].resource[j].name=="quinoa"?scale*20:scale*28,scale*28)
                    text(("x"+asignaciones[i].resource[j].amount),posx+scale*50-(scale*100),posy+(scale*28*j)+(i%2==0?(scale*110):-(scale*10+scale*20*asignaciones[i].resource.length)));
                    //text((mapa.resources.translation[asignaciones[i].resource[j].name]+" x"+asignaciones[i].resource[j].amount),posx-(scale*100),posy+(scale*20*j)+(i%2==0?(scale*110):-(scale*10+scale*15*asignaciones[i].resource.length)));
                }
                
            }
            
            
        }else{
            rect(posx+(scale*75),posy+(scale*18),(scale*130),(scale*44),(scale*5))
            ellipse(posx-(scale*7), posy-(scale*7), (scale*94))
            image(turnIndex==i?userActiveIcon: userDisabled,posx,posy,(scale*80),(scale*80));
            fill('white');
            
            textAlign(CENTER, CENTER);
            
            text(name, posx+(scale*140),posy+(scale*37))
            if (ActualParameters.gamemode=='expansion') {
                text(PlayersDetails[i].expansion.toFixed(1)+"/"+ActualParameters.gamevalue+ "%", posx+(scale*140),posy+(scale*37)+((i%2==0?1:-1.1)*scale*36))
            }else{
                text(PlayersDetails[i].points+"/"+ActualParameters.gamevalue+ " puntos", posx+(scale*140),posy+(scale*37)+((i%2==0?1:-1.1)*scale*36))
            }
            textAlign(LEFT, CORNER);
            if(mostrarAsignacion){
                
                for (var j = 0; j < asignaciones[i].resource.length; j++) {
                    //str+=(mapa.resources.translation[asignaciones[i].resource[j].name]+" x"+asignaciones[i].resource[j].amount+"\n")
                    imageMode(CENTER)
                    image((mapa.resources.assets[asignaciones[i].resource[j].name].icon),posx+scale*30,posy-(asignaciones[i].resource[j].name=="wool"?0:scale*7)+(scale*28*j)+(i%2==0?(scale*110):-(scale*10+scale*20*asignaciones[i].resource.length)),asignaciones[i].resource[j].name=="quinoa"?scale*20:scale*28,scale*28)
                    text(("x"+asignaciones[i].resource[j].amount),posx+scale*50,posy+(scale*28*j)+(i%2==0?(scale*110):-(scale*10+scale*20*asignaciones[i].resource.length)));
                }
                
                //text(str,posx,posy+(i%2==0?(scale*110):-(scale*10+scale*15*asignaciones[i].resource.length)));
            }
            
            
        }
        pop()
    }
    pop()
}



