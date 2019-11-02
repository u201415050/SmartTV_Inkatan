function Resources() {
    return {
        resources: [{
            type: 'stone',
            name: 'piedra',
            color: 'rgba(145, 139, 139,0.5)',
            cant: 8,
            icon: null,
            size:{w:438,h:381}
            
        }, {
            type: 'wool',
            name: 'lana',
            color: 'rgba(200, 150, 100,0.5)',
            cant: 8,
            icon: null,
            size:{w:387,h:411}
        }, {
            type: 'potato',
            name: 'papa',
            color: 'rgba(155, 115, 27,0.5)',
            cant: 8,
            icon: null,
            size:{w:523,h:423}
        }, {
            type: 'quinoa',
            name: 'quinua',
            color: 'rgba(100, 100, 27,0.5)',
            cant: 8,
            icon: null,
            size:{w:330,h:558}
        }, {
            type: 'gold',
            name: 'oro',
            color: 'rgba(255, 226, 12,0.3)',
            cant: 8,
            icon: null,
            size:{w:507,h:381}
        }, {
            type: 'wood',
            name: 'madera',
            color: 'rgba(81, 53, 0,0.6)',
            cant: 8,
            icon: null,
            size:{w:429,h:381}
        }],
        translation:{
            "wood":"madera",
            "gold":"oro",
            "quinoa":"quinua",
            "potato":"papa",
            "wool":"lana",
            "stone":"piedra",
        },
        assets:{},
        knight: true,
        dessert: null,
        preload: function () {
            for (var index = 0; index < this.resources.length; index++) {
                this.resources[index].icon = loadImage('./inkatan/GameCore/assets/' + this.resources[index].type + '.png');
                this.assets[this.resources[index].type]=this.resources[index]
            }
            console.log(this.assets)
            this.dessert = loadImage('./inkatan/GameCore/assets/dessert.png');
        },
        getRandom: function () {
            if (this.resources.length > 0) {
                var index = Math.floor(Math.random() * 100) % this.resources.length
                if (this.knight) {
                    var extra = Math.floor(Math.random() * 30)

                    if (extra == 1) {
                        this.knight = false
                        return {
                            type: 'dessert',
                            name: 'desierto',
                            color: 'rgba(0,0,0,0.3)',
                            cant: 0,
                            icon: this.dessert
                        }
                    }
                }

                var ranResource = this.resources[index]
                this.resources[index].cant = this.resources[index].cant - 1
                if (this.resources[index].cant == 0) {
                    this.resources = this.resources.filter(function (res, factor) {
                        return factor != index
                    })

                }
                return ranResource;
            } else {
                return {
                    type: 'dessert',
                    name: 'desierto',
                    color: 'rgba(0,0,0,0.3)',
                    cant: 0,
                    icon: this.dessert
                }
            }
        }
    }
}
function Modal(){
    return{
        message:'',
        status: false,
        statusCenter:false,
        duration:0,
        durationCenter:0,
        counter:0,
        up:false,
        queue:[],
        messageCenter: '',
        positive:true,
        winner:false,
        show: function(message,duration,winner){

            if(!this.statusCenter){
                this.messageCenter=message
                this.durationCenter=duration
                this.statusCenter=true
                this.up=false;
                this.winner=winner;
                var that = this
                setTimeout(function(){
                   
                    that.statusCenter=false
                },this.durationCenter*1000)
            }
        },
        showUp: function(message,duration){
            
            if(!this.status){
                this.message=message
                this.duration=duration
                this.status=true
                this.up=true;
                var that = this
                this.positive=true
                
                setTimeout(function(){
                    that.positive=false
                    
                },duration*500)
                setTimeout(function(){
                   
                    that.status=false
                    if(that.queue.length>0){
                        var next = that.queue.shift();
                        that.showUp(next.message,next.duration)
                    }
                },duration*1000)
            }else{
                this.queue.push({message,duration});
            }
        },
        draw: function(){
            //if(this.up){
                this.drawUp()
            //}else{
                this.drawCenter();
            //}
        },
        drawCenter: function(){
            if(this.statusCenter){
                
                push()

                rectMode(CENTER)
                fill("rgba(0,0,0,0.4 )")
                rect(widthCanvas/2,heightCanvas/2,widthCanvas,heightCanvas)
                textAlign(CENTER,CENTER)
                noStroke();
                fill('white')
                rect(widthCanvas/2,heightCanvas/2,widthCanvas*0.4, heightCanvas*0.25,heightCanvas*0.03 )
                strokeWeight(1)
                textSize(radio*0.43)
                fill('black')
                noStroke()
                text(this.messageCenter,widthCanvas/2+(this.winner?widthCanvas*0.05:0),heightCanvas*0.98/2,(this.winner?widthCanvas*0.2:widthCanvas*0.35),heightCanvas*0.2)
                if(this.winner){
                    imageMode(CENTER)
                    image(mapa.images.knight, widthCanvas*0.37,heightCanvas*0.98/2, radio * 0.6158*2.1, radio*2.1);
                }
                pop()
            }
        },
        drawUp: function(){
            if(this.status){
                
                
                if(this.counter>0.4 && !this.positive){
                
                    this.counter-=0.4;
                }else if(this.positive){
                    this.counter+=0.4;
                }
                
                push()

                rectMode(CENTER)
                
                textAlign(CENTER,CENTER)
                stroke("white")
                fill('rgba(255,255,255,'+this.counter/(this.duration)+')')
                rect(widthCanvas/2,heightCanvas*0.10,widthCanvas*0.25, heightCanvas*0.15,heightCanvas*0.03 )
                strokeWeight(0.5)
                textSize(radio*0.34)
                fill('rgba(0,0,0,'+this.counter/(this.duration)+')')
                
                text(this.message,widthCanvas/2,heightCanvas*0.10*0.9,widthCanvas*0.22,heightCanvas*0.2)
                pop()
            }
        }
    }
}
function Numbers() {
    return {
        tags: [{
                tag: 2,
                cant: 5
            },
            {
                tag: 3,
                cant: 5
            },
            {
                tag: 4,
                cant: 5
            },
            {
                tag: 5,
                cant: 5
            },
            {
                tag: 6,
                cant: 4
            },
            {
                tag: 8,
                cant: 4
            },
            {
                tag: 9,
                cant: 5
            },
            {
                tag: 10,
                cant: 5
            },
            {
                tag: 11,
                cant: 5
            },
            {
                tag: 12,
                cant: 5
            }
        ],
        getRandom: function () {
            if (this.tags.length > 0) {
                var index = Math.floor(Math.random() * 100) % this.tags.length

                var ranTag = this.tags[index]
                this.tags[index].cant = this.tags[index].cant - 1
                if (this.tags[index].cant == 0) {
                    this.tags = this.tags.filter(function (res, factor) {
                        return factor != index
                    })

                }
                return ranTag;
            } else return null
        }
    }
}
function Entries(valueObject) {
    var newObj = []
    for (key in valueObject) {
        newObj.push([key, valueObject[key]])

    }
    return newObj;

}
var card_names = {
    "GRAN_INCA": "GRAN_INCA",
    "AGRICULTOR": "AGRICULTOR",
    "CURACA": "CURACA",
    "DIOS_DE_LOS_DADOS": "DIOS_DE_LOS_DADOS",
    "TUCUY": "TUCUY",
    "RUNA": "RUNA",
    "MINERIA": "MINERIA",
    "OBRERO": "OBRERO",
    "VICTORY":"VICTORY",
    "LONGROUTE":"LONGROUTE"
    //"TUCUY": "TUCUY",
}
var positionsVertice = [{
        fi: 1,
        fj: 0
    },
    {
        fi: 9,
        fj: 0
    },
    {
        fi: 1,
        fj: 5
    },
    {
        fi: 9,
        fj: 5
    },
]
var positionsAristas = [{
        fi: 1,
        fj: 1
    },
    {
        fi: 8,
        fj: 1
    },
    {
        fi: 1,
        fj: 10
    },
    {
        fi: 8,
        fj: 10
    }
]
var portos = [{
    resource:'potato',
    fi: 1,
    fj: 1,
    index:2,
}, {
    resource:'wool',
    fi: 1,
    fj: 4,
    index:1,
}, {
    resource:'wood',
    fi: 9,
    fj: 1,
    index:2,
}, {
    resource:'gold',
    fi: 9,
    fj: 4,
    index:2,
}, {
    resource:'quinoa',
    fi: 7,
    fj: 0,
    index:2,
}, {
    resource:'stone',
    fi: 3,
    fj: 5,
    index:2,
}]

