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

var Gravity = function (_Card) {
	_inherits(Gravity, _Card);

	function Gravity() {
		_classCallCheck(this, Gravity);

		var _this = _possibleConstructorReturn(this, (Gravity.__proto__ || Object.getPrototypeOf(Gravity)).call(this));

		_this._idBlob = null;
		return _this;
	}

	_createClass(Gravity, [{
		key: "trigger",
		value: function trigger(data, army) {
			var blob = army[data.idBlob];
			if (this._idBlob != null || !blob.canCastSpell || !blob.alive) return;
			this._idBlob = data.idBlob;
			blob.destination = null;
		}
	}, {
		key: "iterate",
		value: function iterate(army, enemy) {
			if (this._idBlob == null) return;
			var blob = army[this._idBlob];
			blob.removeIterate = true;
			if (!blob.alive) {
				this._idBlob = null;
				return;
			}
			for (var i = 0; i < enemy.length; i++) {
				var dist = Math.sqrt(Math.pow(enemy[i].x - blob.x, 2) + Math.pow(enemy[i].y - blob.y, 2));
				var speed = .001 / dist;
				if (speed >= dist) {
					enemy[i].x = blob.x;
					enemy[i].y = blob.y;
				} else {
					enemy[i].x += (blob.x - enemy[i].x) / dist * speed;
					enemy[i].y += (blob.y - enemy[i].y) / dist * speed;
				}
			}
		}
	}]);

	return Gravity;
}(_Card3.default);

exports.default = Gravity;