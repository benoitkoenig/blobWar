import Player from "./Player.js"

class BotGhostKamikaze extends Player {
	name = "BotGhostKamikaze"

	constructor(firstPlayer = false, exploratoryStarts=false) {
		super(firstPlayer = false, ["Ghost", "Kamikaze"], exploratoryStarts);
		this._previousGhost = null;
	}

	iterateBlobs = (enemyArmy) => {
		const enemiesAlive = (enemyArmy[0].alive && enemyArmy[0].status != "ghost" ? 1 : 0) + (enemyArmy[1].alive && enemyArmy[0].status != "ghost" ? 1 : 0) + (enemyArmy[2].alive && enemyArmy[0].status != "ghost" ? 1 : 0);
		if (enemiesAlive >= 2) {
			// line is the line from which we want to cast kamikaze
			const line = this._lineWeWantOurBlobOn(enemyArmy); // a*x + b*y +c = 0
			if (line == null) return;
			const moveToDo = this._whoMovesToLine(line); // return the blob and the final pos
			const blob = this._army[moveToDo.idBlob];
			if (moveToDo.distance <= 0.02) { // Trigger the kamikaze
				this._cards[1].trigger({
					idBlob: moveToDo.idBlob,
					destination: {x: blob.x + line.b, y: blob.y - line.a}
				}, this._army);
			} else { // We go to the place to kamikaze
				if (moveToDo.idBlob != this._previousGhost) {
					this._cards[0].trigger({
						idBlob: moveToDo.idBlob,
						destination: {x: 0.5, y: 0.5}
					}, this._army);
					this._previousGhost = moveToDo.idBlob;
				}
				blob.destination = moveToDo.destination;
			}
		} else if (enemiesAlive == 1) {
			const enemyBlob = enemyArmy[enemyArmy[0].alive ? 0 : enemyArmy[1].alive ? 1 : 2];
			let dist = 1000;
			let idBlob = null;
			for (let i in this._army) {
				const blob = this._army[i];
				const distance = Math.hypot(enemyBlob.x - blob.x, enemyBlob.y - blob.y);
				if (distance < dist && blob.alive) {
					dist = distance;
					idBlob = i;
				}
			}
			if (enemyBlob.status != "ghost") {
				this._cards[1].trigger({
					idBlob: idBlob,
					destination: {x: enemyBlob.x, y: enemyBlob.y}
				}, this._army);
			}
		}
		super.iterateBlobs();
	}

	_lineWeWantOurBlobOn = (enemyArmy) => {
		const lines = [];
		for (let i=0 ; i<3 ; i++) {
			const blob1 = enemyArmy[i];
			const blob2 = enemyArmy[(i+1)%3];
			if (!blob1.alive || !blob2.alive || blob1.status == "ghost" || blob2.status == "ghost") {
				lines.push(null);
			} else {
				lines.push({
					a: blob1.y - blob2.y,
					b: blob2.x - blob1.x,
					c: blob1.x*blob2.y - blob2.x*blob1.y
				});
			}
		}
		let lineSelected = null;
		let yMax = -10000000;
		for (let i=0 ; i<3 ; i++) {
			const line = lines[i];
			if (line != null) {
				// We check the extreme y values, i.e. the y values on x=0 and x=1
				// So y is either -c/b or -(c+a)/b
				// We select the most accesible line, i.e. the one with the highest possible y
				const yOptForThisLine = -(line.c + Math.min(0, line.a)) / line.b;
				if (lineSelected == null || yOptForThisLine >= yMax) {
					lineSelected = i;
					yMax = yOptForThisLine;
				}
			}
		}
		if (lines[lineSelected] == null) return null;
		if (lines[lineSelected].a < 0) {
			lines[lineSelected].a = -lines[lineSelected].a;
			lines[lineSelected].b = -lines[lineSelected].b;
			lines[lineSelected].c = -lines[lineSelected].c;
		}
		return lines[lineSelected];
	}

	_whoMovesToLine = (line) => {
		if (line.a === 0 && line.b === 0) { // If two blobs are exactly at the same pos
			return {
				idBlob: this._army.findIndex(blob => blob.alive),
				distance: 0,
				destination: null,
			}
		}
		let id = -1;
		let distance = 1000;
		for (let idBlob in this._army) {
			// dist is the distance of the blob to the line. Formula's from wikipedia
			const blob = this._army[idBlob];
			const dist = Math.abs(line.a * blob.x + line.b * blob.y + line.c) / Math.hypot(line.a, line.b);
			if (blob.alive && dist < distance) {
				id = idBlob;
				distance = dist;
			}
		}
		/*
		We look for dX and dY, the destination of the blob
		a*dX + b*dY = -c because dX and dY are on the line ax + by + c = 0
		We consider the line bx - ay = const, which is perpendicular to line
		And we use the one blob is on, therefor const = b*blob.x - a*blob.y
		b*dX - a*dY = (b*blobX - a*blobY) because destination and blob are both on the line ax - by = const = a*blob.x - b*blob.y, which is perpendicular to line
		Which makes two equations for two unknown. Now we know
		(1) a*dX + b*dY = -c (2) b*dX - a*dY = (b*blobX - a*blobY)
		a*(1) + b*(2) => (a^2+b^2)*dX = -a*c + b*(b*blobX - a*blobY)
		b*(1) - a*(2) => (a^2+b^2)*dY = -b*c - a*(b*blobX - a*blobY)
		*/
		const blob = this._army[id];
		// I set const1 = a^2+b^2 and const2 = b*blobX - a*blobY
		const const1 = line.a ** 2 + line.b ** 2;
		const const2 = line.b * blob.x - line.a * blob.y;
		// So now I have dX = (-a*c + b*const2) / const1 and dY = (-b*c - a*const2) / const1
		return {
			idBlob: id,
			distance: distance,
			destination: {
				x: (-line.a * line.c + line.b * const2) / const1,
				y: (-line.b * line.c - line.a * const2) / const1
			}
		}
	}
}

export default BotGhostKamikaze;
