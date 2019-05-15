import Card from "./Generic/Card.js"
// Switch is composed with little classes bc it is the only spell acting on all three blobs simultaneously
export default class Switch extends Card {
	constructor() {
		super(["UseOnce", "Counter"]);
		this.counterMax = 16;
	}

	endOfCounter(army, enemy) {
		this._ids.forEach(id => {
			army[id].status = "normal";
		});
	}

	trigger(data, army) {
		const ids = army.map((blob, i) => blob.alive ? i : null).filter(i => i !== null);
		if (ids.length <= 1) return; // If there aren't at least two blobs, we cancel
		if (super.trigger(data, army)) return;
		this._speeds = [null, null, null];
		this._ids = ids;
		this._ids.forEach((id, index) => {
			const blob = army[id];
			const targetBlob = army[this._ids[(index + 1) % this._ids.length]];
			this._speeds[id] = {
				x: (targetBlob.x - blob.x) / this._counter,
				y: (targetBlob.y - blob.y) / this._counter,
			};
			blob.status = "hat";
			blob.destination = null;
			blob.currentSpell = {};
		});
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		this._ids.forEach(id => {
			army[id].destination = null; // removeIterate doesn't work here
			army[id].x += this._speeds[id].x;
			army[id].y += this._speeds[id].y;
		});
	}
}
