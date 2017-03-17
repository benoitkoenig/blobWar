import Card from "./Generic/Card.js"
// Switch is composed with little classes bc it is the only spell acting on all three blobs simultaneously
// It can be cast on blob which canCastSpell is false, bc it doesn't concern a single blob
export default class Switch extends Card {
	constructor() {
		super();
		this._counterMax = 16;
		this.composeWith(["UseOnce", "Counter"]);
	}

	endOfCounter(army, enemy) {
		for (let id of this._ids) {
			army[id].status = "normal";
			army[id].canCastSpell = true;
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
			army[this._ids[index]].status = "fury";
			army[this._ids[index]].canCastSpell = false;
			army[this._ids[index]].destination = null;
		}
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		for (let id of this._ids) {
			army[id].x += this._speeds[id].x;
			army[id].y += this._speeds[id].y;
			army[id].removeIterate = true;
		}
	}
}
