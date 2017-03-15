import Card from "./Card.js"

export default class Revive extends Card {
	constructor() {
		super();
		this._counter = 0;
		this._idBlob = null;
		this._used = false;
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (this._idBlob != null || !blob.canCastSpell || !blob.alive || this._counter != 0 || this._used) return;
		this._idBlob = data.idBlob;
		this._revived = false;
		this._counter = 80;
		this._used = true;
	}

	iterate(army, enemy) {
		if (this._counter == 0) return;
		const blob = army[this._idBlob];
		if (this._counter == 1) {
			if (this._revived) {
				blob.status = "normal";
				this._revived = false;
				this._idBlob = null;
			} else if (!blob.alive) {
				blob.alive = true;
				blob.status = "fury";
				this._counter = 200;
				this._revived = true;
			} else {
				this._idBlob = null;
			}
		}
		this._counter -= 1;
	}

}
