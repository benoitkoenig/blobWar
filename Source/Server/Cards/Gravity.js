import Card from "./Card.js"

export default class Gravity extends Card {
	constructor() {
		super();
		this._idBlob = null;
	}

	trigger(data, army) {
		const blob = army[data.idBlob];
		if (this._idBlob != null || !blob.canCastSpell || !blob.alive) return;
		this._idBlob = data.idBlob;
		blob.destination = null;
	}

	iterate(army, enemy) {
		if (this._idBlob == null) return;
		const blob = army[this._idBlob];
		blob.removeIterate = true;
		if (!blob.alive) {
			this._idBlob = null;
			return;
		}
		for (var i=0 ; i<enemy.length ; i++) {
			const dist = Math.sqrt(Math.pow(enemy[i].x-blob.x, 2) + Math.pow(enemy[i].y-blob.y, 2));
			const speed = .001 / dist;
			if (speed >= dist) {
				enemy[i].x = blob.x;
				enemy[i].y = blob.y;
			} else {
				enemy[i].x += (blob.x - enemy[i].x) / dist * speed;
				enemy[i].y += (blob.y - enemy[i].y) / dist * speed;				
			}
		}
	}
}
