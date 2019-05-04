import Player from "./Player.js"

class ReinforcementLearning extends Player {
    static socket = null
    static _connected = false
    static waitingConnectionQueue = []
    static id = 0

	constructor(firstPlayer, cards, name) {
        super(firstPlayer, cards);
        this.previousState = null;
        this.actionsTook = null;
        this.id = ReinforcementLearning.id++;
        ReinforcementLearning.socket.emit("create_learning_agent", { id: this.id, name });
        this.hasPlayed = false;
        this.resolveOncePlayed = () => {};
        this.initSocket();
    }

    callResolveOncePlayed = () => this.resolveOncePlayed()

    handleAction = (action) => {
        if (action.type == "server/setDestination") {
            this._army[action.idBlob].destination = action.destination;
        } else if (action.type == "server/triggerCard") {
            this._cards[action.idCard].trigger({idBlob: action.idBlob, destination: action.destination}, this._army);
        }
        this.hasPlayed = true;
        this.resolveOncePlayed();
    }

    initSocket = () => {
        ReinforcementLearning.socket.on("disconnect", this.callResolveOncePlayed);
        ReinforcementLearning.socket.on("action-" + this.id, this.handleAction);
    }

    emit = (data) => {
        ReinforcementLearning.socket.emit("action", { data, agentId: this.id});
    }

    isStillConnected = () => ReinforcementLearning._connected

    static connect = (socket) => {
        ReinforcementLearning.socket = socket;
        ReinforcementLearning.waitingConnectionQueue.forEach(resolve => resolve());
        ReinforcementLearning.waitingConnectionQueue = [];
        socket.on("disconnect", () => { ReinforcementLearning._connected = false; });
        ReinforcementLearning._connected = true;
    }

    static waitUntilConnected = async () => {
        if (ReinforcementLearning._connected) return;
        await new Promise(resolve => { ReinforcementLearning.waitingConnectionQueue.push(resolve) });
    }

    hasntPlayed = () => { this.hasPlayed = false; }

    checkIfHasPlayed = () => this.hasPlayed || new Promise((resolve) => { this.resolveOncePlayed = resolve; })

    terminate = () => {
        ReinforcementLearning.socket.emit("terminate_agent", { agentId: this.id});
        ReinforcementLearning.socket.removeListener("disconnect", this.callResolveOncePlayed);
        ReinforcementLearning.socket.removeListener("action-" + this.id, this.handleAction);
    }
}

export default ReinforcementLearning;