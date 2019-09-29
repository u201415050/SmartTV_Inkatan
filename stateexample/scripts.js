var globalstate = new GlobalState();
var first = true;
    function add(action) {
        $("#consola").text(action);
        
    }

    function addState() {
        var state = $('#field').val();
        var valid = globalstate.addState(state);
        if (valid) {
            $("#stateList").append(
                `<div class="state" >${state}</div><button  onclick="addCall('${state}')" >AGREGAR</button><button id="${state}" onclick="setCurrent('${state}')" >ACTUAL</button><br>`
            );
            if(first){
                setCurrent(state)
            }
        } else {
            alert("Ya existe ese estado");
        }
    }

    function setCurrent(state) {
        var valid = globalstate.setCurrentState(state);
        $("#current").text(state);
        if (valid)
            if(!first) alert(`${state} es actual.`); else first=false
        else
            alert(`${state} no existe.`)
    }

    function addCall(state) {
        var action = prompt("Porfavor ingrese una accion",
            "action");
            if(action){
        var valid = globalstate.addListenertoState(state, action, () => {
            //alert(`executed ${action}`);
        });
        if (valid) {
            $(` <div class="action">
                    <input class="checks" id="check${state}${action}" type="checkbox" checked="true" onclick="check('${state}','${action}')"/>  ${action}
                </div>`).insertAfter($(`#${state}`));
        } else {
            alert(`${action} ya existe en ${state}.`)
        }
    }
    }
    function check(state,action){
        var c = $(`#check${state}${action}`).is(":checked")
        if(c) {
            
            globalstate.removeBlockedAction(action);
            $(`#bad${state}${action}`).remove()
        }
        else {
            globalstate.addBlockedAction(action);
            $("#badlist").append(`<div class="blockeds" id="bad${state}${action}">${action}<div>`)
        }
    }
    function execute() {
        var action = $('#exfield').val();
        add(action);
        var valid = globalstate.execute({
            action: action
        });



        $('#consola').removeClass("success")
        $('#consola').removeClass("failed")
        if (valid) {
            $('#consola').addClass("success")
        } else {
            $('#consola').addClass("failed")
            //alert(`${action} doesn't exist`)
        }
    }
    function clearBlocked(){
        globalstate.clearBlockedActions();
        $('.checks').prop("checked",true)
        $('.blockeds').remove();
    }