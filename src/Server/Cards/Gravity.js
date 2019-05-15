import Card from "./Generic/Card.js"

export default class Gravity extends Card {
	constructor() {
		super(["SingleBlobSpell", "FirstToCast", "RemoveIterate"]);
	}

	removeStatus() {}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		for (var i=0 ; i<enemy.length ; i++) {
			const dist = Math.hypot(enemy[i].x - this.blob.x, enemy[i].y - this.blob.y);
			const speed = .001 / dist;
			if (speed >= dist) {
				enemy[i].x = this.blob.x;
				enemy[i].y = this.blob.y;
			} else {
				enemy[i].x += (this.blob.x - enemy[i].x) / dist * speed;
				enemy[i].y += (this.blob.y - enemy[i].y) / dist * speed;				
			}
		}
	}
}
