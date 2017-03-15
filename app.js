"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _socket = require("socket.io");

var _socket2 = _interopRequireDefault(_socket);

var _Game = require("./Server/Game.js");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = _socket2.default.listen(server);

app.use("/", _express2.default.static(__dirname + "/Client"));

// When a user connects, he can either look for an opponent or fight an idle opponent (bot)
io.sockets.on("connection", function (socket) {
	socket.on("PlayAgainstBot", function (data) {
		_Game2.default.playerAgainstBot(socket, data);
	});
	socket.on("MatchMaking", function (data) {
		_Game2.default.playerJoin(socket, data);
	});
});

server.listen(process.env.PORT || 8080); // process.env.PORT is for Heroku