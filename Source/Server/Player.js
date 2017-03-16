// A JSON to load them all would be handy

const Cards = {};

import Dash from "./Cards/Dash.js"
import Bloc from "./Cards/Bloc.js"
import Ghost from "./Cards/Ghost.js"
import Kamikaze from "./Cards/Kamikaze.js"
import Gravity from "./Cards/Gravity.js"
import Revive from "./Cards/Revive.js"

Cards["Dash"] = Dash;
Cards["Bloc"] = Bloc;
Cards["Ghost"] = Ghost;
Cards["Kamikaze"] = Kamikaze;
Cards["Gravity"] = Gravity;
Cards["Revive"] = Revive;

import Blob from "./Blob.js"

class Player {
	constructor(firstPlayer, cards) {
		this._army = [new Blob(), new Blob(), new Blob()];
		this._cards = [new Cards[cards[0]](), new Cards[cards[1]]()];

		if (firstPlayer) {
			this._army[0].setPosition( 0.2, 0.1, 1);
			this._army[1].setPosition( 0.5, 0.1, 1);
			this._army[2].setPosition( 0.8, 0.1, 1);
		} else {
			this._army[0].setPosition( 0.2, 0.9, 3);
			this._army[1].setPosition( 0.5, 0.9, 3);
			this._army[2].setPosition( 0.8, 0.9, 3);
		}

	}

	iterate() { this._army.forEach(blob => { blob.iterate(); }); }

	getArmy() { return this._army; }

	getArmyData() { return [this._army[0].getData(), this._army[1].getData(), this._army[2].getData()]; }

	emit() {} // HumanPlayer overrides this, BotPlayer doesn't

	clear() {}

	_doWeKillIt(blob, enemyBlob) {
		if (Math.sqrt(Math.pow(enemyBlob.x-blob.x, 2) + Math.pow(enemyBlob.y-blob.y, 2)) > 0.04) return false;
		if (!blob.alive || !enemyBlob.alive) return false;
		if (enemyBlob.status == "fury" && blob.status != "fury") return false;
		if (blob.status == "ghost" || enemyBlob.status == "ghost") return false;
		return true;
	}

	iterateCards(enemyPlayer) {
		let toKill = [];
		this._cards.forEach(card => { card.iterate(this._army, enemyPlayer.getArmy()); });
		this._army.forEach((blob) => {
			enemyPlayer.getArmyData().forEach((enemyBlob, enemyId) => {
				if (this._doWeKillIt(blob, enemyBlob)) toKill.push(enemyId);
			});
		});
		return toKill;
	}

	kill(list) { list.forEach((id) => { if (id != null) this._army[id].alive = false; this._army[id].destination = null; }); }

	lost() {
		let deads = 0;
		this._army.forEach((blob) => { if (!blob.alive) deads +=1 ; });
		if (deads == 3) return true;
		return false;
	}

}

// An idle opponent to train on
export class BotPlayer extends Player {

	constructor() {
		super(false, ["Dash", "Bloc"]);
	}

	isStillConnected() { return false; }

}

// A human player with a socket
export class HumanPlayer extends Player {
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
