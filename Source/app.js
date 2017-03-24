"use strict";

import http from "http"
import express from "express"
import socket from "socket.io"
import game from "./Server/Game.js"

const app = express();
const server = http.createServer(app);
const io = socket.listen(server);

app.use("/", express.static(__dirname+"/Client"));

// When a user connects, he can either look for an opponent or fight an idle opponent (bot)
io.sockets.on("connection", (socket) => {
	socket.on("PlayAgainstIdle", (data) => { game.playerAgainstIdle(socket, data); });
	socket.on("PlayAgainstBot", (data) => { game.playerAgainstBot(socket, data); });
	socket.on("MatchMaking", (data) => { game.playerJoin(socket, data); });
});

server.listen(process.env.PORT || 8080); // process.env.PORT is for Heroku
