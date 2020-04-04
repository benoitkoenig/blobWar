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

describe('Game', () => {
	describe('MatchMaking', () => {
		it('playerJoin should emit a null countdown', (done) => {
			const fakeSocket = new FakeSocket();
			fakeSocket.on("action", (action) => {
				expect((action.type === "countdown" && action.value === null)).toBe(true);
				done();
			});
			Game.playerJoin(fakeSocket);
		});
	});
});
