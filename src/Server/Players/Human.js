import Player from "./Player.js"

// A human player with a socket
class HumanPlayer extends Player {
	constructor(socket, firstPlayer, data) {
		super(firstPlayer, data);
		this._socket = socket;
		this._initSockets();
		this._connected = true;
	}
}

HumanPlayer.prototype._initSockets = function() {
	this._socket.on("action", (action) => {
		if (action.type == "server/setDestination") {
			this._army[action.idBlob].destination = action.destination;
		} else if (action.type == "server/triggerCard") {
			this._cards[action.idCard].trigger({idBlob: action.idBlob, destination: action.destination}, this._army);
		}
	});
	this._socket.on("disconnect", () => { this._connected = false; });

}

HumanPlayer.prototype.clear = function() {
	this._socket.removeAllListeners("server/setDestination");
	this._socket.removeAllListeners("server/disconnect");
	this._socket.removeAllListeners("server/triggerCard");
}

HumanPlayer.prototype.isStillConnected = function() { return this._connected; }

HumanPlayer.prototype.emit = function(data) { this._socket.emit("action", data); }

export default HumanPlayer;
