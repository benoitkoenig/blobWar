import Card from "./Generic/Card.js"

export default class Ghost extends Card {
	constructor() {
		super(["SingleBlobSpell", "LastToCast", "Cancelable"]);
	}

	removeStatus(blob) {
		blob.status = "normal";
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this.blob.status = "ghost";
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
	}

}
