//GlobalStateManager
var State = /** @class */ (function () {
    function State(name) {
        this.name = name;
        this.messageCallbacks = {};
        this.blockedMessages = [];
    }
    State.prototype.addBlockedMessage = function (message) {
        this.blockedMessages.push(message);
    };
    State.prototype.addBlockedMessages = function (messages) {
        this.blockedMessages = this.blockedMessages.concat(messages);
    };
    State.prototype.clearBlockedMessages = function () {
        this.blockedMessages = [];
    };
    State.prototype.printContent = function () {
        console.log(this.name + ":" + JSON.stringify(Object.keys(this.messageCallbacks)));
        return {
            state: this.name,
            callbacks: Object.keys(this.messageCallbacks)
        };
    };
    State.prototype.addListener = function (callbackType, callback) {
        var exist = true;
        if (this.messageCallbacks[callbackType] != null) {
            exist = false;
        }
        this.messageCallbacks[callbackType] = callback;
        return exist;
    };
    return State;
}());
/**
 * GlobalState
 * GlobalState permite gestionar las acciones ejecutadas en la aplicacion.
 * Agrupa los mensajes en estados y facilita la asignacion de acciones y su ejecucion
 *
 * @example
 * const globalstate = new GlobalState(
 *    ["WELCOME","MENU","HELP","GAME"] // INITIAL STATES
 * )
 * @todo Initialize GlobalState
 */
var GlobalState = /** @class */ (function () {
    /**
     * @param {String[]} initialstates List of states
     */
    function GlobalState(initialStates) {
        var _this = this;
        this.mapStates = {};
        this.stateControllers = [];
        this.states = [];
        this.mapBlockedActions = {};
        if (initialStates != null) {
            initialStates.map(function (st, i) {
                _this.mapStates[st] = i;
                _this.states.push(st);
                _this.stateControllers.push(new State(st));
            });
        }
    }
    /**
     * Add a new state to the list
     * @param {String} nameState Name of new state
     * @return {Boolean} Return false if state already exists
     *
     * @example
     * var created = globalstate.addState("FIGHT")
     * @todo Create a new state
     *
     */
    GlobalState.prototype.addState = function (nameState) {
        if (this.mapStates[nameState] == null) {
            this.states.push(nameState);
            this.mapStates[nameState] = this.states.length - 1;
            this.stateControllers.push(new State(nameState));
            console.log("State succesfully added: " + nameState);
            if (this.currentState == null) {
                this.setCurrentState(nameState);
            }
            return true;
        }
        else {
            console.log("This state: " + nameState + " already exists");
            return false;
        }
    };
    /**
     * Set a current state
     * @param {String} currentState Name of existing state
     * @return {Boolean} Return false if state doesn't exist
     *
     * @example
     * var setted = globalstate.setCurrentState("MENU")
     * @todo Set a state as current
     *
     */
    GlobalState.prototype.setCurrentState = function (currentState) {
        if (this.mapStates[currentState] == null) {
            console.log("This state: " + currentState + " doesn't exists");
            return false;
        }
        else {
            this.currentState = currentState;
            console.log("State succesfully changed: " + currentState);
            return true;
        }
    };
    /**
     * @typedef {StateInfo} StateInfo State information
     *
     * @property {String} state
     * @property {String[]} callbacks
     */
    /**
     * @typedef {GlobalInfo} GlobalInfo Global information
     *
     * @property {StateInfo[]} states Information of the states
     * @property {String} currentState Current state
     */
    /**
     * Returns GlobalState information
     * @return {GlobalInfo} Returns an object with current information of global state
     *
     * @example
     * var globinfo = globalstate.printContent()
     * @todo Get the current information of the globalstate
     */
    GlobalState.prototype.printContent = function () {
        console.log("States: " + this.states);
        var list = this.stateControllers.map(function (x) { return x.printContent(); });
        console.log("MapStates: " + JSON.stringify(this.mapStates));
        console.log("CurrentState: " + this.currentState);
        return {
            states: list,
            currentState: this.currentState
        };
    };
    /**
     * Add a new listener to a existing state
     * @param {String} state State name to asign the listener
     * @param {String} callbackType Callback name with which the callback will be executed
     * @param {Function} callback Callback function
     *
     * @return {Boolean} Returns false if the state name doesn't exists
     * @example
     * var added = globalstate.addListenertoState("FIGHT","PUNCH",(){
     *    console.log("punch executed")
     * })
     * @todo Add a new listener to a existing state
     */
    GlobalState.prototype.addListenertoState = function (state, callbackType, callback) {
        if (this.mapStates[state] == null) {
            console.log("This state: " + state + " doesn't exists");
            return false;
        }
        else {
            console.log("Listener succesfully added: " + state + "-" + callbackType);
            return this.stateControllers[this.mapStates[state]].addListener(callbackType, callback);
        }
    };
    /**
     * Execute an existing action in the current state
     * @param {Object} actionObject Action information
     * @param {String} actionObject.action Action name
     * @param {*} actionObject.params More params
     *
     * @return {Boolean} Returns false if the action name doesn't exists in current State
     * @example
     * var executed = globalstate.execute({
     *    action: "PUNCH",
     *    speed: 50,
     *    strength: 24
     * })
     * @todo Execute an existing action in the current state
     */
    GlobalState.prototype.execute = function (actionObject) {
        console.log(actionObject);
        try {
            if (this.mapBlockedActions[actionObject["action"]] == null) {
                this.stateControllers[this.mapStates[this.currentState]].messageCallbacks[actionObject["action"]](actionObject);
                return true;
            }
            else
                return false;
        }
        catch (e) {
            console.log("Action "+actionObject["action"]+" in " + this.currentState + " doesn't exist");
            return false;
        }
    };
    /**
     * Add a action to only allowed list
     * @param {String} message Action name
     *
     * @return {Boolean} Returns false if the action name doesn't exists in current State
     * @example
     * var allowed = globalstate.addMessageAllowed("JUMP")
     * @todo Add a action to only allowed list
     */
    GlobalState.prototype.addBlockedAction = function (message) {
        this.mapBlockedActions[message] = true;
        return true;
    };
    GlobalState.prototype.removeBlockedAction = function (message) {
        delete this.mapBlockedActions[message];
        return true;
    };
    GlobalState.prototype.addBlockedActions = function (messages) {
        var _this = this;
        messages.map(function (message) {
            _this.mapBlockedActions[message] = true;
        });
        return true;
    };
    GlobalState.prototype.removeBlockedActions = function (messages) {
        var _this = this;
        messages.map(function (message) {
            delete _this.mapBlockedActions[message];
        });
        return true;
    };
    /**
     * Add a actions to only allowed list
     * @param {String[]} message Action names
     *
     * @return {Boolean} Returns false if the action names don't exist in current State
     * @example
     * var allowed = globalstate.addMessagesAllowed(["JUMP","RUN"])
     * @todo Add a actions to only allowed list
     */
    /**
     * Clear only allowed list to allow all actions in current state
     *
     * @return {Boolean} Returns false if gets a problem
     * @example
     * var cleared = globalstate.clearMessageAllowed()
     * @todo Allow all actions in current state
     */
    GlobalState.prototype.clearBlockedActions = function () {
        this.mapBlockedActions = {};
        return true;
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
