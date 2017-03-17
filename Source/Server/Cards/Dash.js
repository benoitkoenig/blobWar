import Card from "./Generic/Card.js"

export default class Dash extends Card {
	constructor() {
		super();
		this._counterMax = 7;
		this.composeWith(["BlobMustFit", "FirstToCast", "UseOnce", "Counter", "RemoveIterate"]);
	}

	setStatus(blob) {
		blob.destination = null;
		blob.status = "fury";
	}

	endOfCounter(army, enemy) {
		const blob = army[this._idBlob];
		blob.status = "normal";
		blob.canCastSpell = true;
		this._idBlob = null;
		this._used = (!this._canBeReused);
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		const blob = army[data.idBlob];
		this._destination = data.destination;
		this._canBeReused = false;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		const blob = army[this._idBlob];
		const speed = 0.02;
		const distance = Math.sqrt(Math.pow(this._destination.x-blob.x, 2) + Math.pow(this._destination.y-blob.y, 2));
		if (distance != 0) {
			blob.orientation = Math.abs(this._destination.x-blob.x) >= Math.abs(this._destination.y-blob.y) ? (this._destination.x >= blob.x ? 0 : 2) : (this._destination.y >= blob.y ? 1 : 3);
		}
		if (distance <= speed) {
			blob.x = this._destination.x;
			blob.y = this._destination.y;
			blob.destination = null;
		} else {
			blob.x += (this._destination.x-blob.x) / distance * speed;
			blob.y += (this._destination.y-blob.y) / distance * speed;
		}
		for (let i in enemy) {// If we kill an opponent, _used goes to false
			const dist = Math.sqrt(Math.pow(enemy[i].x-blob.x, 2) + Math.pow(enemy[i].y-blob.y, 2));
			if (dist <= 0.04 && enemy[i].alive && enemy[i].status != "ghost") {
				this._canBeReused = true;
			}
		}
	}

}
