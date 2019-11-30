// eslint-disable-next-line require-jsdoc
function Vertice(iIndex, jIndex, posx, posy) {
  return {
    id: iIndex+'-'+jIndex,
    iIndex: iIndex,
    jIndex: jIndex,
    posx: posx,
    posy: posy,
    taken: '',
    big:false,
    indexAnimate:26,
    pivot:2,
    draw: function(value) {
      var padding = this.iIndex==0?40:0;
      var hand = (this.jIndex==0||this.jIndex==6) && this.iIndex>1 && this.iIndex<10 && this.iIndex%2==0?+radio*0.22:(this.iIndex==0?-radio*0.16:this.iIndex==1?radio*0.23: radio*0.62)
      push();
      stroke('rgba(255,255,255,0.5)');
      strokeWeight(radio * 0.05);
      fill(value ? value : PlayersDetails[turnIndex].color);
      strokeWeight(2)
      imageMode(CENTER)
      image(casas[turnIndex].a, this.posx, this.posy-(hand), radio*0.72, radio)
      
      this.drawArrow(hand)
      pop();
    },
    getAdyacentsAristas: function() {
      var listvalid = [];
      if (mapa.listAristas[this.iIndex-1]!=null) {
        if ((this.iIndex%2==0&&this.iIndex!=10)||this.iIndex==1) {
          if (mapa.listAristas[this.iIndex-1][(this.jIndex*2)-1]!=null) {
            listvalid.push({fi: this.iIndex-1,
              fj: (this.jIndex*2)-1});
          }
          if (mapa.listAristas[this.iIndex-1][this.jIndex*2]!=null) {
            listvalid.push({fi: this.iIndex-1,
              fj: this.jIndex*2});
          }
        } else {
          if (mapa.listAristas[this.iIndex-1][(this.jIndex*2)]!=null) {
            listvalid.push({fi: this.iIndex-1,
              fj: (this.jIndex*2)});
          }
          if (mapa.listAristas[this.iIndex-1][(this.jIndex*2)+1]!=null) {
            listvalid.push({fi: this.iIndex-1,
              fj: (this.jIndex*2)+1});
          }
        }
      }
      if (mapa.listAristas[this.iIndex]!=null) {
        if ((this.iIndex%2==0&&this.iIndex!=0)||this.iIndex==9) {
          if (mapa.listAristas[this.iIndex][(this.jIndex*2)-1]!=null) {
            listvalid.push({fi: this.iIndex,
              fj: (this.jIndex*2)-1});
          }
          if (mapa.listAristas[this.iIndex][this.jIndex*2]!=null) {
            listvalid.push({fi: this.iIndex,
              fj: this.jIndex*2});
          }
        } else {
          if (mapa.listAristas[this.iIndex][(this.jIndex*2)]!=null) {
            listvalid.push({fi: this.iIndex,
              fj: (this.jIndex*2)});
          }
          if (mapa.listAristas[this.iIndex][(this.jIndex*2)+1]!=null) {
            listvalid.push({fi: this.iIndex,
              fj: (this.jIndex*2)+1});
          }
        }
      }
      return listvalid;
    },
    drawArrow: function(hand){
      push()

      if(this.indexAnimate==50){
        this.pivot = -2;
      }else if (this.indexAnimate==26)
      {
        this.pivot=2;
      }
      this.indexAnimate+=this.pivot
      
      rectMode(CENTER)
      translate(this.posx, this.posy-hand- 70-this.indexAnimate)
      stroke("black")
      fill("white")
      rect(0, 4, 9, 30);
      triangle(0,29,8,15,-8,15);   
      noStroke()
      rect(0, 14, 7, 5); 
      pop()
    },
    getAdyacents: function() {
      if (iIndex == 10 || iIndex == 9) {
        return [{
          fi: iIndex - 1,
          fj: jIndex,
        },
        {
          fi: iIndex - 1,
          fj: jIndex + 1,
        },

        {
          fi: iIndex + 1,
          fj: jIndex,
        },

        {
          fi: iIndex+1,
          fj: jIndex-1,
        },
        {
          fi: iIndex,
          fj: jIndex,
        },
        ];
      } else if ((iIndex % 2 == 0 && iIndex != 0)) {
        return [{
          fi: iIndex - 1,
          fj: jIndex - 1,
        },
        {
          fi: iIndex - 1,
          fj: jIndex,
        },
        {
          fi: iIndex + 1,
          fj: jIndex - 1,
        },
        {
          fi: iIndex + 1,
          fj: jIndex,
        },

        {
          fi: iIndex,
          fj: jIndex,
        },
        ];
      } else if (iIndex == 1) {
        return [{
          fi: iIndex - 1,
          fj: jIndex - 1,
        },
        {
          fi: iIndex - 1,
          fj: jIndex,
        },
        {
          fi: iIndex + 1,
          fj: jIndex,
        },
        {
          fi: iIndex + 1,
          fj: jIndex + 1,
        },

        {
          fi: iIndex,
          fj: jIndex,
        },
        ];
      } else {
        return [{
          fi: iIndex - 1,
          fj: jIndex,
        },
        {
          fi: iIndex - 1,
          fj: jIndex + 1,
        },
        {
          fi: iIndex + 1,
          fj: jIndex,
        },
        {
          fi: iIndex + 1,
          fj: jIndex + 1,
        },

        {
          fi: iIndex,
          fj: jIndex,
        },
        ];
      }
    },
    getAround: function() {
      return [{
        fi: this.iIndex,
        fj: this.iIndex % 2 == 0 && this.iIndex != 0 ? this.jIndex - 1 : this.jIndex,
      },
      {
        fi: this.iIndex - 1,
        fj: this.jIndex,
      },
      {
        fi: this.iIndex - 2,
        fj: this.iIndex % 2 != 0 || this.iIndex == 10 ? this.jIndex : this.jIndex - 1,
      },
      {
        fi: this.iIndex - 1,
        fj: this.jIndex - 1,
      },
      ];
    },
    drawPorto: function(val,res) {
       push();
      imageMode(CENTER);
      image(bloquePuerto, this.posx+(val==7?-radio:val==3?radio:0), this.posy+(val==1?-radio:val==9?radio*0.25:0)+(val==7?-radio*0.5:val==3?-radio*0.5:0), radio*1, radio*1.4)
      
      image(mapa.resources.assets[res].icon, this.posx+(val==7?-radio*1.75:val==3?radio*1.75:0), this.posy+(val==1?-radio*2:val==9?radio*0.8:0)+(res!='quinoa'?radio*0.2:radio*0.1)+(val==7?-radio*0.5:val==3?-radio*0.5:0), radio*0.5*(res=='quinoa'?0.8:1),(res=='quinoa'?0.8:1)*radio*0.5*mapa.resources.assets[res].size.h/mapa.resources.assets[res].size.w)
      pop(); 
    },
    drawHouse: function(value) {
      push();
      var turn=value.id==turnIndex;
      var hand = (this.jIndex==0||this.jIndex==6) && this.iIndex>1 && this.iIndex<10 && this.iIndex%2==0?+radio*0.22:(this.iIndex==0?-radio*0.16:this.iIndex==1?radio*0.23: radio*0.62)
      stroke('rgba(0,0,0,'+(turn?'0.5':'0.5')+')');
      strokeWeight(radio * 0.05);
      fill(value ? value.colorTotal: PlayersDetails[turnIndex].color);
      // textSize(34);
      imageMode(CENTER)
      //if(!turn)tint(255, 127);
      image(casas[value.id][turn?"a":"b"], this.posx, this.posy-(hand), radio*0.72, radio)
     // ellipse(this.posx, this.posy-radio *  0.60, radio *  0.20, radio * 0.20);
      //ellipse(this.posx, this.posy, radio *  (this.big?0.5: 0.35), radio * (this.big?0.5: 0.35));
      // fill(0, 0, 0);
      // text(this.iIndex.toString() + this.jIndex.toString(), this.posx, this.posy)
      pop();
    },
  };
}

