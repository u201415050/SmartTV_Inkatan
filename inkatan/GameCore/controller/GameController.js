function Game() {
    return {
        status: 'START',
        iterator: 1,
        pivot: 1,
        data: {},
        Game: function (obj, players) {
            if (this.status == "START") {
                this.START_PROCESS(obj, players)
            } else if (this.status == "ROUND") {
                this.ROUND_PROCESS()
            } else if (this.status == "CARD") {
                this.CARD_PROCESS()
            } else if (this.status == "KNIGHT") {
                this.KNIGHT_PROCESS()
            } else if (this.status == "BUILD") {
                this.BUILD_PROCESS()
            }

        },
        ChangeStatus: function (status) {
            if(status=="ROUND"){
                glob.setCurrentState("TURN");
            }

            this.status = status
        },
        START_PROCESS: function (obj, players) {
            if (this.iterator == 1) {
                obj.select = 'vertice'

                this.iterator = 2
            }
            if (this.iterator == 2) {
                if (players[turnIndex].houses.length == this.pivot) {
                    var listvalid=players[turnIndex].houses[players[turnIndex].houses.length-1].getAdyacentsAristas()
                    players[turnIndex].indicators.arista = listvalid[0];
                    
                    obj.changeSelect()
                    
                    this.iterator = 3
                }
            }
            if (this.iterator == 3) {
                if (players[turnIndex].ways.length == this.pivot) {

                    if (turnIndex + 1 == players.length && this.pivot != 2) {
                        this.pivot = 2
                    } else {
                        if (this.pivot == 2) {
                            if (turnIndex == 0) {
                                obj.getResources(players[turnIndex].houses[1].iIndex, players[turnIndex].houses[1].jIndex, false)
                                //console.log(PlayersDetails)
                                //this.status = "DEAL"
                            } else {
                                obj.getResources(players[turnIndex].houses[1].iIndex, players[turnIndex].houses[1].jIndex, true)

                            }
                        } else {
                            PaseTurno()
                        }
                    }
                    this.iterator = 1
                }
            }
        },
        ROUND_PROCESS: function () {

        },
        BUILD_PROCESS: function () {
            if(this.data!={}){
                if(PlayersDetails[this.data.player][this.data.type=='h'?'houses':'ways'].length-1==this.data.previous){
                    this.status="ROUND"
                    glob.setCurrentState("TURN");
                    this.data={}
                    mapa.select=''
                    
                }
            }
        },
        CARD_PROCESS: function () {
            mapa.select = 'arista'
            if (PlayersDetails[this.data.index].ways.length == this.data.actualData + this.data.cant) {
                mapa.select = ''
                game.data = {}
                this.ChangeStatus("ROUND")
                console.log(PlayersDetails)
            }
        },
        KNIGHT_PROCESS: function () {
            mapa.select = "rombo"
        },
        ExitBuildProcess:function(){
            this.status="ROUND"
                    glob.setCurrentState("TURN");
                    this.data={}
                    mapa.select=''
        }
    }
}