import Card from "./Generic/Card.js"

export default class Kamikaze extends Card {
	constructor() {
		super(["SingleBlobSpell", "FirstToCast", "RemoveIterate"]);
	}

	removeStatus() {}

	trigger(data, army) {
		const blob = army[data.idBlob];
		const distance = Math.hypot(data.destination.x-blob.x, data.destination.y-blob.y);
		if (distance === 0) return;
		if (super.trigger(data, army)) return;
		const speed = 0.04;
		blob.status = "hat";
		blob.orientation = Math.abs(data.destination.x-blob.x) >= Math.abs(data.destination.y-blob.y) ? (data.destination.x >= blob.x ? 0 : 2) : (data.destination.y >= blob.y ? 1 : 3);
		this._xSpeed = (data.destination.x-blob.x) / distance * speed;
		this._ySpeed = (data.destination.y-blob.y) / distance * speed;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		this.blob.x += this._xSpeed;
		this.blob.y += this._ySpeed;
		if (this.blob.x < 0 || this.blob.x > 1 || this.blob.y < 0 || this.blob.y > 1) {
			this.blob.alive = false;
		}
	}

}
