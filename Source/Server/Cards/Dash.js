import Card from "./Card.js"

export default class Dash extends Card {
	constructor() {
		super();
		this._counter = 0;
		this._idBlob = null;
		this._used = false;
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (this._idBlob != null || !blob.canCastSpell || !blob.alive || this._counter != 0 || this._used) return;
		this._idBlob = data.idBlob;
		this._counter = 6;
		this._destination = data.destination;
		blob.destination = null;
		blob.status = "fury";
		blob.canCastSpell = false;
		this._used = true;
	}

	iterate(army, enemy) {
		if (this._counter == 0) return;
		const blob = army[this._idBlob];
		if (this._counter == 1) {
			blob.status = "normal";
			blob.canCastSpell = true;
			this._idBlob = null;
		}
		this._counter -= 1;
		blob.removeIterate = true;
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
		for (var i=0 ; i<enemy.length ; i++) {
			const dist = Math.sqrt(Math.pow(enemy[i].x-blob.x, 2) + Math.pow(enemy[i].y-blob.y, 2));
			if (dist <= 0.04 && enemy[i].alive && enemy[i].status != "ghost") { // This means we are responsible for his death
				this._used = false;
			}
		}
	}

}
