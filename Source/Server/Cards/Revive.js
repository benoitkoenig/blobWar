import Card from "./Generic/Card.js"
// The first two seconds of revive is the first moment two spells can co-exist, bc the card isn't really casted yet
export default class Revive extends Card {
	constructor() {
		super();
		this._counterMax = 81;
		this.composeWith(["FirstToCast", "UseOnce", "Counter"]);
	}

	setStatus(blob) {}

	endOfCounter(army, enemy) {
		const blob = army[this._idBlob];
		if (this._revived) { // End of the 5-second hat
			blob.status = "normal";
			this._revived = false;
			this._idBlob = null;
		} else if (!blob.alive) { // The blob managed to die
			blob.alive = true;
			blob.status = "fury";
			this._counter = 201;
			this._revived = true;
			blob.cancelPreviousSpell(() => {
				if (this._counter != 0) { // We don't ovveride cancelPreviousSpell after the end, so if it is called too late, nothing happens
					this._counter = 0;
					this.endOfCounter(army, enemy);
				}
			});
			blob.canCastSpell = true;
		} else { // The blob didn' manage to die
			this._idBlob = null;
		}
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (!blob.canCastSpell || !blob.alive) return; // I can't use BlobMustFit bc it blocks the iteration on dead blobs
		if (super.trigger(data, army)) return;
		blob.canCastSpell = true; // We undo what FirstToCast does
		this._revived = false;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
	}

}
