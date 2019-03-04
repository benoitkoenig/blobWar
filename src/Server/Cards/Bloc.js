import Card from "./Generic/Card.js"

class Bloc extends Card {
	constructor() {
		super(["SingleBlobSpell", "LastToCast", "Cancelable"]);
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

	removeStatus = (blob) => {
		blob.status = "normal";
	}
}

export default Bloc;
