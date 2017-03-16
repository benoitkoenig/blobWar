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

var Switch = function (_Card) {
	_inherits(Switch, _Card);

	function Switch() {
		_classCallCheck(this, Switch);

		var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this));

		_this._counter = 0;
		return _this;
	}

	_createClass(Switch, [{
		key: "trigger",
		value: function trigger(data, army) {
			this._speeds = [];
			this._counter = 15;
			for (var id in army) {
				this._speeds.push({
					x: (army[(id + 1) % 3].x - army[id].x) / this._counter,
					y: (army[(id + 1) % 3].y - army[id].y) / this._counter
				});
				army[id].status = "fury";
				army[id].destination = null;
			}
		}
	}, {
		key: "iterate",
		value: function iterate(army, enemy) {
			if (this._counter == 0) return;
			for (var id in army) {
				army[id].x += this._speeds[id].x;
				army[id].y += this._speeds[id].y;
				army[id].removeIterate = true;
				if (this._counter == 1) army[id].status = "normal";
			}
			this._counter -= 1;
		}
	}]);

	return Switch;
}(_Card3.default);

exports.default = Switch;