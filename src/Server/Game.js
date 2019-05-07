import IdlePlayer from "./Players/Idle.js"
import HumanPlayer from "./Players/Human.js"
import BotDashDash from "./Players/BotDashDash.js"
import BotGhostBloc from "./Players/BotGhostBloc.js"
import BotGhostKamikaze from "./Players/BotGhostKamikaze.js"
import BotBlocGravity from "./Players/BotBlocGravity.js"
import ReinforcementLearning from "./Players/ReinforcementLearning.js"

const wait = async (s) => new Promise(resolve => setTimeout(resolve, s));

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
		player.emit({
			type: "update",
			army: player.getArmyData(),
			enemy: enemy.getArmyData(),
			cards: player.getCardsStatus(),
			enemyCards: enemy.getCardsStatus(),
		});
	}
}

// A whole game consists in this piece of code being repeted 40 times per second
const startGame = (player1, player2) => {
	player1.emit({type: "update", army: player1.getArmyData(), enemy: player2.getArmyData(), cards: [true, true], enemyCards: [true, true]});
	player2.emit({type: "update", army: player2.getArmyData(), enemy: player1.getArmyData(), cards: [true, true], enemyCards: [true, true]});
	player1.emit({type: "gameStarted"});
	player2.emit({type: "gameStarted"});
	const iteration = setInterval(async () => {
		const gen1 = iteratePlayer(player1, player2);
		const gen2 = iteratePlayer(player2, player1);
		let next1 = await gen1.next();
		let next2 = await gen2.next();
		await next1.value;
		await next2.value;
		while (!next1.done && !next2.done) { // gen1 and gen2 always terminate at the same moment
			next1 = gen1.next(next1.value);
			next2 = gen2.next(next2.value);
			await next1.value;
			await next2.value;
		}
		if (player1.lost || player2.lost || (!player1.isStillConnected() && !player2.isStillConnected())) {
			clearInterval(iteration)
			player1.terminate();
			player2.terminate();
		}
	}, 25);
}

const botTrainingGame = async (player1, player2) => {
	player1.emit({type: "update", army: player1.getArmyData(), enemy: player2.getArmyData(), cards: [true, true], enemyCards: [true, true]});
	player2.emit({type: "update", army: player2.getArmyData(), enemy: player1.getArmyData(), cards: [true, true], enemyCards: [true, true]});
	player1.emit({type: "gameStarted"});
	player2.emit({type: "gameStarted"});
	while (!player1.lost && !player2.lost && (player1.isStillConnected() || player2.isStillConnected())) {
		player1.hasntPlayed();
		player2.hasntPlayed();
		const gen1 = iteratePlayer(player1, player2);
		const gen2 = iteratePlayer(player2, player1);
		let next1 = gen1.next();
		let next2 = gen2.next();
		await next1.value;
		await next2.value;
		while (!next1.done && !next2.done) { // gen1 and gen2 always terminate at the same moment
			next1 = gen1.next(next1.value);
			next2 = gen2.next(next2.value);
			await next1.value;
			await next2.value;
		}
		await player1.checkIfHasPlayed();
		await player2.checkIfHasPlayed();
	}
	player1.terminate();
	player2.terminate();
	if (player1.lost && player2.lost) {
		return "Draw";
	}
	if (player2.lost) {
		return "Victory";
	}
	if (player1.lost) {
		return "Defeat";
	}
	return "Connection error with Python"
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

const botReinforcementLearning = [
	BotGhostBloc,
	BotDashDash,
]

const botOpponents = [
	BotGhostKamikaze,
	BotBlocGravity,
	IdlePlayer,
	BotGhostBloc,
	BotDashDash,
];

const playerAgainstBot = async (socket, data) => {
	await ReinforcementLearning.waitUntilConnected();
	// const bot = new botReinforcementLearning[Math.floor(Math.random()*botReinforcementLearning.length)](false);
	const bot = new botReinforcementLearning[1](false);
	await wait(20);
	startGame(new HumanPlayer(socket, true, data), bot);
}

const trainParrallel = async () => {
	await ReinforcementLearning.waitUntilConnected();
	// const bot = new botReinforcementLearning[Math.floor(Math.random()*botReinforcementLearning.length)](true);
	// const opponent = new botOpponents[Math.floor(Math.random()*botOpponents.length)](false);
	const bot = new botReinforcementLearning[1](true, true);
	const opponent = new botOpponents[2](false, true);
	await wait(20);
	const result = await botTrainingGame(bot, opponent);
	console.log(result + " from " + bot.name + " against " + opponent.name);
	trainParrallel();
}

// Train the IA
const train = async () => {
	console.log("Training started");
	for (let i=0 ; i<4 ; i++) {
		trainParrallel();
	}
}

export default {
	playerJoin,
	playerAgainstIdle,
	playerAgainstBot,
	train,
}
