import Card from "./Generic/Card.js"

export default class Switch extends Card {
	constructor() {
		super(["SingleBlobSpell", "LastToCast", "Cancelable"]);
	}

	removeStatus() {}

	trigger(data, army) {
		if (super.trigger(data, army)) return;
		this._orbitingIds = [];
		this._distances = [];
		this._angles = [];
		for (let id in army) {
			const satelite = army[id];
			satelite.destination = null;
			const dist = Math.hypot(this.blob.x - satelite.x, this.blob.y - satelite.y);
			if (id != data.idBlob && satelite.alive) {
				this._orbitingIds.push(id)
				this._distances.push(dist);
				this._angles.push(Math.atan2(satelite.y - this.blob.y, satelite.x - this.blob.x));
				satelite.currentSpell = ((index) => {return  {
					_cancelable: true,
					cancel: () => {
						this._orbitingIds[index] = null;
					}
				}})(this._orbitingIds.length-1);
			}
		}
	}

	iterate(army, enemy) {
		if (super.iterate(army, enemy)) return;
		if ((this.blob.destination != null) || this._orbitingIds.every(id => (id === null))) {
			this.cancel();
			return;
		}
		this._orbitingIds.forEach((i, index) => {
			if (i === null) return;
			const blob = army[i];
			if (blob.destination != null) { // cancel the spell if he moves
				blob.currentSpell.cancel();
				return;
			}
			this._angles[index] += Math.PI / 80;
			if (this._distances[i] === 0) return; // Not necessary, but avoids approximations
			const x = this.blob.x + this._distances[index] * Math.cos(this._angles[index]);
			const y = this.blob.y + this._distances[index] * Math.sin(this._angles[index]);
			if (x < 0 || y < 0 || x > 1 || y > 1) {
				blob.currentSpell.cancel();
				return;
			}
			blob.x = x;
			blob.y = y;
		});
	}
}
