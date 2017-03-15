"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoCardsNoMatchMaking = function (_React$Component) {
	_inherits(NoCardsNoMatchMaking, _React$Component);

	function NoCardsNoMatchMaking(props) {
		_classCallCheck(this, NoCardsNoMatchMaking);

		var _this = _possibleConstructorReturn(this, (NoCardsNoMatchMaking.__proto__ || Object.getPrototypeOf(NoCardsNoMatchMaking)).call(this, props));

		_this.gotIt = _this.gotIt.bind(_this);
		_this.clickOnDark = _this.clickOnDark.bind(_this);
		return _this;
	}

	_createClass(NoCardsNoMatchMaking, [{
		key: "gotIt",
		value: function gotIt() {
			this.props.displayer.trigger("Alert", null);
		}
	}, {
		key: "clickOnDark",
		value: function clickOnDark(ev) {
			if (ev.target.id == "darkPart") this.gotIt();
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "darkPart", onClick: this.clickOnDark },
				React.createElement(
					"div",
					{ id: "alertContainer", className: "matchMaker" },
					React.createElement(
						"div",
						{ id: "matchMakerLookForOpponent" },
						" You need to pick 2 cards to play with "
					),
					React.createElement(
						"div",
						{ id: "matchMakerCancel", onClick: this.gotIt },
						" Got it "
					)
				)
			);
		}
	}]);

	return NoCardsNoMatchMaking;
}(React.Component);

var CountDownToMatchMade = function (_React$Component2) {
	_inherits(CountDownToMatchMade, _React$Component2);

	function CountDownToMatchMade(props) {
		_classCallCheck(this, CountDownToMatchMade);

		var _this2 = _possibleConstructorReturn(this, (CountDownToMatchMade.__proto__ || Object.getPrototypeOf(CountDownToMatchMade)).call(this, props));

		props.nodeConnection.on("countDownToGame", function (timeLeft) {
			if (timeLeft == 0) {
				_this2.props.displayer.trigger("Alert", null);
				_this2.props.displayer.trigger("Container", "Board");
			} else {
				_this2.setState({ countDown: timeLeft });
			}
		});
		_this2.state = { countDown: 3 };
		return _this2;
	}

	_createClass(CountDownToMatchMade, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "darkPart" },
				React.createElement(
					"div",
					{ id: "alertContainer", className: "matchMaker" },
					React.createElement(
						"div",
						{ id: "matchMakerCountDown" },
						" The game will start in "
					),
					React.createElement(
						"div",
						{ id: "matchMakerCountDownValue" },
						" ",
						this.state.countDown,
						" "
					)
				)
			);
		}
	}]);

	return CountDownToMatchMade;
}(React.Component);

var MatchMaker = function (_React$Component3) {
	_inherits(MatchMaker, _React$Component3);

	function MatchMaker(props) {
		_classCallCheck(this, MatchMaker);

		var _this3 = _possibleConstructorReturn(this, (MatchMaker.__proto__ || Object.getPrototypeOf(MatchMaker)).call(this, props));

		_this3.cancelMatchMaking = _this3.cancelMatchMaking.bind(_this3);
		props.nodeConnection.on("countDownToGame", function (timeLeft) {
			_this3.props.displayer.trigger("Alert", "CountDownToMatchMade");
		});
		return _this3;
	}

	_createClass(MatchMaker, [{
		key: "cancelMatchMaking",
		value: function cancelMatchMaking() {
			this.props.nodeConnection.cancelMatchMaking();
			this.props.displayer.trigger("Alert", null);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ id: "darkPart" },
				React.createElement(
					"div",
					{ id: "alertContainer", className: "matchMaker" },
					React.createElement(
						"div",
						{ id: "matchMakerLookForOpponent" },
						" Waiting for an opponent",
						React.createElement(
							"span",
							{ className: "threePointsAnimation" },
							React.createElement(
								"span",
								null,
								"."
							),
							React.createElement(
								"span",
								null,
								"."
							),
							React.createElement(
								"span",
								null,
								"."
							)
						)
					),
					React.createElement(
						"div",
						{ id: "matchMakerCancel", onClick: this.cancelMatchMaking },
						" Cancel "
					)
				)
			);
		}
	}]);

	return MatchMaker;
}(React.Component);