import Player from "./Player.js"

// A human player with a socket
export default class HumanPlayer extends Player {
	constructor(socket, firstPlayer, data) {
		super(firstPlayer, data);
		this._socket = socket;
		this._initSockets();
		this._connected = true;

	}

	_initSockets() {
		this._socket.on("setDestination", (data) => { this._army[data.id].destination = {x: data.x, y: data.y}; });
		this._socket.on("disconnect", () => { this._connected = false; });
		this._socket.on("triggerCard", (data) => {
			this._cards[data.id].trigger(data, this._army);
		});

	}

	clear() {
		this._socket.removeAllListeners("setDestination");
		this._socket.removeAllListeners("disconnect");
		this._socket.removeAllListeners("triggerCard");
	}

	isStillConnected() { return this._connected; }

	emit(name, data) { this._socket.emit(name, data); }

}
