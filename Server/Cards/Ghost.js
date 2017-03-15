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

var Ghost = function (_Card) {
	_inherits(Ghost, _Card);

	function Ghost() {
		_classCallCheck(this, Ghost);

		var _this = _possibleConstructorReturn(this, (Ghost.__proto__ || Object.getPrototypeOf(Ghost)).call(this));

		_this._idBlob = null;
		return _this;
	}

	_createClass(Ghost, [{
		key: "trigger",
		value: function trigger(data, army) {
			var blob = army[data.idBlob];
			if (this._idBlob == data.idBlob) {
				// Spell is being canceled
				blob.status = "normal";
				this._idBlob = null;
				return;
			} else if (!blob.canCastSpell || !blob.alive) {
				return;
			} else if (this._idBlob != null) {
				army[this._idBlob].status = "normal";
			}
			this._idBlob = data.idBlob;
			blob.status = "ghost";
		}
	}, {
		key: "iterate",
		value: function iterate(army, enemy) {
			if (this._idBlob == null) return;
			var blob = army[this._idBlob];
		}
	}]);

	return Ghost;
}(_Card3.default);

exports.default = Ghost;