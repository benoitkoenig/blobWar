"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Card = function (_React$Component) {
	_inherits(Card, _React$Component);

	// Cards displayed in the colorSwitch, qith buttons to select them either on space bar or on right click
	function Card(props) {
		_classCallCheck(this, Card);

		var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));

		_this.assignFirstSpell = _this.assignFirstSpell.bind(_this);
		_this.assignSecondSpell = _this.assignSecondSpell.bind(_this);
		return _this;
	}

	_createClass(Card, [{
		key: "assignFirstSpell",
		value: function assignFirstSpell() {
			this.props.assignSpell(0, this.props.title);
		}
	}, {
		key: "assignSecondSpell",
		value: function assignSecondSpell() {
			this.props.assignSpell(1, this.props.title);
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "card" },
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
				React.createElement(
					"div",
					{ className: "button" },
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "Assets/ButtonSpace" + (this.props.firstSpell ? "Blue" : "") + ".png", onClick: this.assignFirstSpell })
					),
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "Assets/ButtonRightClick" + (this.props.secondSpell ? "Blue" : "") + ".png", onClick: this.assignSecondSpell })
					)
				)
			);
		}
	}]);

	return Card;
}(React.Component);

var CardsSwitch = function (_React$Component2) {
	_inherits(CardsSwitch, _React$Component2);

	function CardsSwitch(props) {
		_classCallCheck(this, CardsSwitch);

		var _this2 = _possibleConstructorReturn(this, (CardsSwitch.__proto__ || Object.getPrototypeOf(CardsSwitch)).call(this, props));

		_this2.goBack = _this2.goBack.bind(_this2);
		_this2.assignSpell = _this2.assignSpell.bind(_this2);
		_this2.state = {
			firstSpell: _this2.props.cards.getCard(0),
			secondSpell: _this2.props.cards.getCard(1)
		};
		return _this2;
	}

	// The changes are saved on real time, so validation only consists in displaying the menu


	_createClass(CardsSwitch, [{
		key: "goBack",
		value: function goBack() {
			this.props.displayer.trigger("Container", "Menu");
		}

		// Function called in the Card class, defined here to update the state thus re-rendering if necessary

	}, {
		key: "assignSpell",
		value: function assignSpell(spellId, cardName) {
			this.props.cards.setCard(spellId, cardName);
			if (spellId == 0) this.setState({ firstSpell: cardName });
			if (spellId == 1) this.setState({ secondSpell: cardName });
		}
	}, {
		key: "render",
		value: function render() {
			var cards = []; // The list of cards which is displayed
			for (var i = 0; i < this.props.cards.data.length; i++) {
				var title = this.props.cards.data[i].title;
				var description = this.props.cards.data[i].description;
				cards.push(React.createElement(Card, { title: title, description: description, assignSpell: this.assignSpell, firstSpell: this.state.firstSpell == title, secondSpell: this.state.secondSpell == title }));
			}
			return React.createElement(
				"div",
				{ className: "cardsSwitch" },
				React.createElement(
					"div",
					{ id: "cardsContainer" },
					" ",
					cards,
					" "
				),
				React.createElement(
					"div",
					{ id: "confirmButton", onClick: this.goBack },
					" Confirm "
				)
			);
		}
	}]);

	return CardsSwitch;
}(React.Component);