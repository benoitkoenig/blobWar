import Card from "./Generic/Card.js"

export default class Gravity extends Card {
	constructor() {
		super(["SingleBlobSpell", "FirstToCast", "RemoveIterate"]);
	}

	removeStatus() {}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		enemy.forEach(otherBlob => {
			const dist = Math.hypot(otherBlob.x - this.blob.x, otherBlob.y - this.blob.y);
			const speed = .001 / dist;
			if (speed >= dist) {
				otherBlob.x = this.blob.x;
				otherBlob.y = this.blob.y;
			} else {
				otherBlob.x += (this.blob.x - otherBlob.x) / dist * speed;
				otherBlob.y += (this.blob.y - otherBlob.y) / dist * speed;				
			}
		});
	}
}
