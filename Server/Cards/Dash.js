"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Card2 = require("./Card.js");

var _Card3 = _interopRequireDefault(_Card2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dash = function (_Card) {
	_inherits(Dash, _Card);

	function Dash() {
		_classCallCheck(this, Dash);

		var _this = _possibleConstructorReturn(this, (Dash.__proto__ || Object.getPrototypeOf(Dash)).call(this));

		_this._counter = 0;
		_this._idBlob = null;
		_this._used = false;
		return _this;
	}

	_createClass(Dash, [{
		key: "trigger",
		value: function trigger(data, army) {
			var blob = army[data.idBlob];
			if (this._idBlob != null || !blob.canCastSpell || !blob.alive || this._counter != 0 || this._used) return;
			this._idBlob = data.idBlob;
			this._counter = 6;
			this._destination = data.destination;
			blob.destination = null;
			blob.status = "fury";
			blob.canCastSpell = false;
			this._used = true;
		}
	}, {
		key: "iterate",
		value: function iterate(army, enemy) {
			if (this._counter == 0) return;
			var blob = army[this._idBlob];
			if (this._counter == 1) {
				blob.status = "normal";
				blob.canCastSpell = true;
				this._idBlob = null;
			}
			this._counter -= 1;
			blob.removeIterate = true;
			var speed = 0.02;
			var distance = Math.sqrt(Math.pow(this._destination.x - blob.x, 2) + Math.pow(this._destination.y - blob.y, 2));
			if (distance != 0) {
				blob.orientation = Math.abs(this._destination.x - blob.x) >= Math.abs(this._destination.y - blob.y) ? this._destination.x >= blob.x ? 0 : 2 : this._destination.y >= blob.y ? 1 : 3;
			}
			if (distance <= speed) {
				blob.x = this._destination.x;
				blob.y = this._destination.y;
				blob.destination = null;
			} else {
				blob.x += (this._destination.x - blob.x) / distance * speed;
				blob.y += (this._destination.y - blob.y) / distance * speed;
			}
			for (var i = 0; i < enemy.length; i++) {
				var dist = Math.sqrt(Math.pow(enemy[i].x - blob.x, 2) + Math.pow(enemy[i].y - blob.y, 2));
				if (dist <= 0.04 && enemy[i].alive && enemy[i].status != "ghost") {
					// This means we are responsible for his death
					this._used = false;
				}
			}
		}
	}]);

	return Dash;
}(_Card3.default);

exports.default = Dash;