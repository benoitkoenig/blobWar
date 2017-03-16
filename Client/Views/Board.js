"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BoardCard = function (_React$Component) {
	_inherits(BoardCard, _React$Component);

	function BoardCard() {
		_classCallCheck(this, BoardCard);

		return _possibleConstructorReturn(this, (BoardCard.__proto__ || Object.getPrototypeOf(BoardCard)).apply(this, arguments));
	}

	_createClass(BoardCard, [{
		key: "render",

		// It is mostly the same as CardsMenu -> I could merge the classes
		value: function render() {
			return React.createElement(
				"div",
				{ className: "boardCard" + (this.props.moveCard ? " moveCard" : "") },
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
				React.createElement("img", { src: "Assets/" + this.props.buttonName + ".png" })
			);
		}
	}]);

	return BoardCard;
}(React.Component);

var BlobView = function (_React$Component2) {
	_inherits(BlobView, _React$Component2);

	// Render the blob and any attribute attached (hat, pointer, etc..)
	function BlobView(props) {
		_classCallCheck(this, BlobView);

		var _this2 = _possibleConstructorReturn(this, (BlobView.__proto__ || Object.getPrototypeOf(BlobView)).call(this, props));

		_this2.state = { hatId: parseInt(Math.random() * 6) };
		return _this2;
	}

	_createClass(BlobView, [{
		key: "render",
		value: function render() {
			var data = this.props.blob;
			if (!data.alive) return React.createElement("div", null);
			var style = {
				left: (data.x - 0.05) * 100 + "%",
				top: (data.y - 0.075) * 100 + "%", // We align the position to the base of the blob, which is slighlty below the png's center
				opacity: data.status == "ghost" ? 0.3 : 1
			};
			var name = this.props.team ? "Blob" : "Enemy";
			var hatStyle = { visibility: data.status == "fury" ? "visible" : "hidden" };
			var keyBlob = this.props.selected ? "Active" : this.props.idBlob == 0 ? "W" : this.props.idBlob == 1 ? "E" : "R";
			var pointerStyle = { visibility: this.props.team ? "visible" : "hidden" };
			return React.createElement(
				"div",
				{ className: "blob", style: style },
				React.createElement("img", { src: "Assets/" + name + data.orientation + ".png" }),
				React.createElement("img", { src: "Assets/Hat" + this.state.hatId + ".png", style: hatStyle }),
				React.createElement("img", { src: "Assets/Pointer" + keyBlob + ".png", style: pointerStyle })
			);
		}
	}]);

	return BlobView;
}(React.Component);

var Board = function (_React$Component3) {
	_inherits(Board, _React$Component3);

	function Board(props) {
		_classCallCheck(this, Board);

		var _this3 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

		_this3.mouseClick = _this3.mouseClick.bind(_this3);
		_this3.rightClick = _this3.rightClick.bind(_this3);
		_this3.mouseMove = _this3.mouseMove.bind(_this3);
		_this3.keyPressed = _this3.keyPressed.bind(_this3);
		_this3.mousePos = { x: 0, y: 0 };
		_this3.state = { idBlob: 0, army: [], enemy: [] };
		return _this3;
	}

	_createClass(Board, [{
		key: "keyPressed",
		value: function keyPressed(ev) {
			if (ev.code == "Space") {
				// Triggers the first spell
				this.props.nodeConnection.triggerCard(0, this.state.idBlob, this.mousePos);
			}
			var id = ev.code == "KeyW" ? 0 : ev.code == "KeyE" ? 1 : ev.code == "KeyR" ? 2 : null;
			if (id != null) this.setState({ idBlob: id });
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			var _this4 = this;

			// Listen to keyboard events for the blob's selection and the space key card
			document.addEventListener("keypress", this.keyPressed);
			this.props.nodeConnection.on("update", function (data) {
				_this4.setState({
					army: data.army,
					enemy: data.enemy
				});
			});
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			// Stops listening to the events, otherwise it doesn't stop and causes issues
			document.removeEventListener("keypress", this.keyPressed);
		}
	}, {
		key: "_getPosition",
		value: function _getPosition(mouseX, mouseY) {
			var board = document.getElementsByClassName("board")[0];
			var offsets = board.getBoundingClientRect();
			return {
				x: 1. * (mouseX - offsets.left) / board.offsetWidth,
				y: 1. * (mouseY - offsets.top) / board.offsetHeight
			};
		}
	}, {
		key: "mouseClick",
		value: function mouseClick(ev) {
			// Moves the blob to the targeted destination
			ev.preventDefault();
			this.props.nodeConnection.blobDestination(this.state.idBlob, this._getPosition(ev.clientX, ev.clientY));
		}
	}, {
		key: "rightClick",
		value: function rightClick(ev) {
			// Triggers the second spell
			ev.preventDefault();
			this.props.nodeConnection.triggerCard(1, this.state.idBlob, this._getPosition(ev.clientX, ev.clientY));
		}
	}, {
		key: "mouseMove",
		value: function mouseMove(ev) {
			// Used for the second spell, triggered via space bar, as the event has no mouse position
			this.mousePos = this._getPosition(ev.clientX, ev.clientY);
		}
	}, {
		key: "render",
		value: function render() {
			var blobs = [];
			for (var i = 0; i < this.state.army.length; i++) {
				blobs.push(React.createElement(BlobView, { blob: this.state.army[i], selected: this.state.idBlob == i, idBlob: i, team: true }));
			}
			for (var _i = 0; _i < this.state.enemy.length; _i++) {
				blobs.push(React.createElement(BlobView, { blob: this.state.enemy[_i], selected: this.state.idBlob == _i, idBlob: _i, team: false }));
			}
			return React.createElement(
				"div",
				{ id: "boardContainer", onContextMenu: this.rightClick, onMouseMove: this.mouseMove },
				React.createElement(
					"div",
					{ className: "boardCards" },
					React.createElement(BoardCard, { title: this.props.cards.getCard(0), description: this.props.cards.getDesc(0), buttonName: "ButtonSpace" }),
					React.createElement(BoardCard, { title: this.props.cards.getCard(1), description: this.props.cards.getDesc(1), buttonName: "ButtonRightClick" }),
					React.createElement(BoardCard, { title: "Move", description: "", buttonName: "ButtonLeftClick", moveCard: true })
				),
				React.createElement(
					"div",
					{ className: "board", onClick: this.mouseClick },
					React.createElement("div", { id: "boardHeightSetter" }),
					blobs
				)
			);
		}
	}]);

	return Board;
}(React.Component);