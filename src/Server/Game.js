import IdlePlayer from "./Players/Idle.js"
import HumanPlayer from "./Players/Human.js"
import BotGhostKamikaze from "./Players/BotGhostKamikaze.js"
import BotBlocGravity from "./Players/BotBlocGravity.js"

const Bots = [
	BotGhostKamikaze,
	BotBlocGravity,
];

function* iteratePlayer(player, enemy) {
	yield player.iterateBlobs(enemy.getArmy());
	yield player.iterateCards(enemy);
	const toKill = yield player.whoToKill(enemy);
	yield enemy.kill(toKill);
	if (player.lost || enemy.lost) {
		if (player.lost && enemy.lost) {
			player.emit({type: "endOfGame", value: "It's a draw"});
		} else if (player.lost) {
			player.emit({type: "endOfGame", value: "Defeat"});
		} else if (enemy.lost) {
			player.emit({type: "endOfGame", value: "Victory !"});
		}
		player.clear();
	} else {
		player.emit({type: "update", army: player.getArmyData(), enemy: enemy.getArmyData()});
	}
}

// A whole game consists in this piece of code being repeted 40 times per second
const startGame = (player1, player2) => {
	player1.emit({type: "update", army: player1.getArmyData(), enemy: player2.getArmyData()});
	player2.emit({type: "update", army: player2.getArmyData(), enemy: player1.getArmyData()});
	player1.emit({type: "gameStarted"});
	player2.emit({type: "gameStarted"});
	const iteration = setInterval(() => {
		const gen1 = iteratePlayer(player1, player2);
		const gen2 = iteratePlayer(player2, player1);
		let next1 = gen1.next();
		let next2 = gen2.next();
		while (!next1.done && !next2.done) { // gen1 and gen2 always terminate at the same moment
			next1 = gen1.next(next1.value);
			next2 = gen2.next(next2.value);
		}
		if (player1.lost || player2.lost || (!player1.isStillConnected() && !player2.isStillConnected())) {
			clearInterval(iteration)
		}
	}, 25);
}

const initCountdown = (socket1, data1, socket2, data2) => {
	[0, 1, 2, 3].forEach((i) => {
		setTimeout(() => {
			socket1.emit("action", { type: "countdown", value: 3-i });
			socket2.emit("action", { type: "countdown", value: 3-i });
			if (i === 3) startGame(
				new HumanPlayer(socket1, true, data1),
				new HumanPlayer(socket2, false, data2)
			);
		}, 1000*i);
	});
}

// Match Making
const playerJoin = (() => {
	let waiting = null;
	const disconnect = (action) => {
		if (action === "transport close" || action.type === "server/cancelMatchMaking") {
			waiting = null;
		}
	}
	return (socket, data) => {
		if (waiting === null) {
			waiting = { socket, data };
			socket.emit("action", {type: "countdown", value: null});
			socket.on("disconnect", disconnect);
			socket.on("action", disconnect);
		} else {
			// We set the countdown and clear waiting Socket for the next player to join
			initCountdown(waiting.socket, waiting.data, socket, data);
			waiting.socket.removeListener("disconnect", disconnect);
			waiting.socket.removeListener("action", disconnect);
			waiting = null;
		}
	}
})();

// Training mode
const playerAgainstIdle = (socket, data) => {
	startGame(new HumanPlayer(socket, true, data), new IdlePlayer());
}

const playerAgainstBot = (socket, data) => {
	startGame(new HumanPlayer(socket, true, data), new Bots[parseInt(Math.random()*Bots.length)]());
}

export default {
	playerJoin,
	playerAgainstIdle,
	playerAgainstBot,
}
