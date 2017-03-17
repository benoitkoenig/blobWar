import Card from "./Generic/Card.js"

export default class Ghost extends Card {
	constructor() {
		super();
		this.composeWith(["BlobMustFit", "LastToCast"]);
	}

	setStatus(blob) {
		blob.status = "ghost";
	}

	removeStatus(blob) {
		blob.status = "normal";
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
	}

}
