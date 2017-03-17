import Card from "./Generic/Card.js"

export default class Kamikaze extends Card {
	constructor() {
		super();
		this.composeWith(["BlobMustFit", "FirstToCast", "RemoveIterate"]);
	}

	setStatus(blob) {
		blob.status = "fury";
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		const distance = Math.sqrt(Math.pow(data.destination.x-blob.x, 2) + Math.pow(data.destination.y-blob.y, 2));
		if (distance == 0) return;
		if (super.trigger(data, army)) return;
		const speed = 0.06;
		blob.orientation = Math.abs(data.destination.x-blob.x) >= Math.abs(data.destination.y-blob.y) ? (data.destination.x >= blob.x ? 0 : 2) : (data.destination.y >= blob.y ? 1 : 3);
		this._xSpeed = (data.destination.x-blob.x) / distance * speed;
		this._ySpeed = (data.destination.y-blob.y) / distance * speed;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		const blob = army[this._idBlob];
		blob.x += this._xSpeed;
		blob.y += this._ySpeed;
		if (blob.x < 0 || blob.x > 1 || blob.y < 0 || blob.y > 1) {
			blob.alive = false;
			this._idBlob = null;
		}
	}

}
