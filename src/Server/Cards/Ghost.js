import Card from "./Generic/Card.js"

class Ghost extends Card {
	constructor() {
		super(["SingleBlobSpell", "LastToCast", "Cancelable"]);
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this.blob.status = "ghost";
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
	}
}

Ghost.prototype.removeStatus = function(blob) {
	blob.status = "normal";
}

export default Ghost;
