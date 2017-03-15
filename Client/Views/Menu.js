"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardMenu = function (_React$Component) {
	_inherits(CardMenu, _React$Component);

	function CardMenu() {
		_classCallCheck(this, CardMenu);

		return _possibleConstructorReturn(this, (CardMenu.__proto__ || Object.getPrototypeOf(CardMenu)).apply(this, arguments));
	}

	_createClass(CardMenu, [{
		key: "render",

		// A card. Quite similar to cards in CardsSwitch
		value: function render() {
			return React.createElement(
				"div",
				{ className: "cardMenu" },
				React.createElement(
					"div",
					{ className: "title" },
					this.props.title
				),
				React.createElement(
					"div",
					{ className: "description" },
					this.props.description
				),
				React.createElement("img", { src: "Assets/" + (this.props.isSpace ? "ButtonSpace" : "ButtonRightClick") + ".png" })
			);
		}
	}]);

	return CardMenu;
}(React.Component);

var CardsMenu = function (_React$Component2) {
	_inherits(CardsMenu, _React$Component2);

	function CardsMenu() {
		_classCallCheck(this, CardsMenu);

		return _possibleConstructorReturn(this, (CardsMenu.__proto__ || Object.getPrototypeOf(CardsMenu)).apply(this, arguments));
	}

	_createClass(CardsMenu, [{
		key: "render",

		// The left side of the menu. Two states exists : both card are defined, or not
		value: function render() {
			var _this3 = this;

			var noCard = this.props.cards.card0 == null || this.props.cards.card1 == null;
			return React.createElement(
				"div",
				{ id: "cardsMenu", className: noCard ? "noCard" : "" },
				React.createElement(
					"div",
					{ id: "yourCards" },
					" Your Cards "
				),
				React.createElement("div", { className: "blank" }),
				React.createElement(
					"div",
					{ id: "cardsRandom", onClick: this.props.randomCards },
					React.createElement("img", { src: "Assets/Dices.png" }),
					React.createElement(
						"span",
						null,
						" Get random cards "
					)
				),
				React.createElement(
					"div",
					{ id: "cardsChoose", onClick: function onClick() {
							_this3.props.displayer.trigger("Container", "CardsSwitch");
						} },
					React.createElement("img", { src: "Assets/Cards.png" }),
					React.createElement(
						"span",
						null,
						" Choose your cards "
					)
				),
				React.createElement(
					"div",
					{ id: "cardsTutorial" },
					" Dont know what to do ? See ",
					React.createElement(
						"span",
						{ id: "cardsTutorialButton" },
						"How to play"
					),
					" "
				),
				React.createElement(CardMenu, { title: noCard ? "" : this.props.cards.card0, description: noCard ? "" : this.props.cards.desc0, isSpace: true }),
				React.createElement(CardMenu, { title: noCard ? "" : this.props.cards.card1, description: noCard ? "" : this.props.cards.desc1, isSpace: false })
			);
		}
	}]);

	return CardsMenu;
}(React.Component);

var Menu = function (_React$Component3) {
	_inherits(Menu, _React$Component3);

	// Main menu
	function Menu(props) {
		_classCallCheck(this, Menu);

		var _this4 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

		_this4.startGame = _this4.startGame.bind(_this4);
		_this4.startBotGame = _this4.startBotGame.bind(_this4);
		_this4.randomCards = _this4.randomCards.bind(_this4);
		_this4.state = {
			cardsValue: {
				card0: _this4.props.cards.getCard(0),
				card1: _this4.props.cards.getCard(1),
				desc0: _this4.props.cards.getDesc(0),
				desc1: _this4.props.cards.getDesc(1)
			}
		};
		return _this4;
	}

	// Start the match making


	_createClass(Menu, [{
		key: "startGame",
		value: function startGame() {
			if (this.state.cardsValue.card0 == null || this.state.cardsValue.card1 == null) {
				this.props.displayer.trigger("Alert", "NoCardsNoMatchMaking");
			} else {
				this.props.nodeConnection.init();
				this.props.displayer.trigger("Alert", "MatchMaker");
			}
		}

		// Start the game against an idle opponent

	}, {
		key: "startBotGame",
		value: function startBotGame() {
			if (this.state.cardsValue.card0 == null || this.state.cardsValue.card1 == null) {
				this.props.displayer.trigger("Alert", "NoCardsNoMatchMaking");
			} else {
				this.props.nodeConnection.initBotGame();
				this.props.displayer.trigger("Container", "Board");
			}
		}

		// Calls cards to set two random cards and get the result in state for render

	}, {
		key: "randomCards",
		value: function randomCards() {
			this.props.cards.random();
			this.setState({
				cardsValue: {
					card0: this.props.cards.getCard(0),
					card1: this.props.cards.getCard(1),
					desc0: this.props.cards.getDesc(0),
					desc1: this.props.cards.getDesc(1)
				}
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this5 = this;

			// The left side of the menu is a different React class bc it is quite complex, while the right side consists only of three buttons
			return React.createElement(
				"div",
				{ className: "menu" },
				React.createElement(CardsMenu, { className: "cardsMenuContainer", displayer: this.props.displayer, randomCards: this.randomCards, cards: this.state.cardsValue }),
				React.createElement(
					"div",
					{ id: "start" },
					React.createElement("div", { className: "blank" }),
					React.createElement(
						"div",
						{ id: "startTutorial", onClick: function onClick() {
								_this5.props.displayer.trigger("Alert", "HowToPlay");
							} },
						" How to play "
					),
					React.createElement(
						"div",
						{ id: "startMatchMaking", onClick: this.startGame },
						" Match Making "
					),
					React.createElement(
						"div",
						{ id: "startBotGame", onClick: this.startBotGame },
						" Training Mod "
					)
				)
			);
		}
	}]);

	return Menu;
}(React.Component);