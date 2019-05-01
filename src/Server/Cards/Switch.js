import Card from "./Generic/Card.js"
// Switch is composed with little classes bc it is the only spell acting on all three blobs simultaneously
export default class Switch extends Card {
	constructor() {
		super(["UseOnce", "Counter"]);
		this.counterMax = 16;
	}

	endOfCounter(army, enemy) {
		for (let id of this._ids) {
			army[id].status = "normal";
		}
	}

	trigger(data, army) {
		const ids = [];
		for (let id in army) {
			if (army[id].alive) ids.push(parseInt(id));
		}		
		if (ids.length <= 1) return; // If there aren't at least two blobs, we cancel
		if (super.trigger(data, army)) return;
		this._speeds = [null, null, null];
		this._ids = ids;
		for (let indexChar in this._ids) {
			const index = parseInt(indexChar);
			this._speeds[this._ids[index]] = {
				x: (army[this._ids[(index+1)%this._ids.length]].x - army[this._ids[index]].x) / this._counter,
				y: (army[this._ids[(index+1)%this._ids.length]].y - army[this._ids[index]].y) / this._counter
			};
			army[this._ids[index]].status = "hat";
			army[this._ids[index]].destination = null;
			army[this._ids[index]].currentSpell = {}
		}
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		for (let id of this._ids) {
			army[id].destination = null; // removeIterate doesn't work here
			army[id].x += this._speeds[id].x;
			army[id].y += this._speeds[id].y;
		}
	}
}
