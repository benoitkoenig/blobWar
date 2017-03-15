"use strict";

// displayer is used by react classes to trigger the displaying of other react classes
var displayer = new Event();
// Cards stores the possible values for cards and the two selected cards
var cards = new Cards();
// nodeConnection is simply a layer over socket.io, to not handle the socket directly from the React classes
var nodeConnection = new NodeConnection(cards, displayer);

displayer.on("Container", function (name) {
	if (name == "Menu") {
		ReactDOM.render(React.createElement(Menu, { nodeConnection: nodeConnection, cards: cards, displayer: displayer }), document.getElementById("container"));
	} else if (name == "Board") {
		ReactDOM.render(React.createElement(BoardView, { nodeConnection: nodeConnection, cards: cards, displayer: displayer }), document.getElementById('container'));
	} else if (name == "CardsSwitch") {
		ReactDOM.render(React.createElement(CardsSwitch, { cards: cards, displayer: displayer }), document.getElementById("container"));
	}
});

displayer.on("Alert", function (name) {
	if (name == null) {
		ReactDOM.render(React.createElement("div", null), document.getElementById("alert"));
	} else if (name == "MatchMaker") {
		ReactDOM.render(React.createElement(MatchMaker, { nodeConnection: nodeConnection, displayer: displayer }), document.getElementById("alert"));
	} else if (name == "CountDownToMatchMade") {
		ReactDOM.render(React.createElement(CountDownToMatchMade, { nodeConnection: nodeConnection, displayer: displayer }), document.getElementById("alert"));
	} else if (name == "NoCardsNoMatchMaking") {
		ReactDOM.render(React.createElement(NoCardsNoMatchMaking, { displayer: displayer }), document.getElementById("alert"));
	} else if (name == "HowToPlay") {
		ReactDOM.render(React.createElement(HowToPlay, { displayer: displayer }), document.getElementById("alert"));
	} else if (name == "EndOfGame") {
		ReactDOM.render(React.createElement(EndOfGame, { displayer: displayer, nodeConnection: nodeConnection }), document.getElementById("alert"));
	}
});

// Render the header and the menu

ReactDOM.render(React.createElement(Header, { nodeConnection: nodeConnection }), document.getElementById("header"));

displayer.trigger("Container", "Menu");