function Arista(iIndex, jIndex, start, end) {
  return {
    id: iIndex+'-'+jIndex,
    iIndex: iIndex,
    jIndex: jIndex,
    start: start,
    end: end,
    taken: '',
    indexAnimate:26,
    pivot:2,
    drawWay: function(value) {
      var turn=value.id==turnIndex;
      
      push()
      var left;
      if((iIndex==0||iIndex%2==1)&&iIndex!=9){
        left = !(jIndex%2==0)
      }else{
        left = jIndex%2==0
      }
      var hand = (this.jIndex==0||this.jIndex==11) && this.iIndex>0&&this.iIndex<9 && this.iIndex%2==1?radio*0.08:(this.iIndex==0?radio*0.08: radio*0.49)
      imageMode(CENTER)
      translate((this.start.posx + this.end.posx) / 2- (!left?-radio*0.05:radio*0.05), (this.start.posy + this.end.posy) / 2 - hand);
      if(turn){
        image(left?caminos[value.id].left:caminos[value.id].right, 0,0, radio*1.1, radio*1.1*440/648)
      }else{
        image(left?caminos_b[value.id].left:caminos_b[value.id].right, 0,0, radio*1.1, radio*1.1*440/648)
      }
      
     pop()
      // text(this.iIndex+'-'+this.jIndex,(this.start.posx+this.end.posx)/2,(this.start.posy+this.end.posy)/2)
    },
    draw: function(value) {
      
      
      push()
      var left;
      if((iIndex==0||iIndex%2==1)&&iIndex!=9){
        left = !(jIndex%2==0)
      }else{
        left = jIndex%2==0
      }
      //var hand = (this.jIndex==0||this.jIndex==6) && this.iIndex>1 && this.iIndex%2==0?+radio*0.22:(this.iIndex==0?-radio*0.16:this.iIndex==1?radio*0.23: radio*0.49)
      var hand = (this.jIndex==0||this.jIndex==11) && this.iIndex>0&&this.iIndex<9 && this.iIndex%2==1?radio*0.08:(this.iIndex==0?radio*0.08: radio*0.49)
      imageMode(CENTER)
      translate((this.start.posx + this.end.posx) / 2- (!left?-radio*0.05:radio*0.05), (this.start.posy + this.end.posy) / 2 - hand);
      image(left?caminos[turnIndex].left:caminos[turnIndex].right, 0,0, radio*1.1, radio*1.1*440/648)
      rectMode(CENTER)
      if(this.indexAnimate==50){
        this.pivot = -2;
      }else if (this.indexAnimate==26)
      {
        this.pivot=2;
      }
      this.indexAnimate+=this.pivot
      translate(0,0-hand-(this.iIndex==0?25: 0)-this.indexAnimate)
      stroke("black")
      fill("white")
      rect(0, 4, 9, 30);
      triangle(0,29,8,15,-8,15);   
      noStroke()
      rect(0, 14, 7, 5); 
      pop()
    },
  };
}

