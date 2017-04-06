import http from "http";
import express from "express";
import SocketIO from "socket.io";
import socket from "socket.io";
import game from "./Server/Game.js";

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

app.use("/", express.static(__dirname+"/Client"));

// When a user connects, he can either look for an opponent or fight an idle opponent (bot)
io.on("connection", (socket) => {
	socket.on("action", (action) => {
		if (action.category === "Idle") {
			game.playerAgainstIdle(socket, action.cards);
		} else if (action.category === "Bot") {
			game.playerAgainstBot(socket, action.cards);
		} else if (action.category === "MatchMaking") {
			game.playerJoin(socket, action.cards);
		}
	});
});

server.listen(process.env.PORT || 8080); // process.env.PORT is for Heroku
