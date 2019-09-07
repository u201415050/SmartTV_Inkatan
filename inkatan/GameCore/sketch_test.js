
var wp= $(window).width();
var hp = $(window).height();
var moveItem=MoveItem(wp/2,hp/2,100,100,16);
function MoveItem(posx,posy,fposx,fposy,milliseconds){
    return {
        posx:posx,
        posy:posy,
        fposx:fposx,
        fposy:fposy,
        milliseconds:milliseconds,
        deltax:(-1)*(posx-fposx) / (milliseconds),
        deltay:(-1)*(posy-fposy) / (milliseconds),
        
        counter:0,
        draw:function(){
            fill('black')
            var vel=1;
            this.counter=this.counter+1;
            quad(this.posx - 50, this.posy,
                this.posx, this.posy + 50,
                this.posx + 50, this.posy,
                this.posx, this.posy - 50)
            if(parseInt(this.posx)!=parseInt(this.fposx)){
                if(!(this.counter<milliseconds-2)){
                        vel=0.5
                }
                    this.posx=this.posx+(this.deltax*vel)
                    this.posy= this.posy+(this.deltay*vel)
                
            }
        }

    }
}

function setup(){
    var canvas = createCanvas(wp, hp);
    canvas.parent('#canvas')
    
   // moveItem = {...moveItem,...getPosition(moveItem)};
    //console.log(moveItem)
}

function draw(){
    background("rgb(200,200,200)")
    drawObj(wp/2,hp/2,50)
    moveItem.draw()
}
function drawObj(posx, posy,radio){
    fill('black')

    quad(posx - radio, posy,
        posx, posy + radio,
        posx + radio, posy,
        posx, posy - radio)
}
function getPosition(obj){
    return {
        deltax:(-1)*(obj.posx-obj.fposx) / (obj.seconds*100),
        deltay:(-1)*(obj.posy-obj.fposy) / (obj.seconds*100)}
}
