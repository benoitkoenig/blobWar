import Card from "./Card.js"

export default class Switch extends Card {
	constructor() {
		super();
		this._counter = 0;
	}

	trigger(data, army) {
		this._speeds = [null, null, null];
		this._ids = [];
		this._counter = 15;
		for (let id in army) {
			if (army[id].alive) this._ids.push(parseInt(id));
		}
		if (this._ids.length <= 1) {
			this._ids = [];
			return;
		}
		for (let indexChar in this._ids) {
			const index = parseInt(indexChar);
			this._speeds[this._ids[index]] = {
				x: (army[this._ids[(index+1)%this._ids.length]].x - army[this._ids[index]].x) / this._counter,
				y: (army[this._ids[(index+1)%this._ids.length]].y - army[this._ids[index]].y) / this._counter
			};
			army[this._ids[index]].status = "fury";
			army[this._ids[index]].destination = null;
		}
	}

	iterate(army, enemy) {
		if (this._counter == 0) return;
		for (let id of this._ids) {
			army[id].x += this._speeds[id].x;
			army[id].y += this._speeds[id].y;
			army[id].removeIterate = true;
			if (this._counter == 1) army[id].status = "normal";
		}
		this._counter -= 1;
	}
}