function menu1(){
    push()
    
                rectMode(CENTER)
                stroke(255)
                strokeWeight(radio*0.05)
                fill('rgba(40,40,60,1)')
                rect(widthCanvas/2,heightCanvas/2,widthCanvas*0.4, heightCanvas*0.7,heightCanvas*0.03 )
                strokeWeight(1)
                textSize(radio*0.52)
                fill('white')
                noStroke()
                text("AYUDA",widthCanvas/2,heightCanvas*0.21)
                text("PRIMERA FASE",widthCanvas/2,heightCanvas*0.30)
                textSize(radio*0.33)
                textAlign(LEFT, CENTER)
                
                text("CADA JUGADOR CONSTRUYE 2 CASAS Y 2 CAMINOS",widthCanvas*0.515,heightCanvas*0.4,widthCanvas*0.29,heightCanvas*0.1)
                text(" - ",widthCanvas*0.355,heightCanvas*0.38)
                text("SE LE BRINDARAN AL JUGADOR 3 RECURSOS ALEATORIOS AL COLOCAR SU SEGUNDO POBLADO",widthCanvas*0.515,heightCanvas*0.54,widthCanvas*0.29,heightCanvas*0.2)
                text(" - ",widthCanvas*0.355,heightCanvas*0.48)
                text("LA PRIMERA FASE NO TERMINA HASTA QUE TODOS HAYAN CONSTRUIDO SU SEGUNDO POBLADO",widthCanvas*0.515,heightCanvas*0.715,widthCanvas*0.29,heightCanvas*0.2)
                text(" - ",widthCanvas*0.355,heightCanvas*0.655)
                fill("white")
                triangle(widthCanvas*0.7-30, (heightCanvas/2)+10, widthCanvas*0.7-30, (heightCanvas/2)-10, (widthCanvas*0.7)-20, heightCanvas/2);   

                pop()
}

