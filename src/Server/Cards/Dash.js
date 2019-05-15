import Card from "./Generic/Card.js"

const SPEED = 0.02;

class Dash extends Card {
	constructor() {
		super(["SingleBlobSpell", "FirstToCast", "UseOnce", "Counter", "RemoveIterate"]);
		this.counterMax = 7;
	}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this._destination = data.destination;
		this._canBeReused = false;
		this.blob.destination = null;
		this.blob.status = "hat";
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		const distance = Math.hypot(this._destination.x - this.blob.x, this._destination.y - this.blob.y);
		if (distance != 0) {
			this.blob.orientation = Math.abs(this._destination.x - this.blob.x) >= Math.abs(this._destination.y - this.blob.y) ? (this._destination.x >= this.blob.x ? 0 : 2) : (this._destination.y >= this.blob.y ? 1 : 3);
		}
		if (distance <= SPEED) {
			this.blob.x = this._destination.x;
			this.blob.y = this._destination.y;
			this.blob.destination = null;
		} else {
			this.blob.x += (this._destination.x - this.blob.x) / distance * SPEED;
			this.blob.y += (this._destination.y - this.blob.y) / distance * SPEED;
		}
		for (let i in enemy) {// If we kill an opponent, the spell can be re-used
			const dist = Math.hypot(enemy[i].x - this.blob.x, enemy[i].y - this.blob.y);
			if (dist <= 0.04 && enemy[i].alive && enemy[i].status != "ghost") {
				this._canBeReused = true;
			}
		}
	}

	endOfCounter = (army, enemy) => {
		this._used = (!this._canBeReused);
		if (this.blob == null) return; // Happens if the blob has died
		this.blob.status = "normal";
		this.blob.currentSpell = null;
		this.blob = null;
	}

	removeStatus = (blob) => {
		blob.status = "normal";
	}
}

export default Dash;
