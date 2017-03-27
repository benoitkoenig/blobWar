import Player from "./Player.js"

export default class BotBlocGravity extends Player {

	constructor() {
		super(false, ["Bloc", "Gravity"]);
		this._army[0].destination = {x: 0.2, y: 0.6};
		this._army[1].destination = {x: 0.2, y: 0.5};
		this._army[2].destination = {x: 0.2, y: 0.7};
		this.pullingBlob = null;
		this._timerTillPulling = null;
	}

	iterateBlobs(enemyArmy) {
		if (this._timerTillPulling > 0) { // If we only have one blob left, he first casts bloc, then gravity
			this._timerTillPulling -= 1;
		} else if (this._timerTillPulling == 0) { // Our last blob, 1, stops the bloc to try gravity
			this._cards[1].trigger({idBlob: 1}, this._army);
			this._timerTillPulling = -1;
		} else if (!this._army[0].alive && !this._army[2].alive && this._timerTillPulling == null) { // Both 0 and 2 are dead, so 1 starts a bloc which he will eventually rade for a gravity
			if (this._cards[0].blob == null) this._cards[0].trigger({idBlob: 1}, this._army);
			this._timerTillPulling = 160;
		} else if (this._cards[1].blob == null && this.pullingBlob == 0) { // Blob 0, which pulls first, died
			this._cards[1].trigger({idBlob: 2}, this._army);
			this.pullingBlob = 2;
		} else if (this.pullingBlob != null) {
			const enemyBlob = this._getClosestEnemy(this.pullingBlob, enemyArmy);
			const posToBloc = this._whereToBloc(this._army[this.pullingBlob], enemyArmy[enemyBlob]);
			const blobToMove = this._closestBlob(posToBloc);
			if (blobToMove != null) {
				if (Math.pow(this._army[blobToMove].x - posToBloc.x, 2) + Math.pow(this._army[blobToMove].y - posToBloc.y, 2) < 0.0001) {
					if (this._cards[0].blob != this._army[blobToMove]) {
						this._cards[0].trigger({idBlob: blobToMove}, this._army);
					};
				} else {
					this._army[blobToMove].destination = posToBloc;
				}
			}
		} else if (this._army[0].destination == null) { // When the blob 0 gets the gravity, at the beginning
			this.pullingBlob = 0;
			this._cards[1].trigger({idBlob: 0}, this._army);
		}
		super.iterateBlobs();
	}

	_getClosestEnemy(blobId, enemyArmy) {
		const blob = this._army[blobId];
		let distance = 1000;
		let returningId = null;
		for (let enemyId in enemyArmy) {
			const dist = Math.pow(enemyArmy[enemyId].x - blob.x, 2) + Math.pow(enemyArmy[enemyId].y - blob.y, 2);
			if (dist < distance && enemyArmy[enemyId].alive) {
				distance = dist;
				returningId = enemyId;
			}
		}
		return returningId;
	}

	_whereToBloc(blob, enemy) {
		const dist = Math.sqrt(Math.pow(blob.x - enemy.x, 2) + Math.pow(blob.y - enemy.y, 2));
		return {
			x: blob.x + (enemy.x - blob.x) / dist * 0.06,
			y: blob.y + (enemy.y - blob.y) / dist * 0.06,
		}
	}

	_closestBlob(posToBloc) {
		let distance = 1000;
		let returningId = null;
		for (let id in this._army) {
			const dist = Math.pow(this._army[id].x - posToBloc.x, 2) + Math.pow(this._army[id].y - posToBloc.y, 2);
			if (id != this.pullingBlob && this._army[id].alive && dist < distance) {
				distance = dist;
				returningId = id
			}
		}
		return returningId;
	}

}
