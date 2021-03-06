import Dash from "../Cards/Dash.js"
import Bloc from "../Cards/Bloc.js"
import Ghost from "../Cards/Ghost.js"
import Kamikaze from "../Cards/Kamikaze.js"
import Gravity from "../Cards/Gravity.js"
import Revive from "../Cards/Revive.js"
import Switch from "../Cards/Switch.js"
import Orbit from "../Cards/Orbit.js"

import Blob from "../Blob.js"

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

class Player {
	constructor(firstPlayer, cards, exploratoryStarts=false) {
		this._army = [new Blob(), new Blob(), new Blob()];
		this._cards = [new Cards[cards[0]](), new Cards[cards[1]]()];
		if (exploratoryStarts) {
			this._army.forEach(blob => {
				blob.setPosition( Math.random(), Math.random(), 1 );
				blob.alive = (Math.random() < 0.8);
			})
		} else if (firstPlayer) {
			this._army[0].setPosition( 0.2, 0.1, 1 );
			this._army[1].setPosition( 0.5, 0.1, 1 );
			this._army[2].setPosition( 0.8, 0.1, 1 );
		} else {
			this._army[0].setPosition( 0.2, 0.9, 3 );
			this._army[1].setPosition( 0.5, 0.9, 3 );
			this._army[2].setPosition( 0.8, 0.9, 3 );
		}

	}

	get lost() {
		return (this._army.find(blob => blob.alive) === undefined);
	}

	static _doWeKillIt(blob, enemyBlob) {
		if (Math.hypot(enemyBlob.x-blob.x, enemyBlob.y-blob.y) > 0.04) return false;
		if (!blob.alive || !enemyBlob.alive) return false;
		if (enemyBlob.status === "hat" && blob.status !== "hat") return false;
		if (blob.status === "ghost" || enemyBlob.status === "ghost") return false;
		return true;
	}

	getArmy = () => this._army

	getArmyData = () => this._army.map(blob => blob.getData())

	emit = () => {} // HumanPlayer and BotReiforcementLearning use this

	clear = () => {}

	isStillConnected = () => false;

	iterateBlobs() { this._army.forEach(blob => { blob.iterate(); }); }

	iterateCards = (enemyPlayer) => {
		this._cards.forEach(card => card.iterate(this._army, enemyPlayer.getArmy()));
	}

	whoToKill = (enemyPlayer) => {
		const toKill = [];
		this._army.forEach(blob => {
			enemyPlayer.getArmyData().forEach((enemyBlob, enemyId) => {
				if (Player._doWeKillIt(blob, enemyBlob)) toKill.push(enemyId);
			});
		});
		return toKill;
	}

	kill = (list) => {
		list.forEach(id => {
			this._army[id].alive = false;
			this._army[id].destination = null;
		});
	}

	getCardsStatus = () => ({
		availability: this._cards.map(card => card.isAvailable()),
		currentBlob: this._cards.map(card => card.getCurrentBlob()),
	})

	hasntPlayed = () => {} // Used when training the ReinforcementLearningBot

	checkIfHasPlayed = async () => {} // Used when training the ReinforcementLearningBot

	terminate = () => {} // Used by ReinforcementLearning

	waitForInitialization = () => Promise.resolve() // Used by ReinforcementLearning
}

export default Player;
