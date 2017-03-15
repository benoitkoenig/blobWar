"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HowToPlay = function (_React$Component) {
	_inherits(HowToPlay, _React$Component);

	function HowToPlay() {
		_classCallCheck(this, HowToPlay);

		return _possibleConstructorReturn(this, (HowToPlay.__proto__ || Object.getPrototypeOf(HowToPlay)).apply(this, arguments));
	}

	_createClass(HowToPlay, [{
		key: "render",

		// A simple alert with a back button
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"div",
				{ id: "darkPart", onClick: function onClick(ev) {
						if (ev.target.id == "darkPart") _this2.props.displayer.trigger("Alert", null);
					} },
				React.createElement(
					"div",
					{ id: "alertContainer", className: "howToPlay" },
					React.createElement(
						"p",
						null,
						" Blob War is a two-player game. Each player has ",
						React.createElement(
							"span",
							{ className: "blue" },
							"3 blobs and 2 cards"
						),
						". To win, you must kill all enemy blobs while keeping at least one of yours alive "
					),
					React.createElement(
						"p",
						null,
						" When two blobs from different teams ",
						React.createElement(
							"span",
							{ className: "blue" },
							"collide"
						),
						", they kill each other. A ",
						React.createElement(
							"span",
							{ className: "blue" },
							"blob with a hat"
						),
						" will survive the collision. If both blobs have a hat, they both die. Hats can be given by some cards "
					),
					React.createElement(
						"p",
						null,
						" You can select a blob with ",
						React.createElement(
							"span",
							{ className: "blue" },
							"W"
						),
						", ",
						React.createElement(
							"span",
							{ className: "blue" },
							"E"
						),
						", or ",
						React.createElement(
							"span",
							{ className: "blue" },
							"R"
						),
						" keys and move them with ",
						React.createElement(
							"span",
							{ className: "blue" },
							"Left Click"
						),
						". Your cards can be triggered by ",
						React.createElement(
							"span",
							{ className: "blue" },
							"Space Key"
						),
						" and ",
						React.createElement(
							"span",
							{ className: "blue" },
							"Right Click"
						),
						" "
					),
					React.createElement(
						"p",
						null,
						" Now, just pick ",
						React.createElement(
							"span",
							{ className: "blue" },
							"two random cards"
						),
						" and try a ",
						React.createElement(
							"span",
							{ className: "blue" },
							"Training Mod"
						),
						" to test the game against an idle opponent "
					),
					React.createElement(
						"div",
						{ className: "goBack", onClick: function onClick() {
								_this2.props.displayer.trigger("Alert", null);
							} },
						" Back to the Menu "
					)
				)
			);
		}
	}]);

	return HowToPlay;
}(React.Component);