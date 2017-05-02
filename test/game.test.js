import { assert } from "chai";

import Game from "../src/Server/Game.js";

class FakeSocket {
	constructor() {
		this.events = {}
	}

	on(name, cb) {
		this.events[name] = cb;
	}

	emit(name, data) {
		(this.events[name])(data);
	}
}

export default () => {
	describe('Game', () => {
		describe('MatchMaking', () => {
			it('playerJoin should emit a null countdown', (done) => {
				const fakeSocket = new FakeSocket();
				fakeSocket.on("action", (action) => {
					assert.equal((action.type === "countdown" && action.value === null), true);
					done();
				});
				Game.playerJoin(fakeSocket);
			});
		});
	});
}
