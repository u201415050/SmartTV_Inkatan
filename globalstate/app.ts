class State {
  name: string;
  messageCallbacks: Object;
  onlyMessagesAllowed: string[];
  constructor(name: string) {
    this.name = name;
    this.messageCallbacks = {};
    this.onlyMessagesAllowed = [];
  }
  addMessageAllowed(message: string) {
    this.onlyMessagesAllowed.push(message);
  }
  addMessagesAllowed(messages: string[]) {
    this.onlyMessagesAllowed = [...this.onlyMessagesAllowed, ...messages];
  }
  clearMessageAllowed() {
    this.onlyMessagesAllowed = [];
  }
  printContent() {
    console.log(
      this.name + ":" + JSON.stringify(Object.keys(this.messageCallbacks))
    );
  }
  addListener(callbackType: string, callback: Function) {
    this.messageCallbacks[callbackType] = callback;
  }
}

class GlobalState {
  currentState: string;
  states: string[];
  mapStates: Object;
  stateControllers: State[];
  constructor() {
    this.mapStates = {};
    this.states = [];
    this.stateControllers = [];
  }
  addState(nameState: string) {
    if (this.mapStates[nameState] == null) {
      this.states.push(nameState);
      this.mapStates[nameState] = this.states.length - 1;
      this.stateControllers.push(new State(nameState));
      console.log("State succesfully added: " + nameState);
    } else {
      console.log("This state: " + nameState + " already exists");
    }
  }
  setCurrentState(currentState: string) {
    if (this.mapStates[currentState] == null) {
      console.log("This state: " + currentState + " doesn't exists");
    } else {
      this.currentState = currentState;
      console.log("State succesfully changed: " + currentState);
    }
  }
  printContent() {
    console.log("States: " + this.states);
    this.stateControllers.map(x => x.printContent());
    console.log("MapStates: " + JSON.stringify(this.mapStates));
    console.log("CurrentState: " + this.currentState);
  }
  addListenertoState(state: string, callbackType: string, callback: Function) {
    if (this.mapStates[state] == null) {
      console.log("This state: " + state + " doesn't exists");
    } else {
      this.stateControllers[this.mapStates[state]].addListener(
        callbackType,
        callback
      );
      console.log("Listener succesfully added: " + state + "-" + callbackType);
    }
  }
  execute(actionObject: Object) {
    console.log(actionObject);
    try {
      this.stateControllers[this.mapStates[this.currentState]].messageCallbacks[
        actionObject["action"]
      ](actionObject);
    } catch (e) {
      console.log("Action in " + this.currentState + " doesn't exist");
    }
  }
  addMessageAllowed(message: string) {
    this.stateControllers[this.mapStates[this.currentState]].addMessageAllowed(
      message
    );
  }
  addMessagesAllowed(messages: string[]) {
    this.stateControllers[this.mapStates[this.currentState]].addMessagesAllowed(
      messages
    );
  }
  clearMessageAllowed() {
    this.stateControllers[
      this.mapStates[this.currentState]
    ].clearMessageAllowed();
  }
}

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