function Rombo(origin, resource, number, knight) {
  return {
    id: origin.iIndex+'-'+origin.jIndex,
    origin: origin,
    iIndex: origin.iIndex,
    jIndex: origin.jIndex,
    resource: resource,
    number: number,
    knight: knight,
    getPoint: function(side) {
      switch (side) {
        case 'left':
          return Vertice(this.origin.iIndex + 1, this.origin.jIndex, this.origin.posx - radio, this.origin.posy);
        case 'down':
          return Vertice(this.origin.iIndex + 2, this.origin.iIndex % 2 == 0 && this.origin.iIndex < 8 ? this.origin.jIndex + 1 : this.origin.jIndex, this.origin.posx, this.origin.posy + radio);
        case 'right':
          return Vertice(this.origin.iIndex + 1, this.origin.jIndex + 1, this.origin.posx + radio, this.origin.posy);
        case 'up':
          return Vertice(this.origin.iIndex, this.origin.iIndex % 2 == 0 && this.origin.iIndex != 0 ? this.origin.jIndex + 1 : this.origin.jIndex, this.origin.posx, this.origin.posy - radio);
      }
    },

    getArista: function(side) {
      switch (side) {
        case 1:
          return Arista(this.origin.iIndex, this.origin.iIndex == 0 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 : (this.origin.jIndex * 2) + 1, this.getPoint('up'), this.getPoint('left'));
        case 2:
          return Arista(this.origin.iIndex, this.origin.iIndex == 0 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 + 1 : this.origin.jIndex * 2 + 2, this.getPoint('right'), this.getPoint('up'));
        case 3:
          return Arista(this.origin.iIndex + 1, this.origin.iIndex == 8 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 : (this.origin.jIndex * 2) + 1, this.getPoint('left'), this.getPoint('down'));
        case 4:
          return Arista(this.origin.iIndex + 1, this.origin.iIndex == 8 || this.origin.iIndex % 2 == 1 ? this.origin.jIndex * 2 + 1 : this.origin.jIndex * 2 + 2, this.getPoint('down'), this.getPoint('right'));
      }
    },
    drawNumber:function(){
      if (this.number.tag != 7) {
        push()
        textAlign(CENTER, CENTER);
        fill('black');
        rectMode(CENTER)
        rect(this.origin.posx-radio*0.32,this.origin.posy-radio*0.34,2,10)
        ellipse(this.origin.posx-radio*0.32,this.origin.posy-radio*0.34-15,20,20)
        triangle(this.origin.posx-radio*0.32, this.origin.posy-radio*0.34+5, this.origin.posx-radio*0.32+2, this.origin.posy-radio*0.34+7, this.origin.posx-radio*0.32-2, this.origin.posy-radio*0.34+7)
        textSize((radio * 0.18));
        noStroke()
        fill('white');
        text(this.number.tag, this.origin.posx-radio*0.32,this.origin.posy-radio*0.34-16); 
        pop()      
      }
    },
    draw: function() {  
      push()
      imageMode(CENTER);
      
      image(this.number.tag==7?desierto:bloque, this.origin.posx, this.origin.posy, radio*1.28, radio*1.5)
      if(resource!=null && this.number.tag!=7){
        if(resource.size!=null){
        image(resource.icon, this.origin.posx, this.origin.posy-radio*0.38, radio*0.45,radio*0.45*resource.size.h/resource.size.w)}else{
          image(resource.icon, this.origin.posx, this.origin.posy-radio*0.38, radio*0.45,radio*0.45)
        }
      }
      
        //fill(resource.color);
      //ellipse(this.origin.posx, this.origin.posy,20,20)
      pop()
      this.drawNumber();
    },
    drawSelection: function(opacity) {
      push()
      imageMode(CENTER);
      image(bloqueActivo, this.origin.posx, this.origin.posy, radio*1.28, radio*1.5)
       if(resource!=null&& this.number.tag!=7){
        if(resource.size!=null){
        image(resource.icon, this.origin.posx, this.origin.posy-radio*0.38, radio*0.45,radio*0.45*resource.size.h/resource.size.w)}else{
          image(resource.icon, this.origin.posx, this.origin.posy-radio*0.38, radio*0.45,radio*0.45)
        }
      }
      pop()
      this.drawNumber();
    },
    drawActive: function(opacity) {
      push()
      imageMode(CENTER);
      image(bloqueActivo, this.origin.posx, this.origin.posy, radio*1.28, radio*1.5)
      if(resource!=null&& this.number.tag!=7){
        if(resource.size!=null){
        image(resource.icon, this.origin.posx, this.origin.posy-radio*0.38, radio*0.45,radio*0.45*resource.size.h/resource.size.w)}else{
          image(resource.icon, this.origin.posx, this.origin.posy-radio*0.38, radio*0.45,radio*0.45)
        }
      }
      pop()
      this.drawNumber();
    },
  };
}

function Knight(iIndex, jIndex) {
  return {
    iIndex: iIndex,
    jIndex: jIndex,
    previusiIndex: iIndex,
    previusjIndex: jIndex,
    draw: function(list) {
      image(mapa.images.knight, list[this.iIndex][this.jIndex].origin.posx - (radio * 0.4725 / 2)+radio*0.45, -(radio*0.7)+ list[this.iIndex][this.jIndex].origin.posy - (radio / 2)+radio*0.2, radio * 0.6158*0.7, radio*0.7);
    },
  };
}

