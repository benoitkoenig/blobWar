import Card from "./Generic/Card.js"
// The first two seconds of revive is the first moment two spells can co-exist, bc the card isn't really casted yet
export default class Revive extends Card {
	constructor() {
		super(["SingleBlobSpell", "FirstToCast", "UseOnce", "Counter", "Cancelable"]);
		this.counterMax = 81;
	}

	removeStatus(blob) {}

	endOfCounter(army, enemy) {
		this.blob = this.blob != null ? this.blob : this._blobSaved; // this.blob == null if he died
		if (this._revived) { // End of the 5-second hat
			this.blob.status = "normal";
			this._revived = false;
			this.blob = null;
		} else if (!this._blobSaved.alive) { // The blob managed to die
			this.blob.alive = true;
			this.blob.status = "fury";
			this._counter = 201;
			this._revived = true;
		} else { // The blob didn't manage to die
			this.blob = null;
		}
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this._revived = false;
		this._blobSaved = this.blob; // this.blob will be overwritten if the blob dies
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
	}

}
