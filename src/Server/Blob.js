class Blob {
	// Blob's attributes are not private, bc they can be accessed from Cards
	constructor(id) {
		this.x = 0;
		this.y = 0;
		this.orientation = 0;
		this.alive = true;
		this.destination = null;
		this.status = "normal"; // normal means if he collides an enemy blob, he dies. fury means he will kill but not die
		this.currentSpell = null; // Used in singleBlobSpell generic card
	}
}

// Only used at initialisation
Blob.prototype.setPosition = function(xPos, yPos, orientationVal) {
	this.x = xPos;
	this.y = yPos;
	this.orientation = orientationVal;
}

// Manage the movement of the blob
Blob.prototype.iterate = function() {
	if (this.currentSpell && this.currentSpell.removeIterate) return;
	if (this.destination == null || !this.alive) return;
	const speed = 0.005;
	const distance = Math.hypot(this.destination.x-this.x, this.destination.y-this.y);
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
Blob.prototype.getData = function() {
	return {
		x: this.x,
		y: this.y,
		orientation: this.orientation,
		alive: this.alive,
		status: this.status
	}
}

export default Blob;