function Mapa() {
  return {
    listRombos: [[],[],[],[],[],[],[],[],[]],
    listPoints: [],
    listAristas: [],
    altura: 9,
    select: 'rombo',
    resources: Resources(),
    numbers: Numbers(),
    ruleta: null,
    asignAnimation: null,
    images: {},
    knight: null,
    activates:[],
    actualSections: [],
    changeSelect: function() {
      switch (this.select) {
        case 'vertice':
          this.select = 'arista';
          break;
        case 'arista':
          this.select = 'rombo';
          break;
        case 'rombo':
          this.select = 'vertice';
          break;
      }
    },
    preload: function() {
      this.images.knight = loadImage('./inkatan/GameCore/assets/runa/runa.png');
    },
    setup: function() {
      for (var i = 0; i < this.altura; i++) {
        var padd = (i % 2 == 0 ? radio : 0) + radio;
        for (var j = 0; j < (i % 2 == 0 ? 5 : 6); j++) {
          var origen = Vertice(i, j, paddingLeft + padd + (radio * 2 * j), paddingHeight + radio + (radio * i*0.6));
          var resource = this.resources.getRandom();
          var number = resource.name == 'desierto' ? {
            tag: 7,
          } : this.numbers.getRandom();
          if (resource.name == 'desierto') {
            this.knight = new Knight(i, j);
          }
          var rombo = Rombo(origen, resource, number, resource.name == 'desierto');
          this.setSides(rombo);
          
          this.listRombos[i].push(rombo);
        }
      }
    },
    setSides: function(rombo) {
      this.addPoint(rombo.getPoint('up'));
      this.addPoint(rombo.getPoint('right'));
      this.addPoint(rombo.getPoint('down'));
      this.addPoint(rombo.getPoint('left'));
      this.addArista(rombo.getArista(1));
      this.addArista(rombo.getArista(2));
      this.addArista(rombo.getArista(3));
      this.addArista(rombo.getArista(4));
    },
    addPoint: function(point) {
      if (this.listPoints[point.iIndex]) {

      } else {
        this.listPoints[point.iIndex] = [];
      }
      if (!this.listPoints[point.iIndex][point.jIndex]) {
        this.listPoints[point.iIndex][point.jIndex] = point;
      }
    },
    addArista: function(arista) {
      if (this.listAristas[arista.iIndex]) {

      } else {
        this.listAristas[arista.iIndex] = [];
      }
      if (!this.listAristas[arista.iIndex][arista.jIndex]) {
        this.listAristas[arista.iIndex][arista.jIndex] = arista;
      }
    },
    addObject: function(player) {
      if (this.select == 'vertice') {
        var reason='';
        if (this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].taken.toString() == ''
        ||(game.data.type=='i')) {
          if(game.data.type=='i'){
              if(this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].taken.toString() == turnIndex.toString()
              &&game.status=='BUILD'
              &&!this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].big){
              var message = {
                name: PlayersDetails[turnIndex].name,
                resource: [{
                  name: 'wood',
                  amount: -4,
                }, {
                  name: 'stone',
                  amount: -4,
                }],
              };
              ResourcesController([message],true);
              this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].big = true;
              for (var i = 0; i < player.houses.length; i++) {
                if(player.houses[i].id==player.indicators.vertice.fi+"-"+player.indicators.vertice.fj){
                  player.houses[i].big=true;
                  break;
                }
                
              }
              game.ExitBuildProcess();
              
            }else{
              reason='Los imperios solo pueden ser colocados sobre tus poblados';
              modal.show(reason, 2);
            }
          }else{
          var canTake = true;

          var listAdj = this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].getAdyacents();
          var tempListPoints = this.listPoints;
          listAdj.map(function(ad) {
            if (ad.fi >= 0 && ad.fj >= 0) {
              if (tempListPoints[ad.fi] != null) {
                if (tempListPoints[ad.fi][ad.fj] != null) {
                  var tempTaken = tempListPoints[ad.fi][ad.fj].taken;
                  if (tempTaken.toString() != '') {
                    reason='No puedes colocar un poblado adyacente a otro';
                    canTake = false;
                  }
                }
              }
            }
            //
          });
          if (canTake) {
            for (var index = 0; index < portos.length; index++) {
              // console.log(portos[index].fi, player.indicators.vertice.fi)
              if (portos[index].fi == player.indicators.vertice.fi && portos[index].fj == player.indicators.vertice.fj) {
                canTake = game.status!='START';
                reason='No puedes colocar un poblado en un punto de intercambio';
              }
            }
          }
          if (game.status=='BUILD' && canTake) {
            var tempCan=false;
            for (var index = 0; index < player.ways.length; index++) {
              if (player.ways[index].start.id==player.indicators.vertice.fi+'-'+player.indicators.vertice.fj ||
                           player.ways[index].end.id==player.indicators.vertice.fi+'-'+player.indicators.vertice.fj ) {
                tempCan=true;
              }
            }
            reason='No puedes colocar un poblado sin una carretera al lado';
            canTake=tempCan;
          }
          if (canTake) {
            // REDUCE RESOURCES

            if (game.status=='BUILD') {
              var message = {
                name: PlayersDetails[turnIndex].name,
                resource: [{
                  name: 'wood',
                  amount: -2,
                }, {
                  name: 'stone',
                  amount: -2,
                }],
              };
              ResourcesController([message],true);
            }

            // sendMessageServer(
            //  newMessage
            // )
            this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].taken = turnIndex;
            this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].big = false;
            player.houses.push(this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj]);
            
            
            player.points=player.points+2;
          
            player.expansion=player.expansion+(100/34);
          
            if (ActualParameters.gamemode=='expansion') {
              if (100*player.houses.length/34>=parseInt(ActualParameters.gamevalue)) {
                modal.show(player.name, 10,true);
                setTimeout(function(){
                  location.assign(location.href.substr(0,location.href.indexOf('inkatan'))+"splashscreen.html")
                },10000)
              }else{
                sounds.build.play(0,1.7,0.2 ,0)
                modal.showUp(player.name+" construyó un poblado", 2);
              }
            }else{
              if (
                player.points>=parseInt(ActualParameters.gamevalue)) {
                modal.show(player.name, 10,true);
                setTimeout(function(){
                  location.assign(location.href.substr(0,location.href.indexOf('inkatan'))+"splashscreen.html")
                },10000)
              }else{
                sounds.build.play(0,1.7,0.2 ,0)
                modal.showUp(player.name+" construyó un poblado", 2);
              }
            }
          } else {
            modal.show(reason, 2);
          }
        }
        } else {
          reason='No puedes colocar un poblado donde ya hay uno construido';
          modal.show(reason, 2);
        }
        var nomore =  this.confirmWinner();
        if(!nomore){
          var namewinner = "";
          if(ActualParameters.gamemode=='expansion'){
            
            var max = 0;
            for (var pi = 0; pi < PlayersDetails.length; pi++) {
             if(PlayersDetails[pi].expansion>max){
               max=PlayersDetails[pi].expansion;
               namewinner=PlayersDetails[pi].name
             }
              
            }
            
          }else{
            var max = 0;
            for (var pi = 0; pi < PlayersDetails.length; pi++) {
             if(PlayersDetails[pi].points>max){
               max=PlayersDetails[pi].points;
               namewinner=PlayersDetails[pi].name
             }
              
            }
          }
          modal.show(namewinner, 10,true);
                setTimeout(function(){
                  location.assign(location.href.substr(0,location.href.indexOf('inkatan'))+"splashscreen.html")
                },10000)
        }
      } else if (this.select == 'arista') {
        var reason = '';
        if (this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj].taken.toString() == '') {
          var current = this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj];
          var canSet = this.listPoints[current.start.iIndex][current.start.jIndex].taken.toString() != '' && this.listPoints[current.start.iIndex][current.start.jIndex].taken.toString() == turnIndex.toString() ||
                        this.listPoints[current.end.iIndex][current.end.jIndex].taken.toString() == turnIndex.toString();

          if (!canSet) {
            player.ways.map(function(way) {
              if ((way.start.iIndex == current.start.iIndex && way.start.jIndex == current.start.jIndex) ||
                                (way.start.iIndex == current.end.iIndex && way.start.jIndex == current.end.jIndex) ||
                                (way.end.iIndex == current.start.iIndex && way.end.jIndex == current.start.jIndex) ||
                                (way.end.iIndex == current.end.iIndex && way.end.jIndex == current.end.jIndex)) {
                canSet = true;
              }
            });
            if (!canSet) {
              reason = 'Solo puedes construir una trocha al lado de otra o de un poblado';
            }
          }

          if (canSet) {
            // REDUCE RESOURCES
            if (game.status=='BUILD') {
              var message = {
                name: PlayersDetails[turnIndex].name,
                resource: [{
                  name: 'wood',
                  amount: -1,
                }, {
                  name: 'stone',
                  amount: -1,
                }],
              };
              ResourcesController([message],true);
            }

            this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj].taken = turnIndex;
            player.ways.push(this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj]);
            player.longRoad = GetLongRoadPlayer(player.id);
            ProcessLongRoad();
            console.log(player);
            sounds.build.play(0,1.7,0.2 ,0)
            modal.showUp(player.name+" construyó un camino", 2);
            player.points=player.points+1;
          
          
            if (ActualParameters.gamemode=='expansion') {
              
            }else{
              if (
                player.points>=parseInt(ActualParameters.gamevalue)) {
                modal.show(player.name, 10,true);
                setTimeout(function(){
                  location.assign(location.href.substr(0,location.href.indexOf('inkatan'))+"splashscreen.html")
                },10000)
              }else{
                
                //modal.showUp(player.name+" construyó un camino", 2);
              }
            }
          } else {
            modal.show(reason, 2);
          }
        } else {
          reason='No puedes construir una trocha donde ya hay una construida';
          modal.show(reason, 2);
        }
      } else if (this.select == 'rombo') {
        if (this.listRombos[player.indicators.rombo.fi] != null) {
          if (this.listRombos[player.indicators.rombo.fi][player.indicators.rombo.fj] != null) {
            this.listRombos[this.knight.previusiIndex][this.knight.previusjIndex].knight = false;
            this.listRombos[this.knight.iIndex][this.knight.jIndex].knight = true;
            this.knight.previusiIndex = this.knight.iIndex;
            this.knight.previusjIndex = this.knight.jIndex;
            this.select = '';
            sounds.select.play(0,1,0.9)
          modal.showUp(player.name+" movió al runa", 2);
            game.ChangeStatus('ROUND');

            //PaseTurno();
          }
        }
      }
    },
    printObjects: function(players) {
      players.map(function(player) {
        player.houses.map(function(house) {
          house.drawHouse(player);
        });
        player.ways.map(function(way) {
          way.drawWay(player);
        });
      });
    },
    printPoint: function(i, j) {
      this.listPoints[i][j].draw();
      /* var adj = this.listPoints[i][j].getAdyacents();
      var that=this
      adj.map(function(xit){
        if(that.listPoints[xit.fi]!=null){
          if(that.listPoints[xit.fi][xit.fj]!=null)
          that.listPoints[xit.fi][xit.fj].draw();
      }
      }) */
    },
    confirmWinner:function(){
      var that=this
      var exit =  false;
      for (var i = 0; i < this.listPoints.length; i++) {
        for (var j = 0; j < this.listPoints[i].length; j++) {
        var xi = that.listPoints[i][j];
        var adj = xi.getAdyacents();
        var valid = true;
        for (var x = 0; x < adj.length; x++) {
          if(that.listPoints[adj[x].fi]!=null){
            if(that.listPoints[adj[x].fi][adj[x].fj]!=null)
            if(that.listPoints[adj[x].fi][adj[x].fj].taken.toString()!='' ){
              //console.log("Invalid"+i+"-"+j)
              valid = false;
              break;
            }else{
              console.log("Valid"+i+"-"+j)
              console.log(that.listPoints[adj[x].fi][adj[x].fj].taken)
            }
          }
        }
       if(xi.taken.toString()!=''){
         valid=false;
         console.log("SAME");
       }
      if(valid){
        exit=true;
        break
        //console.log("valid"+i+"-"+j)
      }else{

      }
    }
    

    }
    
      return exit;
    },
    printArista: function(i, j) {
      this.listAristas[i][j].draw();
    },
    printKnight: function() {
      this.knight.draw(this.listRombos);
    },
    printRombo: function(i, j) {
      try {
        this.listRombos[i][j].drawActive();
      } catch (error) {
        // console.log(error)
      }
    },
    spinAnimation: function() {
      
      if (this.ruleta != null) {
        if (this.ruleta.list!=null) {
          this.activates=[];
          for (var index = 0; index < this.ruleta.list.length; index++) {
            if (this.listRombos[this.ruleta.list[index].fi]) {
              if (this.listRombos[this.ruleta.list[index].fi][this.ruleta.list[index].fj]) {
                var rombo = this.listRombos[this.ruleta.list[index].fi][this.ruleta.list[index].fj];
                if (this.ruleta.index != index) {
                  //this.activates.push(rombo)
                  rombo.drawActive(!this.ruleta.opacity);
                }
              }
            }
          }
        }
        if (this.ruleta.type == 'run') {
          this.ruleta.tempo = this.ruleta.tempo >= this.ruleta.pivot ? 0 : this.ruleta.tempo + 1;
          if (this.ruleta.tempo >= this.ruleta.pivot) {
             if (this.ruleta.index == 3) {
              this.ruleta.pivot = this.ruleta.pivot *2;
              this.ruleta.tempo = 0;
             }
            this.ruleta.index = this.ruleta.index == 3 ? 0 : this.ruleta.index + 1;

            if (this.ruleta.pivot >= 6) {
              var that = this;
              setTimeout(function() {
                that.ruleta.type = 'asign';
              }, 1000);
              this.ruleta.type = 'stop';
              this.ruleta.opacity = true;
              this.ruleta.tempo = 0;
            }
          }
        }
        if (this.ruleta.type == 'stop') {
          this.ruleta.tempo = this.ruleta.tempo + 1;
          if (this.ruleta.tempo == 1) {
            this.ruleta.opacity = !this.ruleta.opacity;
            this.ruleta.tempo = 0;
          }
        }
        if (this.ruleta.type=='asign_animation') {
          if (this.asignAnimation!=null) {
            var pass = false;
            for (var i = 0; i < this.asignAnimation.list.length; i++) {
              if (this.asignAnimation.list[i].draw()) {
                pass=true;
              }
            }
            if (!pass) {
              this.ruleta = null;

              if (this.asignAnimation.back) {
                this.asignAnimation=null;
                BackTurno();
              } else {
                game.ChangeStatus('ROUND');
                this.select = '';
              }
            }
          }
        }
      }
    },
    printAll: function() {
      var list = this.listPoints;
      for (var ro = 0; ro < this.listRombos.length; ro++) {
        if(ro==0)
        portos.map(function(item) {
          if(item.fi==ro+1 )
          list[item.fi][item.fj].drawPorto(item.fi,item.resource);
        });
        /*  */
          if(ro<=1){
            
            PlayersDetails.map(function(player) {
            player.houses.map(function(house) {
            if(house.iIndex==ro )
            house.drawHouse(player);
            });})
            if(this.select=="vertice"){
              
              showPointer(ro);
            }
            
            PlayersDetails.map(function(player) {
              player.ways.map(function(way) {
                if(way.iIndex==ro)
                way.drawWay(player);
              });})
              if(this.select=="arista"){
            
                showPointer(ro);
              }
        }
         if(ro==1||ro==2){

          PlayersDetails.map(function(player) {
            player.houses.map(function(house) {
            if(house.iIndex==ro+1 )
            house.drawHouse(player);
            });})
            if(this.select=="vertice"){
              
              showPointer(ro+1);
            }
         }
        /*if(ro==0)portos.map(function(item) {
          if(item.fi==ro+1)
          list[item.fi][item.fj].drawPorto(item.fi,item.resource);
        });
        
        
        PlayersDetails.map(function(player) {
          
          player.houses.map(function(house) {
            if(house.iIndex==ro)
            house.drawHouse(player);
          });
          player.ways.map(function(way) {
            if(way.iIndex==ro)
            way.drawWay(player);
          });
          
        });
        showPointer(ro);*/
        for (var rom = 0; rom < this.listRombos[ro].length; rom++) {
          this.listRombos[ro][rom].draw();
          
        }
        if(this.select=="rombo"){
              if(PlayersDetails[turnIndex].indicators.rombo.fi==ro)
                  showPointer();
        }
        /* if(this.ruleta!=null){
          if(this.ruleta.opacity!=null){
        for (var act = 0; act < this.activates.length; act++) {
          if(this.activates[act].iIndex==ro){
            this.activates[act].drawActive(!this.ruleta.opacity)
          }
          
        }
      }
      } */
        if(ro<9 && ro!=0)
        portos.map(function(item) {
          if(item.fi==ro+1 )
          list[item.fi][item.fj].drawPorto(item.fi,item.resource);
        });
        this.actualSections.map(function(rombo) {
          if(rombo.iIndex == ro)
          rombo.drawSelection();
        });

        
        /*if(ro<8 && ro!=0)
        
        
        
        PlayersDetails.map(function(player) {
          
          player.houses.map(function(house) {
            if(house.iIndex==ro+1 ||house.iIndex==10)
            house.drawHouse(player);
          });
          player.ways.map(function(way) {
            if(way.iIndex==ro+1)
            way.drawWay(player);
          });
          if(ro>=8)
        portos.map(function(item) {
          if(item.fi==ro+1)
          list[item.fi][item.fj].drawPorto(item.fi,item.resource);
        });
        });*/
        
        
        
        if(ro>0){
          PlayersDetails.map(function(player) {
          player.ways.map(function(way) {
            if(way.iIndex==ro+1)
            way.drawWay(player);
          });})
          if(this.select=="arista"){
        
            showPointer(ro+1);
          }
        }
        if(ro>1){
          PlayersDetails.map(function(player) {
            player.houses.map(function(house) {
            if(house.iIndex==ro+2 )
            house.drawHouse(player);
          });})
          if(this.select=="vertice"){
            
            showPointer(ro+2);
          }
        }
         
        
        
      }
      
      


      this.spinAnimation();
      dice.draw();
      
      
      this.printKnight();
       
       /* this.listAristas.map(function(aristas){
                aristas.map(function(arista){
                    arista.draw()
                })
            })  
            this.listPoints.map(function (points) {
              points.map(function (point) {
                  point.draw()
              })
          })  */
      //   console.log(response)
      /* response.map(function (value) {
                value.point.draw()


            })*/
    },
    move: function(player, side) {
      if (this.select == 'vertice') {
        this.moveVertice(player, side);
      }
      if (this.select == 'arista') {
        this.moveArista(player, side);
      }
      if (this.select == 'rombo') {
        this.moveRombo(player, side);
      }
    },
    moveVertice: function(player, side) {
      if (side == 'down') {
        var newfj = player.indicators.vertice.fi == 0 ?
                    player.indicators.vertice.fj + 1 : player.indicators.vertice.fi == 8 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fj;
        var newfi = player.indicators.vertice.fi == 10 ? 0 : player.indicators.vertice.fi == 9 ? 1 : player.indicators.vertice.fi + 2;
        if (this.listPoints[newfi][newfj]) {
          player.indicators.vertice.fi = newfi;
          player.indicators.vertice.fj = newfj;
        }
      } else if (side == 'up') {
        var newfj = player.indicators.vertice.fi == 2 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fi == 10 ?
                    player.indicators.vertice.fj + 1 : player.indicators.vertice.fj;
        var newfi = player.indicators.vertice.fi == 0 ? 10 : player.indicators.vertice.fi == 1 ? 9 : player.indicators.vertice.fi - 2;
        if (this.listPoints[newfi][newfj]) {
          player.indicators.vertice.fi = newfi;
          player.indicators.vertice.fj = newfj;
        }
      } else if (side == 'left') {
        var newfj = player.indicators.vertice.fi == 0 || player.indicators.vertice.fi == 10 ?
                    player.indicators.vertice.fj : player.indicators.vertice.fi == 9 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fi % 2 == 0 ?
                    player.indicators.vertice.fj - 1 : player.indicators.vertice.fj;
        var newfi = player.indicators.vertice.fi == 10 ? 0 : player.indicators.vertice.fi + 1;
        if (this.listPoints[newfi][newfj]) {
          player.indicators.vertice.fi = newfi;
          player.indicators.vertice.fj = newfj;
        }
      } else if (side == 'right') {
        var newfj = player.indicators.vertice.fi == 0 ?
                    player.indicators.vertice.fj + 1 : player.indicators.vertice.fi == 9 || player.indicators.vertice.fi == 10 ?
                    player.indicators.vertice.fj : player.indicators.vertice.fi % 2 == 0 ?
                    player.indicators.vertice.fj : player.indicators.vertice.fj + 1;
        var newfi = player.indicators.vertice.fi == 10 ? 0 : player.indicators.vertice.fi + 1;
        if (this.listPoints[newfi][newfj]) {
          player.indicators.vertice.fi = newfi;
          player.indicators.vertice.fj = newfj;
        }
      }
    },
    moveArista: function(player, side) {
      if (side == 'down') {
        var newfj = player.indicators.arista.fi == 0 ?
                    player.indicators.arista.fj + 1 : player.indicators.arista.fi == 8 ?
                    player.indicators.arista.fj - 1 : player.indicators.arista.fj;
        var newfi = player.indicators.arista.fi == 9 ? 0 : player.indicators.arista.fi + 1;
        if (this.listAristas[newfi][newfj]) {
          player.indicators.arista.fi = newfi;
          player.indicators.arista.fj = newfj;
        }
      } else if (side == 'up') {
        var newfj = player.indicators.arista.fi == 1 ?
                    player.indicators.arista.fj - 1 : player.indicators.arista.fi == 9 ?
                    player.indicators.arista.fj + 1 : player.indicators.arista.fj;
        var newfi = player.indicators.arista.fi == 0 ? 9 : player.indicators.arista.fi - 1;
        if (this.listAristas[newfi][newfj]) {
          player.indicators.arista.fi = newfi;
          player.indicators.arista.fj = newfj;
        }
      } else if (side == 'left') {
        var newfj = player.indicators.arista.fj - 1;
        var newfi = player.indicators.arista.fi;
        if (this.listAristas[newfi][newfj]) {
          player.indicators.arista.fi = newfi;
          player.indicators.arista.fj = newfj;
        }
      } else if (side == 'right') {
        var newfj = player.indicators.arista.fj + 1;
        var newfi = player.indicators.arista.fi;
        if (this.listAristas[newfi][newfj]) {
          player.indicators.arista.fi = newfi;
          player.indicators.arista.fj = newfj;
        }
      }
    },
    moveRombo: function(player, side) {
      if (side == 'down') {
        var newfj = player.indicators.rombo.fj;
        var newfi = player.indicators.rombo.fi == 8 ? 0 : player.indicators.rombo.fi == 7 ? 1 : player.indicators.rombo.fi + 2;
        if (this.listRombos[newfi][newfj]) {
          player.indicators.rombo.fi = newfi;
          player.indicators.rombo.fj = newfj;
          this.knight.iIndex = newfi;
          this.knight.jIndex = newfj;
        }
      } else if (side == 'up') {
        var newfj = player.indicators.rombo.fj;
        var newfi = player.indicators.rombo.fi == 0 ? 8 : player.indicators.rombo.fi == 1 ? 7 : player.indicators.rombo.fi - 2;
        if (this.listRombos[newfi][newfj]) {
          player.indicators.rombo.fi = newfi;
          player.indicators.rombo.fj = newfj;
          this.knight.iIndex = newfi;
          this.knight.jIndex = newfj;
        }
      } else if (side == 'left') {
        var newfj = player.indicators.rombo.fi % 2 == 0 ? player.indicators.rombo.fj : player.indicators.rombo.fj - 1;
        var newfi = player.indicators.rombo.fi == 8 ? 0 : player.indicators.rombo.fi + 1;
        if (this.listRombos[newfi][newfj]) {
          player.indicators.rombo.fi = newfi;
          player.indicators.rombo.fj = newfj;
          this.knight.iIndex = newfi;
          this.knight.jIndex = newfj;
        }
      } else if (side == 'right') {
        var newfj = player.indicators.rombo.fi % 2 == 0 ? player.indicators.rombo.fj + 1 : player.indicators.rombo.fj;
        var newfi = player.indicators.rombo.fi == 8 ? 0 : player.indicators.rombo.fi + 1;
        if (this.listRombos[newfi][newfj]) {
          player.indicators.rombo.fi = newfi;
          player.indicators.rombo.fj = newfj;
          this.knight.iIndex = newfi;
          this.knight.jIndex = newfj;
        }
      }
    },
    areValidate: function(listAround) {
      var result = {
        good: [],
        bad: [],
      };
      for (var index = 0; index < listAround.length; index++) {
        if (this.listRombos[listAround[index].fi]) {
          if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
            var rombo = this.listRombos[listAround[index].fi][listAround[index].fj];
            if (rombo.resource.type !== 'dessert') {
              result.good.push(index);
            } else {
              result.bad.push(index);
            }
          } else {
            result.bad.push(index);
          }
        } else {
          result.bad.push(index);
        }
      }
      return result;
    },
    getResources: function(fi, fj, back) {
      var listAround = this.listPoints[fi][fj].getAround();
      var result = this.areValidate(listAround);

      if (result.good.length < 4) {
        if (this.ruleta==null) {
          this.ruleta = {
            type: 'pre-asign',
          };
          var listresources = {};
          var listasignanimation= [];
          for (var index = 0; index < listAround.length; index++) {
            if (this.listRombos[listAround[index].fi]) {
              if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
                var rombo = this.listRombos[listAround[index].fi][listAround[index].fj];
                var canPass = true;
                result.bad.map(function(item) {
                  if (item == index) {
                    canPass = false;
                  }
                });
                if (rombo.resource.type !== 'dessert' && canPass) {
                  listasignanimation.push(MoveItem(rombo.origin.posx, rombo.origin.posy, PlayersDetails[turnIndex].avatar.posx, PlayersDetails[turnIndex].avatar.posy, 40, rombo.resource));

                  if (listresources[rombo.resource.type]) {
                    listresources[rombo.resource.type] = listresources[rombo.resource.type] + 1;
                  } else {
                    listresources[rombo.resource.type] = 1;
                  }
                }
              }
            }
          }


          var message = {
            name: PlayersDetails[turnIndex].name,
            resource: Entries(listresources).map(function(item) {
              return {
                name: item[0],
                amount: item[1],
              };
            }),
          };
          ResourcesController([message],true);

          // console.log(listresources)
          this.setAsignAnimation({
            turnIndex,
            listasignanimation,
            back,
          });
          
          // console.log(turnIndex)
          /* if (back) {
                    BackTurno()
                } else {
                    console.log(turnIndex)
                    game.ChangeStatus("ROUND")
                    this.select = ''
                } */
        }
      } else {
        if (this.ruleta == null) {
          this.ruleta = {
            type: 'run',
            list: listAround,
            index: Math.floor(Math.random() * 100) % 4,
            tempo: 0,
            pivot: 3,
          };
        } else {
          if (this.ruleta.type == 'asign') {
            var listresources = {};
            var listasignanimation= [];
            for (var index = 0; index < listAround.length; index++) {
              if (this.listRombos[listAround[index].fi]) {
                if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
                  var rombo = this.listRombos[listAround[index].fi][listAround[index].fj];
                  if (rombo.resource.type !== 'dessert' && index != this.ruleta.index) {
                    listasignanimation.push(MoveItem(rombo.origin.posx, rombo.origin.posy, PlayersDetails[turnIndex].avatar.posx, PlayersDetails[turnIndex].avatar.posy, 30, rombo.resource));
                    if (listresources[rombo.resource.type]) {
                      listresources[rombo.resource.type] = listresources[rombo.resource.type] + 1;
                    } else {
                      listresources[rombo.resource.type] = 1;
                    }
                  }
                }
              }
            }


            var message = {
              name: PlayersDetails[turnIndex].name,
              resource: Entries(listresources).map(function(item) {
                return {
                  name: item[0],
                  amount: item[1],
                };
              }),
            };
            ResourcesController([message],true);
            this.setAsignAnimation({
              turnIndex,
              listasignanimation,
              back,
            });
            /* this.ruleta = null

                        if (back) {
                            BackTurno()
                        } else {
                            game.ChangeStatus("ROUND")
                            this.select = ''
                        }*/
          }
        }
      }
    },
    asignResources: function(val) {
      // var tabs = ["left", "right", "up", "down"]
      var response = this.findNumbers(val);
      var result = {};
      PlayersDetails.map(function(playerItem) {
        result[playerItem.name] = {};
      });
      // console.log(response)
      var listValidate = this.listPoints;
      var elements = response.filter(function(item) {
        return listValidate[item.point.iIndex][item.point.jIndex].taken.toString() != '';
      });
      // console.log(eleme)
      elements.map(function(value) {
        if (listValidate[value.point.iIndex][value.point.jIndex].taken.toString().length>0) {
          if (result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type]) {
            console.log(result);
            console.log(value);
            result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type] = result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type] + 1;
          } else {
            result[PlayersDetails[parseInt(listValidate[value.point.iIndex][value.point.jIndex].taken)].name][value.resource.type] = 1;
          }
        }
      });
      var messageArray = [];
      Entries(result).map(function(value) {
        var newMessage = {
          name: value[0],
          resource: Entries(value[1]).map(function(item) {
            return {
              name: item[0],
              amount: item[1],
            };
          }),
        };
        messageArray.push(newMessage);
      });
      ResourcesController(messageArray,true);
      asignaciones= messageArray;
      mostrarAsignacion = true;
      
      //PaseTurno();
    },
    findNumbers: function(val) {
      var listOrigin = [];
      var listRequest = [];
      var tabs = ['left', 'right', 'up', 'down'];
      var knight = this.knight;
      this.listRombos.map(function(rombos) {
        rombos.map(function(rombo) {
          if (rombo.number.tag == val &&(rombo.iIndex!=knight.iIndex ||rombo.jIndex!=knight.jIndex)) {
            listOrigin.push(rombo);
          }
        });
      });
      this.actualSections=listOrigin;
      listOrigin.map(function(origin) {
        tabs.map(function(tab) {
          listRequest.push({
            resource: origin.resource,
            point: origin.getPoint(tab),
          });
        });
      });
      return listRequest;
    },
    setAsignAnimation:function(data){
      this.ruleta.type='asign_animation';
      this.asignAnimation={
        player: data.turnIndex,
        list: data.listasignanimation,
        back: data.back,
      };
    }
  };
}

