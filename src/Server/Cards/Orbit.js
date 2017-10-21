import Card from "./Generic/Card.js"

export default class Switch extends Card {
	constructor() {
		super(["SingleBlobSpell", "LastToCast", "Cancelable"]);
	}

	removeStatus(blob) {}

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
		if (this.blob.destination != null) {
			this.cancel();
			return;
		}
		let nullIndexes = 0;
		for (let index in this._orbitingIds) {
			const i = this._orbitingIds[index];
			const blob = army[i];
			if (i == null) {
				nullIndexes++;
			} else if (blob.destination != null) { // cancel the spell if he moves
				blob.currentSpell.cancel();
			} else {
				const blob = army[i];
				this._angles[index] += Math.PI / 80;
				if (this._distances[i] != 0) { // Not necessary, but avoid approximations
					const x = this.blob.x + this._distances[index] * Math.cos(this._angles[index]);
					const y = this.blob.y + this._distances[index] * Math.sin(this._angles[index]);
					if (x < 0 || y < 0 || x > 1 || y > 1) {
						blob.currentSpell.cancel();
					} else {
						blob.x = this.blob.x + this._distances[index] * Math.cos(this._angles[index]);
						blob.y = this.blob.y + this._distances[index] * Math.sin(this._angles[index]);
					}
				}
			}
		}
		if (nullIndexes == this._orbitingIds.length) {
			this.cancel();
		}
	}
}
