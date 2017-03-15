"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HumanPlayer = exports.BotPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dash = require("./Cards/Dash.js");

var _Dash2 = _interopRequireDefault(_Dash);

var _Bloc = require("./Cards/Bloc.js");

var _Bloc2 = _interopRequireDefault(_Bloc);

var _Ghost = require("./Cards/Ghost.js");

var _Ghost2 = _interopRequireDefault(_Ghost);

var _Kamikaze = require("./Cards/Kamikaze.js");

var _Kamikaze2 = _interopRequireDefault(_Kamikaze);

var _Gravity = require("./Cards/Gravity.js");

var _Gravity2 = _interopRequireDefault(_Gravity);

var _Revive = require("./Cards/Revive.js");

var _Revive2 = _interopRequireDefault(_Revive);

var _Blob = require("./Blob.js");

var _Blob2 = _interopRequireDefault(_Blob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// A JSON to load them all would be handy

var Cards = {};

Cards["Dash"] = _Dash2.default;
Cards["Bloc"] = _Bloc2.default;
Cards["Ghost"] = _Ghost2.default;
Cards["Kamikaze"] = _Kamikaze2.default;
Cards["Gravity"] = _Gravity2.default;
Cards["Revive"] = _Revive2.default;

var Player = function () {
	function Player(firstPlayer, cards) {
		_classCallCheck(this, Player);

		this._army = [new _Blob2.default(), new _Blob2.default(), new _Blob2.default()];
		this._cards = [new Cards[cards[0]](), new Cards[cards[1]]()];

		if (firstPlayer) {
			this._army[0].setPosition(0.2, 0.1, 1);
			this._army[1].setPosition(0.5, 0.1, 1);
			this._army[2].setPosition(0.8, 0.1, 1);
		} else {
			this._army[0].setPosition(0.2, 0.9, 3);
			this._army[1].setPosition(0.5, 0.9, 3);
			this._army[2].setPosition(0.8, 0.9, 3);
		}
	}

	_createClass(Player, [{
		key: "iterate",
		value: function iterate() {
			this._army.forEach(function (blob) {
				blob.iterate();
			});
		}
	}, {
		key: "getArmy",
		value: function getArmy() {
			return this._army;
		}
	}, {
		key: "getArmyData",
		value: function getArmyData() {
			return [this._army[0].getData(), this._army[1].getData(), this._army[2].getData()];
		}
	}, {
		key: "emit",
		value: function emit() {} // HumanPlayer overrides this, BotPlayer doesn't

	}, {
		key: "_doWeKillIt",
		value: function _doWeKillIt(blob, enemyBlob) {
			if (Math.sqrt(Math.pow(enemyBlob.x - blob.x, 2) + Math.pow(enemyBlob.y - blob.y, 2)) > 0.04) return false;
			if (!blob.alive || !enemyBlob.alive) return false;
			if (enemyBlob.status == "fury" && blob.status != "fury") return false;
			if (blob.status == "ghost" || enemyBlob.status == "ghost") return false;
			return true;
		}
	}, {
		key: "iterateCards",
		value: function iterateCards(enemyPlayer) {
			var _this = this;

			var toKill = [];
			this._cards.forEach(function (card) {
				card.iterate(_this._army, enemyPlayer.getArmy());
			});
			this._army.forEach(function (blob) {
				enemyPlayer.getArmyData().forEach(function (enemyBlob, enemyId) {
					if (_this._doWeKillIt(blob, enemyBlob)) toKill.push(enemyId);
				});
			});
			return toKill;
		}
	}, {
		key: "kill",
		value: function kill(list) {
			var _this2 = this;

			list.forEach(function (id) {
				if (id != null) _this2._army[id].alive = false;_this2._army[id].destination = null;
			});
		}
	}, {
		key: "lost",
		value: function lost() {
			var deads = 0;
			this._army.forEach(function (blob) {
				if (!blob.alive) deads += 1;
			});
			if (deads == 3) return true;
			return false;
		}
	}]);

	return Player;
}();

// An idle opponent to train on


var BotPlayer = exports.BotPlayer = function (_Player) {
	_inherits(BotPlayer, _Player);

	function BotPlayer() {
		_classCallCheck(this, BotPlayer);

		return _possibleConstructorReturn(this, (BotPlayer.__proto__ || Object.getPrototypeOf(BotPlayer)).call(this, false, ["Dash", "Bloc"]));
	}

	_createClass(BotPlayer, [{
		key: "isStillConnected",
		value: function isStillConnected() {
			return false;
		}
	}]);

	return BotPlayer;
}(Player);

// A human player with a socket


var HumanPlayer = exports.HumanPlayer = function (_Player2) {
	_inherits(HumanPlayer, _Player2);

	function HumanPlayer(socket, firstPlayer, data) {
		_classCallCheck(this, HumanPlayer);

		var _this4 = _possibleConstructorReturn(this, (HumanPlayer.__proto__ || Object.getPrototypeOf(HumanPlayer)).call(this, firstPlayer, data));

		_this4._socket = socket;
		_this4._initSockets();
		_this4._connected = true;

		return _this4;
	}

	_createClass(HumanPlayer, [{
		key: "_initSockets",
		value: function _initSockets() {
			var _this5 = this;

			this._socket.on("setDestination", function (data) {
				_this5._army[data.id].destination = { x: data.x, y: data.y };
			});
			this._socket.on("disconnect", function () {
				_this5._connected = false;
			});
			this._socket.on("triggerCard", function (data) {
				_this5._cards[data.id].trigger(data, _this5._army);
			});
		}
	}, {
		key: "isStillConnected",
		value: function isStillConnected() {
			return this._connected;
		}
	}, {
		key: "emit",
		value: function emit(name, data) {
			this._socket.emit(name, data);
		}
	}]);

	return HumanPlayer;
}(Player);