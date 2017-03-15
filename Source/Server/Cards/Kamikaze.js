import Card from "./Card.js"

export default class Kamikaze extends Card {
	constructor() {
		super();
		this._idBlob = null;
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (this._idBlob != null || !blob.canCastSpell || !blob.alive) return;
		this._idBlob = data.idBlob;
		const distance = Math.sqrt(Math.pow(data.destination.x-blob.x, 2) + Math.pow(data.destination.y-blob.y, 2));
		if (distance == 0) return;
		const speed = 0.06;
		blob.destination = null;
		blob.status = "fury";
		blob.orientation = Math.abs(data.destination.x-blob.x) >= Math.abs(data.destination.y-blob.y) ? (data.destination.x >= blob.x ? 0 : 2) : (data.destination.y >= blob.y ? 1 : 3);
		this._xSpeed = (data.destination.x-blob.x) / distance * speed;
		this._ySpeed = (data.destination.y-blob.y) / distance * speed;
	}

	iterate(army, enemy) {
		if (this._idBlob == null) return;
		const blob = army[this._idBlob];
		if (blob.alive == false) {
			this._idBlob = null;
			return;
		}
		blob.removeIterate = true;
		blob.x += this._xSpeed;
		blob.y += this._ySpeed;
		if (blob.x < 0 || blob.x > 1 || blob.y < 0 || blob.y > 1) {
			blob.alive = false;
			this._idBlob = null;
		}
	}

}

module.exports = Kamikaze;
