export default class Blob {
// Blob's attributes are not private, bc they can be accessed from Cards
	constructor(id) {
		this.x = 0;
		this.y = 0;
		this.orientation = 0;
		this.alive = true;
		this.destination = null;
		this.status = "normal"; // normal means if he collides an enemy blob, he dies. fury means he will kill but not die
		this.removeIterate = false;
		this.canCastSpell = true;
	}

	_cancelPreviousSpell() {

	}

	cancelPreviousSpell(newSpell) {
		// When calling this, we cat the previous function and replace it with a new - or null
		if (this._cancelPreviousSpell != null) this._cancelPreviousSpell();
		this._cancelPreviousSpell = newSpell;
	}

	// Only used at initialisation
	setPosition(xPos, yPos, orientationVal) {
		this.x = xPos;
		this.y = yPos;
		this.orientation = orientationVal;
	}

	// Manage the movement of the blob
	iterate() {
		if (this.removeIterate) {
			this.removeIterate = false;
			return;
		}
		if (this.destination == null || !this.alive) return;
		const speed = 0.005;
		const distance = Math.sqrt(Math.pow(this.destination.x-this.x, 2) + Math.pow(this.destination.y-this.y, 2));
		this.orientation = Math.abs(this.destination.x-this.x) >= Math.abs(this.destination.y-this.y) ? (this.destination.x >= this.x ? 0 : 2) : (this.destination.y >= this.y ? 1 : 3);
		if (distance <= speed) {
			this.x = this.destination.x;
			this.y = this.destination.y;
			this.destination = null;
		} else {
			this.x += (this.destination.x-this.x) / distance * speed;
			this.y += (this.destination.y-this.y) / distance * speed;
		}
	}

	// used to send data to the front-end. Also used to calculate which blob to kill
	getData() {
		return {
			x: this.x,
			y: this.y,
			orientation: this.orientation,
			alive: this.alive,
			status: this.status
		}
	}

}
