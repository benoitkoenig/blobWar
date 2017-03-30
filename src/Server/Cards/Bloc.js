import Card from "./Generic/Card.js"

export default class Bloc extends Card {
	constructor() {
		super(["SingleBlobSpell", "LastToCast", "Cancelable"]);
	}

	removeStatus(blob) {
		blob.status = "normal";
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this.blob.destination = null;
		this.blob.status = "fury";
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		if (this.blob.destination != null) this.cancel();
	}

}
