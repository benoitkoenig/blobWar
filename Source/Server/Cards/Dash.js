import Card from "./Generic/Card.js"

export default class Dash extends Card {
	constructor() {
		super(["SingleBlobSpell", "FirstToCast", "UseOnce", "Counter", "RemoveIterate"]);
		this.counterMax = 7;
	}

	endOfCounter(army, enemy) {
		this._used = (!this._canBeReused);
		if (this.blob == null) return; // Happens if the blob has died
		this.blob.status = "normal";
		this.blob.currentSpell = null;
		this.blob = null;
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this._destination = data.destination;
		this._canBeReused = false;
		this.blob.destination = null;
		this.blob.status = "fury";
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		const speed = 0.02;
		const distance = Math.sqrt(Math.pow(this._destination.x-this.blob.x, 2) + Math.pow(this._destination.y-this.blob.y, 2));
		if (distance != 0) {
			this.blob.orientation = Math.abs(this._destination.x-this.blob.x) >= Math.abs(this._destination.y-this.blob.y) ? (this._destination.x >= this.blob.x ? 0 : 2) : (this._destination.y >= this.blob.y ? 1 : 3);
		}
		if (distance <= speed) {
			this.blob.x = this._destination.x;
			this.blob.y = this._destination.y;
			this.blob.destination = null;
		} else {
			this.blob.x += (this._destination.x-this.blob.x) / distance * speed;
			this.blob.y += (this._destination.y-this.blob.y) / distance * speed;
		}
		for (let i in enemy) {// If we kill an opponent, the spell can be re-used
			const dist = Math.sqrt(Math.pow(enemy[i].x-this.blob.x, 2) + Math.pow(enemy[i].y-this.blob.y, 2));
			if (dist <= 0.04 && enemy[i].alive && enemy[i].status != "ghost") {
				this._canBeReused = true;
			}
		}
	}

}
