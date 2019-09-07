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
    draw: function(value) {
      push();
      stroke('rgba(255,255,255,0.5)');
      strokeWeight(radio * 0.05);
      fill(value ? value : PlayersDetails[turnIndex].color);
      // textSize(32);
      
      ellipse(this.posx, this.posy, radio *  0.35, radio * 0.35);
      // fill(0, 0, 0);
      // text(this.iIndex.toString() + this.jIndex.toString(), this.posx, this.posy)
      pop();
    },
    getAdyacentsAristas: function() {
      const listvalid = [];
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
    drawPorto: function() {
      push();
      stroke('rgba(60,60,60,0.3)');
      fill('rgba(100,100,100,1)');
      rectMode(CENTER);
      // beginShape()
      // ellipse(this.posx, this.posy - radio * 0.25, radio * 0.50, radio * 0.50)
      rect(this.posx + radio * 0.10, this.posy - radio * 0.10, radio * 0.50, radio * 0.50);
      quad(this.posx - radio * 0.15, this.posy - radio * 0.35,
          this.posx + radio * 0.35, this.posy - radio * 0.35,
          this.posx + radio * 0.25, this.posy - radio * 0.25,
          this.posx - radio * 0.25, this.posy - radio * 0.25);
      quad(this.posx + radio * 0.35, this.posy - radio * 0.35,

          this.posx + radio * 0.25, this.posy - radio * 0.25,

          this.posx + radio * 0.25, this.posy + radio * 0.25,
          this.posx + radio * 0.35, this.posy + radio * 0.15);
      rect(this.posx, this.posy, radio * 0.50, radio * 0.50);
      fill('rgba(30,30,30,0.2)');
      rect(this.posx - radio * 0.125, this.posy - radio * 0.20, radio * 0.25, radio * 0.10);
      rect(this.posx + radio * 0.125, this.posy - radio * 0.10, radio * 0.25, radio * 0.10);
      rect(this.posx - radio * 0.125, this.posy, radio * 0.25, radio * 0.10);
      rect(this.posx + radio * 0.125, this.posy + radio * 0.10, radio * 0.25, radio * 0.10);
      rect(this.posx - radio * 0.125, this.posy + radio * 0.20, radio * 0.25, radio * 0.10);
      // endShape()
      pop();
    },
    drawHouse: function(value) {
      push();
      const turn=value.id==turnIndex;
      stroke('rgba(0,0,0,'+(turn?'0.5':'0.5')+')');
      strokeWeight(radio * 0.05);
      fill(value ? turn?value.colorTotal:value.colorOpacity : PlayersDetails[turnIndex].color);
      // textSize(32);
      ellipse(this.posx, this.posy, radio *  (this.big?0.5: 0.35), radio * (this.big?0.5: 0.35));
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
    drawWay: function(value) {
      // ellipse(this.posx, this.posy, 50,10)
      const turn=value.id==turnIndex;
      fill(value ? turn?value.colorTotal:value.colorOpacity : PlayersDetails[turnIndex].color);

      const angulo = Math.atan((this.start.posy - this.end.posy) / (this.start.posx - this.end.posx));
      push();
      stroke('rgba(0,0,0,'+(turn?'0.5':'0.5')+')');
      strokeWeight(radio * 0.05);
      translate((this.start.posx + this.end.posx) / 2, (this.start.posy + this.end.posy) / 2);
      rotate(angulo);
      // console.log(ind, ind2)
      // line(objLine[0].posx, objLine[0].posy, objLine[1].posx, objLine[1].posy)
      // text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
      rectMode(CENTER);
      rect(0, 0, radio * 0.8, radio * 0.2, 3, 3, 3, 3);
      // image(img,-sideTriangle*0.6/2, -15, sideTriangle*0.6, 30)
      pop();
      textAlign(CENTER, CENTER);
      fill('black');

      // text(this.iIndex+'-'+this.jIndex,(this.start.posx+this.end.posx)/2,(this.start.posy+this.end.posy)/2)
    },
    draw: function(value) {
      // ellipse(this.posx, this.posy, 50,10)
      fill(value ? value : PlayersDetails[turnIndex].color);

      const angulo = Math.atan((this.start.posy - this.end.posy) / (this.start.posx - this.end.posx));
      push();
      stroke('rgba(255,255,255,0.5)');
      strokeWeight(radio * 0.05);
      translate((this.start.posx + this.end.posx) / 2, (this.start.posy + this.end.posy) / 2);
      rotate(angulo);
      // console.log(ind, ind2)
      // line(objLine[0].posx, objLine[0].posy, objLine[1].posx, objLine[1].posy)
      // text(angulo, (objLine[0].posx + objLine[1].posx) / 2, (objLine[0].posy + objLine[1].posy) / 2)
      rectMode(CENTER);
      rect(0, 0, radio * 0.8, radio * 0.2, 3, 3, 3, 3);
      // image(img,-sideTriangle*0.6/2, -15, sideTriangle*0.6, 30)
      pop();
      textAlign(CENTER, CENTER);
      fill('black');

      // text(this.iIndex+'-'+this.jIndex,(this.start.posx+this.end.posx)/2,(this.start.posy+this.end.posy)/2)
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
    draw: function() {
      image(this.resource.icon, this.origin.posx - radio, this.origin.posy - radio, 2 * radio, 2 * radio);
      fill(this.resource ? this.resource.color : 'black');

      quad(this.origin.posx - radio, this.origin.posy,
          this.origin.posx, this.origin.posy + radio,
          this.origin.posx + radio, this.origin.posy,
          this.origin.posx, this.origin.posy - radio);

      if (this.number.tag != 7) {
        textAlign(CENTER, CENTER);
        fill('black');
        fill('rgba(0,0,0,0.4)');
        ellipse(this.origin.posx + (radio * 0.025), this.origin.posy + (radio * 0.025), radio * 0.4, radio * 0.4);
        fill('lightgrey');
        stroke('rgba(0,0,0,0.7)');
        ellipse(this.origin.posx, this.origin.posy, radio * 0.4, radio * 0.4);
        fill('black');
        textSize((radio * 0.25));
        text(this.number.tag, this.origin.posx, this.origin.posy);
      }

      // this.origin.draw()
      // origin.draw()
    },
    drawSelection: function(opacity) {
      push();
      noFill();
      stroke('white');
      strokeWeight(radio*0.07);
      quad(this.origin.posx - radio, this.origin.posy,
          this.origin.posx, this.origin.posy + radio,
          this.origin.posx + radio, this.origin.posy,
          this.origin.posx, this.origin.posy - radio);

      pop();
      // origin.draw()
    },
    drawActive: function(opacity) {
      fill(opacity ? PlayersDetails[turnIndex].colorOpacity : PlayersDetails[turnIndex].color);
      quad(this.origin.posx - radio, this.origin.posy,
          this.origin.posx, this.origin.posy + radio,
          this.origin.posx + radio, this.origin.posy,
          this.origin.posx, this.origin.posy - radio);


      // origin.draw()
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
      image(mapa.images.knight, list[this.iIndex][this.jIndex].origin.posx - (radio * 0.4725 / 2), -(radio*0.7)+ list[this.iIndex][this.jIndex].origin.posy - (radio / 2), radio * 0.4725, radio);
    },
  };
}

function Mapa() {
  return {
    listRombos: [],
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
      this.images.knight = loadImage('assets/knight.png');
    },
    setup: function() {
      for (var i = 0; i < this.altura; i++) {
        const padd = (i % 2 == 0 ? radio : 0) + radio;
        for (var j = 0; j < (i % 2 == 0 ? 5 : 6); j++) {
          const origen = Vertice(i, j, paddingLeft + padd + (radio * 2 * j), paddingHeight + radio + (radio * i));
          const resource = this.resources.getRandom();
          const number = resource.name == 'desierto' ? {
            tag: 7,
          } : this.numbers.getRandom();
          if (resource.name == 'desierto') {
            this.knight = new Knight(i, j);
          }
          const rombo = Rombo(origen, resource, number, resource.name == 'desierto');
          this.setSides(rombo);
          if (this.listRombos[i] == null) {
            this.listRombos[i] = [];
          }
          this.listRombos[i][j] = rombo;
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
              ResourcesController([message]);
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

          const listAdj = this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].getAdyacents();
          const tempListPoints = this.listPoints;
          listAdj.map(function(ad) {
            if (ad.fi >= 0 && ad.fj >= 0) {
              if (tempListPoints[ad.fi] != null) {
                if (tempListPoints[ad.fi][ad.fj] != null) {
                  const tempTaken = tempListPoints[ad.fi][ad.fj].taken;
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
              ResourcesController([message]);
            }

            // sendMessageServer(
            //  newMessage
            // )
            this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].taken = turnIndex;
            this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj].big = false;
            player.houses.push(this.listPoints[player.indicators.vertice.fi][player.indicators.vertice.fj]);
            if (ActualParameters.gamemode=='expansion') {
              if (100*player.houses.length/68>=parseInt(ActualParameters.gamevalue)) {
                modal.show('El ganador es '+player.name, 10);
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
      } else if (this.select == 'arista') {
        var reason = '';
        if (this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj].taken.toString() == '') {
          const current = this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj];
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
              ResourcesController([message]);
            }

            this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj].taken = turnIndex;
            player.ways.push(this.listAristas[player.indicators.arista.fi][player.indicators.arista.fj]);
            player.longRoad = GetLongRoadPlayer(player.id);
            ProcessLongRoad();
            console.log(player);
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

            game.ChangeStatus('ROUND');

            PaseTurno();
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
          for (var index = 0; index < this.ruleta.list.length; index++) {
            if (this.listRombos[this.ruleta.list[index].fi]) {
              if (this.listRombos[this.ruleta.list[index].fi][this.ruleta.list[index].fj]) {
                const rombo = this.listRombos[this.ruleta.list[index].fi][this.ruleta.list[index].fj];
                if (this.ruleta.index != index) {
                  rombo.drawActive(!this.ruleta.opacity);
                }
              }
            }
          }
        }
        if (this.ruleta.type == 'run') {
          this.ruleta.tempo = this.ruleta.tempo >= this.ruleta.pivot ? 0 : this.ruleta.tempo + 1;
          if (this.ruleta.tempo >= this.ruleta.pivot) {
            // if (this.ruleta.index == 3) {
            this.ruleta.pivot = this.ruleta.pivot + this.ruleta.pivot * 0.2;
            this.ruleta.tempo = 0;
            // }
            this.ruleta.index = this.ruleta.index == 3 ? 0 : this.ruleta.index + 1;

            if (this.ruleta.pivot >= 30) {
              const that = this;
              setTimeout(function() {
                that.ruleta.type = 'asign';
              }, 2000);
              this.ruleta.type = 'stop';
              this.ruleta.opacity = true;
              this.ruleta.tempo = 0;
            }
          }
        }
        if (this.ruleta.type == 'stop') {
          this.ruleta.tempo = this.ruleta.tempo + 1;
          if (this.ruleta.tempo == 10) {
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
      this.listRombos.map(function(rombos) {
        rombos.map(function(rombo) {
          rombo.draw();
        });
      });
      const list = this.listPoints;


      this.spinAnimation();
      dice.draw();
      this.actualSections.map(function(rombo) {
        rombo.drawSelection();
      });
      portos.map(function(item) {
        list[item.fi][item.fj].drawPorto();
      });
      this.printKnight();
      /* this.listPoints.map(function (points) {
                points.map(function (point) {
                    point.draw()
                })
            })*/
      /* this.listAristas.map(function(aristas){
                aristas.map(function(arista){
                    arista.draw()
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
      const result = {
        good: [],
        bad: [],
      };
      for (var index = 0; index < listAround.length; index++) {
        if (this.listRombos[listAround[index].fi]) {
          if (this.listRombos[listAround[index].fi][listAround[index].fj]) {
            const rombo = this.listRombos[listAround[index].fi][listAround[index].fj];
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
      const listAround = this.listPoints[fi][fj].getAround();
      const result = this.areValidate(listAround);

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
                  listasignanimation.push(MoveItem(rombo.origin.posx, rombo.origin.posy, PlayersDetails[turnIndex].avatar.posx, PlayersDetails[turnIndex].avatar.posy, 20, rombo.resource.icon));

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
          ResourcesController([message]);

          // console.log(listresources)
          this.ruleta.type='asign_animation';
          this.asignAnimation={
            player: turnIndex,
            list: listasignanimation,
            back: back,
          };
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
            pivot: 2,
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
                    listasignanimation.push(MoveItem(rombo.origin.posx, rombo.origin.posy, PlayersDetails[turnIndex].avatar.posx, PlayersDetails[turnIndex].avatar.posy, 20, rombo.resource.icon));
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
            ResourcesController([message]);
            this.ruleta.type='asign_animation';
            this.asignAnimation={
              player: turnIndex,
              list: listasignanimation,
              back: back,
            };
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
      const response = this.findNumbers(val);
      const result = {};
      PlayersDetails.map(function(playerItem) {
        result[playerItem.name] = {};
      });
      // console.log(response)
      const listValidate = this.listPoints;
      const elements = response.filter(function(item) {
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
      const messageArray = [];
      Entries(result).map(function(value) {
        const newMessage = {
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
      ResourcesController(messageArray);
      console.log(result);
      PaseTurno();
    },
    findNumbers: function(val) {
      const listOrigin = [];
      const listRequest = [];
      const tabs = ['left', 'right', 'up', 'down'];
      const knight = this.knight;
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

  };
}

function Dice() {
  return {
    value: [],
    show: true,
    execute: false,
    draw: function() {
      if (this.value.length > 0) {
        push();
        fill('white');
        rectMode(CENTER);
        const size = paddingLeft * 0.4;
        rect(paddingLeft * 0.25, heightCanvas / 2, paddingLeft * 0.4, paddingLeft * 0.4, paddingLeft * 0.02);
        rect(paddingLeft * 0.70, heightCanvas / 2, paddingLeft * 0.4, paddingLeft * 0.4, paddingLeft * 0.02);
        this.drawPoints(this.value[0], true);
        this.drawPoints(this.value[1], false);
        pop();
      }
    },
    drawPoints: function(value, first) {
      const size = paddingLeft * 0.4;
      const center = first ? paddingLeft * 0.25 : paddingLeft * 0.70;
      if (value == 1) {
        fill('black');
        ellipse(center, heightCanvas / 2, size / 7);
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
        this.value = [1 + Math.floor(Math.random() * 100) % 6, 1 + Math.floor(Math.random() * 100) % 6];
        if (this.value[0] + this.value[1] != 7) {
          mapa.asignResources(this.value[0] + this.value[1]);
        } else {
          const message = {
            name: PlayersDetails[turnIndex].name,
          };
          KnightController(message);
        }
      }
    },
  };
}

function MoveItem(posx, posy, fposx, fposy, milliseconds, icon) {
  return {
    posx: posx,
    posy: posy,
    fposx: fposx,
    fposy: fposy,
    milliseconds: milliseconds,
    deltax: (-1)*(posx-fposx) / (milliseconds),
    deltay: (-1)*(posy-fposy) / (milliseconds),
    image: icon,
    counter: 0,
    draw: function() {
      fill('black');
      var vel=1;
      this.counter=this.counter+1;
      quad(this.posx - radio, this.posy,
          this.posx, this.posy + radio,
          this.posx + radio, this.posy,
          this.posx, this.posy - radio);

      image(this.image, this.posx - radio, this.posy - radio, 2 * radio, 2 * radio);

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
