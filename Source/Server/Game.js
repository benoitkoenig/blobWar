import {BotPlayer, HumanPlayer} from "./Player.js"

// A whole game consists in this piece of code being repeted 40 times per second
const startGame = (player1, player2) => {
	let iteration = setInterval(() => {
		player1.iterate();
		player2.iterate();
		const toKill1 = player1.iterateCards(player2);
		const toKill2 = player2.iterateCards(player1);
		player1.kill(toKill2);
		player2.kill(toKill1);
		if (player1.lost() || player2.lost()) {
			if (player1.lost() && player2.lost()) {
				player1.emit("endOfGame", "It's a draw");
				player2.emit("endOfGame", "It's a draw");
			} else if (player1.lost()) {
				player1.emit("endOfGame", "Defeat");
				player2.emit("endOfGame", "Victory !");
			} else if (player2.lost()) {
				player1.emit("endOfGame", "Victory !");
				player2.emit("endOfGame", "Defeat");
			}
			player1.clear();
			player2.clear();
			clearInterval(iteration);
		} else {
			const army1 = player1.getArmy();
			const army2 = player2.getArmy();
			player1.emit("update", {army: player1.getArmy(), enemy: player2.getArmy()});
			player2.emit("update", {army: player2.getArmy(), enemy: player1.getArmy()});
			if (!player1.isStillConnected() && !player2.isStillConnected()) clearInterval(iteration);
		}
	}, 25);
}

// Match Making
exports.playerJoin = (() => {
	let waitingSocket = null;
	let waitingData = null;
	const disconnect = () => { waitingSocket = null; }
	return (socket, data) => {
		if (waitingSocket == null) {
			waitingSocket = socket;
			waitingData = data;
			waitingSocket.on("disconnect", disconnect);
			waitingSocket.on("cancelMatchMaking", disconnect);
		} else {
			// We set the countdown
			((socket1, data1, socket2, data2) => {
				[0, 1, 2, 3].forEach((i) => {
					setTimeout(() => {
						socket1.emit("countDownToGame", 3-i);
						socket2.emit("countDownToGame", 3-i);
						// (i == 3) End of the countdown. The game starts here
						if (i == 3) startGame(
							new HumanPlayer(socket1, true, data1),
							new HumanPlayer(socket2, false, data2)
						);
					}, 1000*i);
				});
			})(waitingSocket, waitingData, socket, data);
			// We clear waiting Socket for the next player to join
			waitingSocket.removeListener("disconnect", disconnect);
			waitingSocket.removeListener("cancelMatchMaking", disconnect);
			waitingSocket = null;
		}
	}
})();

// Training mode
exports.playerAgainstBot = (socket, data) => {
	startGame(new HumanPlayer(socket, true, data), new BotPlayer());
}
