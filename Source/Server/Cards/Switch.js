import Card from "./Card.js"

export default class Switch extends Card {
	constructor() {
		super();
		this._counter = 0;
	}

	trigger(data, army) {
		this._speeds = [];
		this._counter = 15;
		for (let id in army) {
			this._speeds.push({
				x: (army[(id+1)%3].x - army[id].x) / this._counter,
				y: (army[(id+1)%3].y - army[id].y) / this._counter
			})
			army[id].status = "fury";
			army[id].destination = null;
		}
	}

	iterate(army, enemy) {
		if (this._counter == 0) return;
		for (let id in army) {
			army[id].x += this._speeds[id].x;
			army[id].y += this._speeds[id].y;
			army[id].removeIterate = true;
			if (this._counter == 1) army[id].status = "normal";
		}
		this._counter -= 1;
	}
}
