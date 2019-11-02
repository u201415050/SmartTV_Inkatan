function Cards() {
    return {

        action: function (type, player) {
            if(player==turnIndex){
                if (type == card_names.GRAN_INCA) {
                    this.gran_inca_action(player)
                } else if (type == card_names.AGRICULTOR) {
                    this.agricultor_action(player)
                } else if (type == card_names.CURACA) {
                    this.curaca_action(player)
                } else if (type == card_names.DIOS_DE_LOS_DADOS) {
                    this.dios_de_los_dados_action(player)
                } else if (type == card_names.TUCUY) {
                    this.tucuy_action(player)
                } else if (type == card_names.RUNA) {
                    this.knight_action(player)
                } else if (type == card_names.MINERIA) {
                    this.mineria_action(player)
                } else if (type == card_names.OBRERO) {
                    this.obrero_action(player)
                }
            }
            console.log(PlayersDetails)
        },
        gran_inca_action: function (player) {

            for (var i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cant = PlayersDetails[i].resources.gold > 2 ? 2 : PlayersDetails[i].resources.gold
                    var newMessage = {
                        name: PlayersDetails[i].name,
                        resource: [{
                            name: 'gold',
                            amount: cant * -1
                        }]
                    }
                    var secondMessage = {
                        name: PlayersDetails[player].name,
                        resource: [{
                            name: 'gold',
                            amount: cant
                        }]
                    }
                    ResourcesController([newMessage,secondMessage],true)
                }
            }
            
        },
        agricultor_action: function (player) {

            for ( var i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cantPotato = PlayersDetails[i].resources.potato > 2 ? 2 : PlayersDetails[i].resources.potato
                    var cantQuinoa = cantPotato < 2 ? PlayersDetails[i].resources.quinoa > 2 - cantPotato ? 1 : PlayersDetails[i].resources.quinoa : 0
                    var newMessage = {
                        name: PlayersDetails[i].name,
                        resource: [{
                            name: 'potato',
                            amount: cantPotato * -1
                        }, {
                            name: 'quinoa',
                            amount: cantQuinoa * -1
                        }]
                    }
                    var secondMessage = {
                        name: PlayersDetails[player].name,
                        resource: [{
                            name: 'potato',
                            amount: cantPotato
                        }, {
                            name: 'quinoa',
                            amount: cantQuinoa
                        }]
                    }

                    ResourcesController([newMessage,secondMessage],true)
                }
            }
            
        },
        curaca_action: function (player) {

            for (var i = 0; i < PlayersDetails.length; i++) {
                if (i != player) {
                    var cant = PlayersDetails[i].resources.wood > 2 ? 2 : PlayersDetails[i].resources.wood
                    var newMessage = {
                        name: PlayersDetails[i].name,
                        resource: [{
                            name: 'wood',
                            amount: cant * -1
                        }]
                    }
                    var secondMessage = {
                        name: PlayersDetails[player].name,
                        resource: [{
                            name: 'wood',
                            amount: cant
                        }]
                    }
                    ResourcesController([newMessage,secondMessage],true)
                }
            }
            
        },
        dios_de_los_dados_action: function (player) {


            
        },
        tucuy_action: function (player) {
            game.data = {
                cant: 2,
                actualData: PlayersDetails[player].ways.length,
                index: player
            }
            glob.setCurrentState("BUILD");
            console.log(game.data)
            game.ChangeStatus("CARD")
        },
        knight_action: function (player) {
            console.log(player)
            var data = {
                name: PlayersDetails[turnIndex].name
            }
           KnightController(data)
        },
        mineria_action: function (player) {
            var cant = {}
            PlayersDetails[turnIndex].houses.map(function(item){
                var listAdj=item.getAround()
                listAdj.map(function(around){
                    if(mapa.listRombos[around.fi]!=null){
                        if(mapa.listRombos[around.fi][around.fj]!=null){
                            if(mapa.listRombos[around.fi][around.fj].resource.type=="stone"){
                                cant[mapa.listRombos[around.fi][around.fj].id]=true
                            }
                        }
                    }
                })
            })
            console.log(cant)
            console.log(Entries(cant).length)
            var message = {
                name: PlayersDetails[turnIndex].name,
                resource: [{
                    name: 'stone',
                    amount: Entries(cant).length
                }]
            }
            ResourcesController([message],true)
            /*var newMessage = {
                player: PlayersDetails[player].name,
                action: "knight"
            }
            sendMessageServer(
                newMessage
            )
            game.ChangeStatus('KNIGHT')
            PlayersDetails[player].indicators.rombo.fi = mapa.knight.iIndex
            PlayersDetails[player].indicators.rombo.fj = mapa.knight.jIndex*/
        },
        obrero_action:function (player) {
            SetBuildMode({
                player:PlayersDetails[turnIndex].name,
                type:'h',
                amount:1
            })
            glob.setCurrentState("BUILD");
            /*var newMessage = {
                player: PlayersDetails[player].name,
                action: "knight"
            }
            sendMessageServer(
                newMessage
            )
            game.ChangeStatus('KNIGHT')
            PlayersDetails[player].indicators.rombo.fi = mapa.knight.iIndex
            PlayersDetails[player].indicators.rombo.fj = mapa.knight.jIndex*/
        },

    }
}