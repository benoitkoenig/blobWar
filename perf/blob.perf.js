import race from 'speedracer'
import Blob from "../src/Server/Blob.js";

race('Blob', () => new Promise(resolve => {
	const blob = new Blob(0);
	blob.setPosition(2, 2, 1);
	blob.destination = {x: 4, y: 4}
	blob.iterate();
	blob.iterate();
	blob.iterate();
	const data = blob.getData();
	const checkX = (Math.abs(data.x - (2 + Math.sqrt(2)*0.005)) < 0.01); // speed is a block data is Blob.js, thus inaccessible
	const checkY = (Math.abs(data.y - (2 + Math.sqrt(2)*0.005)) < 0.01);
	const checkOrientation = (data.orientation === 0);
	const checkAlive = (data.alive === true);
	const checkStatus = (data.status === "normal");
	resolve();
}));

race('Blob2', () => new Promise(resolve => {
	const blob = new Blob(0);
	blob.setPosition(2, 2, 1);
	blob.destination = {x: 4, y: 4}
	blob.iterate();
	blob.iterate();
	const data = blob.getData();
	const checkX = (Math.abs(data.x - (2 + Math.sqrt(2)*0.005)) < 0.01); // speed is a block data is Blob.js, thus inaccessible
	const checkY = (Math.abs(data.y - (2 + Math.sqrt(2)*0.005)) < 0.01);
	const checkOrientation = (data.orientation === 0);
	const checkAlive = (data.alive === true);
	const checkStatus = (data.status === "normal");
	resolve();
}));