function Dice() {
  return {
    value: [],
    show: true,
    execute: false,
    animation: false,
    indexAnimation:0,
    counter : 0,
    it:0,
    draw: function() {
      if (this.value.length > 0) {
        push();
        fill('white');
        rectMode(CENTER);
        imageMode(CENTER);
        strokeWeight(3)
        var padd = paddingLeft*0.4
        rect(paddingLeft * 0.25, heightCanvas / 2-paddingLeft * 0.625+padd, paddingLeft * 0.7, paddingLeft *0.97, paddingLeft * 0.06);
        strokeWeight(1)
        if(!this.animation){
          image(dices[this.value[0]-1],paddingLeft * 0.3, heightCanvas / 2-paddingLeft * 0.4+padd,paddingLeft * 0.4, paddingLeft * 0.4)
          image(dices[this.value[1]-1],paddingLeft * 0.3, heightCanvas / 2-paddingLeft * 0.85+padd,paddingLeft * 0.4, paddingLeft * 0.4)
        }else{

          image(spritDice[this.indexAnimation], paddingLeft * 0.3, heightCanvas / 2-paddingLeft * 0.625+padd, paddingLeft * 0.5, paddingLeft*0.9 , paddingLeft * 0.02);
          this.counter++;
          if(this.counter>=3){
            this.counter =0
            this.indexAnimation++;
            if(this.indexAnimation>=4){
              this.indexAnimation=0;
              
              this.it++
              if(this.it>=3){

              console.log(this.it)
                this.animation=false
                this.it=0;
                modal.showUp(PlayersDetails[turnIndex].name+" lanzó "+(this.value[0]+this.value[1]), 2);
                if(this.value[0]+this.value[1]==7){
                  modal.showUp(PlayersDetails[turnIndex].name+" mueve al runa", 2);
                
                }
        
              }
            } 
            
            
          }
        }
        
        //rect(paddingLeft * 0.25, heightCanvas / 2, paddingLeft * 0.4, paddingLeft * 0.4, paddingLeft * 0.02);
        //rect(paddingLeft * 0.70, heightCanvas / 2, paddingLeft * 0.4, paddingLeft * 0.4, paddingLeft * 0.02);
        //this.drawPoints(this.value[0], true);
        //this.drawPoints(this.value[1], false);
        pop();
      }
    },
    drawPoints: function(value, first) {
      var size = paddingLeft * 0.4;
      var center = first ? paddingLeft * 0.25 : paddingLeft * 0.70;
      if (value == 1) {
        fill('black');
        ellipse(center, heightCanvasr / 2, size / 7);
      }
      if (value == 2) {
        fill('black');
        ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7);
      }
      if (value == 3) {
        fill('black');
        ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center, heightCanvas / 2, size / 7);
      }
      if (value == 4) {
        fill('black');
        ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center - size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 - size / 4, size / 7);
      }
      if (value == 5) {
        fill('black');
        ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center, heightCanvas / 2, size / 7);
        ellipse(center - size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 - size / 4, size / 7);
      }
      if (value == 6) {
        fill('black');
        ellipse(center - size / 4, heightCanvas / 2 - size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center - size / 4, heightCanvas / 2, size / 7);
        ellipse(center + size / 4, heightCanvas / 2, size / 7);
        ellipse(center - size / 4, heightCanvas / 2 + size / 4, size / 7);
        ellipse(center + size / 4, heightCanvas / 2 - size / 4, size / 7);
      }
    },
    throwDice: function() {
      if (game.status == 'ROUND') {
        mapa.actualSections=[]
        sounds.dices.play(0,1,0.12)
        this.value = [1 + Math.floor(Math.random() * 100) % 6, 1 + Math.floor(Math.random() * 100) % 6];
        if (this.value[0] + this.value[1] != 7) {
          this.animation = true;
          
          mapa.asignResources(this.value[0] + this.value[1]);
        } else {
          sounds.shout.play(0,1,0.9)
          this.animation = true;
          var message = {
            name: PlayersDetails[turnIndex].name,
          };
          console.log(message)
          KnightController(message);
        }
      }
    },
  };
}

function MoveItem(posx, posy, fposx, fposy, milliseconds, res) {
  return {
    posx: posx,
    posy: posy,
    fposx: fposx,
    fposy: fposy,
    milliseconds: milliseconds,
    deltax: (-1)*(posx-fposx) / (milliseconds),
    deltay: (-1)*(posy-fposy) / (milliseconds),
    image: res,
    counter: 0,
    draw: function() {
      var vel=1;
      this.counter=this.counter+1;
      push()
      imageMode(CENTER)
      //image(this.image.icon, this.posx - radio, this.posy - radio, 2 * radio, 2 * radio);
      if(this.image.size!=null)image(this.image.icon, this.posx, this.posy-radio*0.38, radio*0.7,radio*0.7*this.image.size.h/this.image.size.w)
      pop()
      if (this.counter<milliseconds+4) {
        if (!(this.counter<milliseconds-4)) {
          vel=0.5;
        }
        this.posx=this.posx+(this.deltax*vel);
        this.posy= this.posy+(this.deltay*vel);
        return true;
      } else {
        return false;
      }
      
    },

  };
}
