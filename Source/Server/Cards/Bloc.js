import Card from "./Generic/Card.js"

export default class Bloc extends Card {
	constructor() {
		super();
		this.composeWith(["BlobMustFit", "LastToCast"]);
	}

	setStatus(blob) {
		blob.destination = null;
		blob.status = "fury";
	}

	removeStatus(blob) {
		blob.status = "normal";
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		const blob = army[this._idBlob];
		if (blob.destination != null) {
			blob.cancelPreviousSpell();
		}
	}

}
