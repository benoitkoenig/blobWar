import Player from "./Player.js"

class BotReinforcementLearning extends Player {
    static socket = null
    static _connected = false
    static id = 0

	constructor(firstPlayer, training) {
        super(firstPlayer, ["Dash", "Dash"]);
        this.previousState = null;
        this.actionsTook = null;
        this.training = training;
        this.id = BotReinforcementLearning.id++;
        BotReinforcementLearning.socket.emit("create_learning_agent", { id: this.id });
        this.hasPlayed = false;
        this.resolveOncePlayed = () => {};
        this.initSocket();
    }

    initSocket = () => {
        BotReinforcementLearning.socket.on("action-" + this.id, (action) => {
            if (action.type == "server/setDestination") {
				this._army[action.idBlob].destination = action.destination;
			} else if (action.type == "server/triggerCard") {
				this._cards[action.idCard].trigger({idBlob: action.idBlob, destination: action.destination}, this._army);
            }
            this.hasPlayed = true;
            this.resolveOncePlayed();
		});
    }

    emit = (data) => {
        BotReinforcementLearning.socket.emit("action", { data, agentId: this.id});
    }

    isStillConnected = () => BotReinforcementLearning._connected

    static connect = (socket) => {
        BotReinforcementLearning.socket = socket;
		socket.on("disconnect", () => { BotReinforcementLearning._connected = false; });
        BotReinforcementLearning._connected = true;
    }

    hasntPlayed = () => { this.hasPlayed = false; }

    checkIfHasPlayed = () => this.hasPlayed || new Promise((resolve) => { this.resolveOncePlayed = resolve; })
}

export default BotReinforcementLearning;
