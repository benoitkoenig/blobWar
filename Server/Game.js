"use strict";

var _Player = require("./Player.js");

// A whole game consists in this piece of code being repeted 40 times per second
var startGame = function startGame(player1, player2) {
	var iteration = setInterval(function () {
		player1.iterate();
		player2.iterate();
		var toKill1 = player1.iterateCards(player2);
		var toKill2 = player2.iterateCards(player1);
		player1.kill(toKill2);
		player2.kill(toKill1);
		if (player1.lost() && player2.lost()) {
			player1.emit("endOfGame", "It's a draw");
			player2.emit("endOfGame", "It's a draw");
			clearInterval(iteration);
		} else if (player1.lost()) {
			player1.emit("endOfGame", "Defeat");
			player2.emit("endOfGame", "Victory !");
			clearInterval(iteration);
		} else if (player2.lost()) {
			player1.emit("endOfGame", "Victory !");
			player2.emit("endOfGame", "Defeat");
			clearInterval(iteration);
		} else {
			var army1 = player1.getArmy();
			var army2 = player2.getArmy();
			player1.emit("update", { army: player1.getArmy(), enemy: player2.getArmy() });
			player2.emit("update", { army: player2.getArmy(), enemy: player1.getArmy() });
			if (!player1.isStillConnected() && !player2.isStillConnected()) clearInterval(iteration);
		}
	}, 25);
};

// Match Making
exports.playerJoin = function () {
	var waitingSocket = null;
	var waitingData = null;
	var disconnect = function disconnect() {
		waitingSocket = null;
	};
	return function (socket, data) {
		if (waitingSocket == null) {
			waitingSocket = socket;
			waitingData = data;
			waitingSocket.on("disconnect", disconnect);
			waitingSocket.on("cancelMatchMaking", disconnect);
		} else {
			// We set the countdown
			(function (socket1, data1, socket2, data2) {
				[0, 1, 2, 3].forEach(function (i) {
					setTimeout(function () {
						socket1.emit("countDownToGame", 3 - i);
						socket2.emit("countDownToGame", 3 - i);
						// (i == 3) End of the countdown. The game starts here
						if (i == 3) startGame(new _Player.HumanPlayer(socket1, true, data1), new _Player.HumanPlayer(socket2, false, data2));
					}, 1000 * i);
				});
			})(waitingSocket, waitingData, socket, data);
			// We clear waiting Socket for the next player to join
			waitingSocket.removeListener("disconnect", disconnect);
			waitingSocket.removeListener("cancelMatchMaking", disconnect);
			waitingSocket = null;
		}
	};
}();

// Training mode
exports.playerAgainstBot = function (socket, data) {
	startGame(new _Player.HumanPlayer(socket, true, data), new _Player.BotPlayer());
};