import Blob from "../src/Server/Blob.js";

// TODO: split the test in multiple for better efficiency

describe('Blob', () => {
	it('blob should have expected value', () => {
		const blob = new Blob(0);
		expect((blob.x === 0 && blob.y === 0)).toBe(true);
		blob.setPosition(2, 2, 1);
		blob.destination = {x: 4, y: 4}
		blob.iterate();
		const data = blob.getData();
		const checkX = (Math.abs(data.x - (2 + Math.sqrt(2)*0.005)) < 0.01); // speed is a block data is Blob.js, thus inaccessible
		const checkY = (Math.abs(data.y - (2 + Math.sqrt(2)*0.005)) < 0.01);
		const checkOrientation = (data.orientation === 0);
		const checkAlive = (data.alive === true);
		const checkStatus = (data.status === "normal")
		expect(checkX && checkY && checkOrientation && checkAlive && checkStatus).toBe(true);
	});
});
