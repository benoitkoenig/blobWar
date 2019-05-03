import Player from "./Player.js"

// A human player with a socket
class HumanPlayer extends Player {
	name = "HumanPlayer"

	constructor(socket, firstPlayer, data) {
		super(firstPlayer, data);
		this._socket = socket;
		this._initSockets();
		this._connected = true;
	}

	_initSockets = () => {
		this._socket.on("action", (action) => {
			if (action.type == "server/setDestination") {
				this._army[action.idBlob].destination = action.destination;
			} else if (action.type == "server/triggerCard") {
				this._cards[action.idCard].trigger({idBlob: action.idBlob, destination: action.destination}, this._army);
			}
		});
		this._socket.on("disconnect", () => { this._connected = false; });
	}
	
	clear = () => {
		this._socket.removeAllListeners("action");
		this._socket.removeAllListeners("disconnect");
	}
	
	isStillConnected = () => this._connected;
	
	emit = (data) => { this._socket.emit("action", data); }
}

export default HumanPlayer;
