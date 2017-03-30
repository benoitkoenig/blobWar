import Ev from "./Ev";
import io from 'socket.io-client';

export default class NodeConnection extends Ev {
	// Node connection mostly consists in the socket
	constructor(cards, displayer) {
		super();
		if (document.location.href == "chrome-extension://ppgjjdfalfmimoecbfhpggbmofjmpani/Client/index.html") {
			// This is nw
			this._socket = io.connect("http://blobwar.herokuapp.com/");
		} else {
			this._socket = io.connect(document.location.href);
		}
		this.endOfGameValue = null; // The only stored value, to know who won
		this._displayer = displayer;
		this._cards = cards;
		this._endOfGame = this._endOfGame.bind(this);
	}

	_update(data) {
		this.trigger("update", data);
	}

	_endOfGame(data) {
		this.endOfGameValue = data;
		this._displayer.trigger("Alert", "EndOfGame");
		this._socket.off("update");
		this._socket.off("endOfGame");
	}

	// start the match making
	init() {
		this._socket.off("countDownToGame");
		this._socket.on("update", (data) => {this.trigger("update", data)});
		this._socket.on("endOfGame", this._endOfGame);
		this._socket.on("countDownToGame", (timeLeft) => { this.trigger("countDownToGame", timeLeft); });
		this._socket.emit("MatchMaking", [this._cards.getCard(0), this._cards.getCard(1)]);
		this.trigger("lookingForOpponent");
	}

	// Start the game against an idle opponent
	initBotGame() {
		this._socket.on("update", (data) => {this.trigger("update", data)});
		this._socket.on("endOfGame", this._endOfGame);
		this._socket.emit("PlayAgainstBot", [this._cards.getCard(0), this._cards.getCard(1)]); // How comes cards are defined here ?
	}

	initTrainingGame() {
		this._socket.on("update", (data) => {this.trigger("update", data)});
		this._socket.on("endOfGame", this._endOfGame);
		this._socket.emit("PlayAgainstIdle", [this._cards.getCard(0), this._cards.getCard(1)]);
	}

	cancelMatchMaking() {
		this._socket.emit("cancelMatchMaking");
	}

	// blobDestination and triggerCard are all the player can send to the server ingame

	blobDestination(id, pos) {
		this._socket.emit("setDestination", {id: id, x: pos.x, y: pos.y});
	}

	triggerCard(id, idBlob, pos) {
		this._socket.emit("triggerCard", {id: id, idBlob: idBlob, destination: pos});
	}

}