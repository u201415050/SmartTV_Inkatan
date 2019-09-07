var State = /** @class */ (function () {
    function State(name) {
        this.name = name;
        this.messageCallbacks = {};
        this.onlyMessagesAllowed = [];
    }
    State.prototype.addMessageAllowed = function (message) {
        this.onlyMessagesAllowed.push(message);
    };
    State.prototype.addMessagesAllowed = function (messages) {
        this.onlyMessagesAllowed = this.onlyMessagesAllowed.concat(messages);
    };
    State.prototype.clearMessageAllowed = function () {
        this.onlyMessagesAllowed = [];
    };
    State.prototype.printContent = function () {
        console.log(this.name + ":" + JSON.stringify(Object.keys(this.messageCallbacks)));
    };
    State.prototype.addListener = function (callbackType, callback) {
        this.messageCallbacks[callbackType] = callback;
    };
    return State;
}());
var GlobalState = /** @class */ (function () {
    function GlobalState() {
        this.mapStates = {};
        this.states = [];
        this.stateControllers = [];
    }
    GlobalState.prototype.addState = function (nameState) {
        if (this.mapStates[nameState] == null) {
            this.states.push(nameState);
            this.mapStates[nameState] = this.states.length - 1;
            this.stateControllers.push(new State(nameState));
            console.log("State succesfully added: " + nameState);
        }
        else {
            console.log("This state: " + nameState + " already exists");
        }
    };
    GlobalState.prototype.setCurrentState = function (currentState) {
        if (this.mapStates[currentState] == null) {
            console.log("This state: " + currentState + " doesn't exists");
        }
        else {
            this.currentState = currentState;
            console.log("State succesfully changed: " + currentState);
        }
    };
    GlobalState.prototype.printContent = function () {
        console.log("States: " + this.states);
        this.stateControllers.map(function (x) { return x.printContent(); });
        console.log("MapStates: " + JSON.stringify(this.mapStates));
        console.log("CurrentState: " + this.currentState);
    };
    GlobalState.prototype.addListenertoState = function (state, callbackType, callback) {
        if (this.mapStates[state] == null) {
            console.log("This state: " + state + " doesn't exists");
        }
        else {
            this.stateControllers[this.mapStates[state]].addListener(callbackType, callback);
            console.log("Listener succesfully added: " + state + "-" + callbackType);
        }
    };
    GlobalState.prototype.execute = function (actionObject) {
        console.log(actionObject);
        try {
            this.stateControllers[this.mapStates[this.currentState]].messageCallbacks[actionObject["action"]](actionObject);
        }
        catch (e) {
            console.log("Action in " + this.currentState + " doesn't exist");
        }
    };
    GlobalState.prototype.addMessageAllowed = function (message) {
        this.stateControllers[this.mapStates[this.currentState]].addMessageAllowed(message);
    };
    GlobalState.prototype.addMessagesAllowed = function (messages) {
        this.stateControllers[this.mapStates[this.currentState]].addMessagesAllowed(messages);
    };
    GlobalState.prototype.clearMessageAllowed = function () {
        this.stateControllers[this.mapStates[this.currentState]].clearMessageAllowed();
    };
    return GlobalState;
}());
/*let glob = new GlobalState();
glob.addState("stateone");
glob.addState("statetwo");
glob.setCurrentState("stateone");
glob.printContent();
glob.addListenertoState("statetwo", "start", () => {
  console.log("project started");
});
glob.execute("start");
glob.setCurrentState("statetwo");
glob.execute("start");*/
