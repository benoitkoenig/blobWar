import Card from "./Card.js"

export default class Bloc extends Card {
	constructor() {
		super();
		this._idBlob = null;
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (!blob.canCastSpell || !blob.alive) return;
		if (this._idBlob != null) {
			army[this._idBlob].status = "normal";
		}
		this._idBlob = data.idBlob;
		blob.destination = null;
		blob.status = "fury";
	}

	iterate(army, enemy) {
		if (this._idBlob == null) return;
		const blob = army[this._idBlob];
		if (blob.destination != null) {
			blob.status = "normal";
			this._idBlob = null;
		}
	}
}
