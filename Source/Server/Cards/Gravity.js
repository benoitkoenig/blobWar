import Card from "./Generic/Card.js"

export default class Gravity extends Card {
	constructor() {
		super();
		this.composeWith(["BlobMustFit", "FirstToCast", "RemoveIterate"]);
	}

	setStatus(blob) {}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		const blob = army[this._idBlob];
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
