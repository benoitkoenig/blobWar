import IdlePlayer from "./Players/Idle.js"
import HumanPlayer from "./Players/Human.js"
import BotGhostKamikaze from "./Players/BotGhostKamikaze.js"
import BotBlocGravity from "./Players/BotBlocGravity.js"

const Bots = [
	BotGhostKamikaze,
	BotBlocGravity
];

// A whole game consists in this piece of code being repeted 40 times per second
const startGame = (player1, player2) => {
	player1.emit({type: "update", army: player1.getArmyData(), enemy: player2.getArmyData()});
	player2.emit({type: "update", army: player2.getArmyData(), enemy: player1.getArmyData()});
	player1.emit({type: "gameStarted"});
	player2.emit({type: "gameStarted"});
	const iteration = setInterval(() => {
		player1.iterateBlobs(player2.getArmy());
		player2.iterateBlobs(player1.getArmy());
		player1.iterateCards(player2);
		player2.iterateCards(player1);
		const toKill1 = player1.whoToKill(player2);
		const toKill2 = player2.whoToKill(player1);
		player1.kill(toKill2);
		player2.kill(toKill1);
		if (player1.lost || player2.lost) {
			if (player1.lost && player2.lost) {
				player1.emit({type: "endOfGame", value: "It's a draw"});
				player2.emit({type: "endOfGame", value: "It's a draw"});
			} else if (player1.lost) {
				player1.emit({type: "endOfGame", value: "Defeat"});
				player2.emit({type: "endOfGame", value: "Victory !"});
			} else if (player2.lost) {
				player1.emit({type: "endOfGame", value: "Victory !"});
				player2.emit({type: "endOfGame", value: "Defeat"});
			}
			player1.clear();
			player2.clear();
			clearInterval(iteration);
		} else {
			const army1 = player1.getArmy();
			const army2 = player2.getArmy();
			player1.emit({type: "update", army: player1.getArmyData(), enemy: player2.getArmyData()});
			player2.emit({type: "update", army: player2.getArmyData(), enemy: player1.getArmyData()});
			if (!player1.isStillConnected() && !player2.isStillConnected()) clearInterval(iteration);
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
	playerAgainstBot
}
