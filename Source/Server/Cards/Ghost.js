import Card from "./Card.js"

export default class Ghost extends Card {
	constructor() {
		super();
		this._idBlob = null;
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (this._idBlob == data.idBlob) { // Spell is being canceled
			blob.status = "normal";
			this._idBlob = null;
			return;
		} else if (!blob.canCastSpell || !blob.alive) {
			return;
		} else if (this._idBlob != null) {
			army[this._idBlob].status = "normal";
		}
		this._idBlob = data.idBlob;
		blob.status = "ghost";
	}

	iterate(army, enemy) {
		if (this._idBlob == null) return;
		const blob = army[this._idBlob];
	}

}