function menu(){
    push()
    
                rectMode(CENTER)
                stroke(255)
                strokeWeight(radio*0.05)
                fill('rgba(40,40,60,1)')
                rect(widthCanvas/2,heightCanvas/2,widthCanvas*0.4, heightCanvas*0.7,heightCanvas*0.03 )
                strokeWeight(1)
                textSize(radio*0.52)
                fill('white')
                noStroke()
                text("AYUDA",widthCanvas/2,heightCanvas*0.21)
                text("SEGUNDA FASE",widthCanvas/2,heightCanvas*0.30)
                textSize(radio*0.33)
                textAlign(LEFT, CENTER)
                
                text("CADA JUGADOR PODRA LANZAR LOS DADOS EN SU TURNO",widthCanvas*0.515,heightCanvas*0.4,widthCanvas*0.29,heightCanvas*0.1)
                text(" - ",widthCanvas*0.355,heightCanvas*0.38)
                text("LOS BLOQUES QUE TENGAN EL RESULTADO DEL DADO GENERARAN RECURSOS",widthCanvas*0.515,heightCanvas*0.53,widthCanvas*0.29,heightCanvas*0.17)
                text(" - ",widthCanvas*0.355,heightCanvas*0.49)
                text("LOS JUGADORES PODRAN CONSTRUIR POBLADOS Y CAMINOS SI TIENEN LOS RECURSOS NECESARIOS",widthCanvas*0.515,heightCanvas*0.695,widthCanvas*0.29,heightCanvas*0.2)
                text(" - ",widthCanvas*0.355,heightCanvas*0.635)
                fill("white")
                triangle(widthCanvas*0.3+30, (heightCanvas/2)+10, widthCanvas*0.3+30, (heightCanvas/2)-10, (widthCanvas*0.3)+20, heightCanvas/2);   

                pop()
}