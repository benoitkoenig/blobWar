"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blob = function () {
	// Blob's attributes are not private, bc they can be accessed from Cards
	function Blob(id) {
		_classCallCheck(this, Blob);

		this.x = 0;
		this.y = 0;
		this.orientation = 0;
		this.alive = true;
		this.destination = null;
		this.status = "normal"; // normal means if he collides an enemy blob, he dies. fury means he will kill but not die
		this.removeIterate = false;
		this.canCastSpell = true;
	}

	// Only used at initialisation


	_createClass(Blob, [{
		key: "setPosition",
		value: function setPosition(xPos, yPos, orientationVal) {
			this.x = xPos;
			this.y = yPos;
			this.orientation = orientationVal;
		}

		// Manage the movement of the blob

	}, {
		key: "iterate",
		value: function iterate() {
			if (this.removeIterate) {
				this.removeIterate = false;
				return;
			}
			if (this.destination == null || !this.alive) return;
			var speed = 0.005;
			var distance = Math.sqrt(Math.pow(this.destination.x - this.x, 2) + Math.pow(this.destination.y - this.y, 2));
			this.orientation = Math.abs(this.destination.x - this.x) >= Math.abs(this.destination.y - this.y) ? this.destination.x >= this.x ? 0 : 2 : this.destination.y >= this.y ? 1 : 3;
			if (distance <= speed) {
				this.x = this.destination.x;
				this.y = this.destination.y;
				this.destination = null;
			} else {
				this.x += (this.destination.x - this.x) / distance * speed;
				this.y += (this.destination.y - this.y) / distance * speed;
			}
		}

		// used to send data to the front-end. Also used to calculate which blob to kill

	}, {
		key: "getData",
		value: function getData() {
			return {
				x: this.x,
				y: this.y,
				orientation: this.orientation,
				alive: this.alive,
				status: this.status
			};
		}
	}]);

	return Blob;
}();

exports.default = Blob;