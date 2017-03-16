"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = function (_React$Component) {
	_inherits(Body, _React$Component);

	function Body(props) {
		_classCallCheck(this, Body);

		var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

		_this.state = { "Container": "Menu", "Alert": null };
		return _this;
	}

	_createClass(Body, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			var _this2 = this;

			this.props.displayer.on("Container", function (name) {
				_this2.setState({ "Container": name });
			});
			this.props.displayer.on("Alert", function (name) {
				_this2.setState({ "Alert": name });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var container = null;
			var alert = null;

			if (this.state.Container == "Menu") container = React.createElement(Menu, { displayer: displayer, nodeConnection: nodeConnection, cards: cards });
			if (this.state.Container == "Board") container = React.createElement(Board, { displayer: displayer, nodeConnection: nodeConnection, cards: cards });
			if (this.state.Container == "CardsSwitch") container = React.createElement(CardsSwitch, { displayer: displayer, cards: cards });

			if (this.state.Alert == "MatchMaker") alert = React.createElement(MatchMaker, { displayer: displayer, nodeConnection: nodeConnection });
			if (this.state.Alert == "CountDownToMatchMade") alert = React.createElement(CountDownToMatchMade, { displayer: displayer, nodeConnection: nodeConnection });
			if (this.state.Alert == "NoCardsNoMatchMaking") alert = React.createElement(NoCardsNoMatchMaking, { displayer: displayer });
			if (this.state.Alert == "HowToPlay") alert = React.createElement(HowToPlay, { displayer: displayer });
			if (this.state.Alert == "EndOfGame") alert = React.createElement(EndOfGame, { displayer: displayer, nodeConnection: nodeConnection });

			return React.createElement(
				"div",
				null,
				React.createElement(Header, null),
				React.createElement(
					"div",
					{ id: "container" },
					container
				),
				React.createElement(
					"div",
					{ id: "alert" },
					alert
				)
			);
		}
	}]);

	return Body;
}(React.Component);