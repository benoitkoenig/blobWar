import Dash from "../Cards/Dash.js"
import Bloc from "../Cards/Bloc.js"
import Ghost from "../Cards/Ghost.js"
import Kamikaze from "../Cards/Kamikaze.js"
import Gravity from "../Cards/Gravity.js"
import Revive from "../Cards/Revive.js"
import Switch from "../Cards/Switch.js"
import Orbit from "../Cards/Orbit.js"

const Cards = {
	Dash: Dash,
	Bloc: Bloc,
	Ghost: Ghost,
	Kamikaze: Kamikaze,
	Gravity: Gravity,
	Revive: Revive,
	Switch: Switch,
	Orbit: Orbit
}

import Blob from "../Blob.js"

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
}

Player.prototype.getArmy = function() { return this._army; }

Player.prototype.getArmyData = function() { return [this._army[0].getData(), this._army[1].getData(), this._army[2].getData()]; }

Player.prototype.emit = function() {} // HumanPlayer overrides this, BotPlayer doesn't

Player.prototype.clear = function() {}

Player.prototype.isStillConnected = function() { return false; }

Player.prototype._doWeKillIt = function(blob, enemyBlob) {
	if (Math.sqrt(Math.pow(enemyBlob.x-blob.x, 2) + Math.pow(enemyBlob.y-blob.y, 2)) > 0.04) return false;
	if (!blob.alive || !enemyBlob.alive) return false;
	if (enemyBlob.status == "fury" && blob.status != "fury") return false;
	if (blob.status == "ghost" || enemyBlob.status == "ghost") return false;
	return true;
}

Player.prototype.iterateBlobs = function() { this._army.forEach(blob => { blob.iterate(); }); }

Player.prototype.iterateCards = function(enemyPlayer) {
	this._cards.forEach(card => { card.iterate(this._army, enemyPlayer.getArmy()); });
}

Player.prototype.whoToKill = function(enemyPlayer) {
	let toKill = [];
	this._army.forEach((blob) => {
		enemyPlayer.getArmyData().forEach((enemyBlob, enemyId) => {
			if (this._doWeKillIt(blob, enemyBlob)) toKill.push(enemyId);
		});
	});
	return toKill;
}

Player.prototype.kill = function(list) { list.forEach((id) => { if (id != null) this._army[id].alive = false; this._army[id].destination = null; }); }

Player.prototype.lost = function() {
	let deads = 0;
	this._army.forEach((blob) => { if (!blob.alive) deads +=1 ; });
	if (deads == 3) return true;
	return false;
}

export default Player;
