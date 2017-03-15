// displayer is used by react classes to trigger the displaying of other react classes
const displayer = new Event();
// Cards stores the possible values for cards and the two selected cards
const cards = new Cards();
// nodeConnection is simply a layer over socket.io, to not handle the socket directly from the React classes
const nodeConnection = new NodeConnection(cards, displayer);

// For the whole displayer thing : I think I should render every item once, and then hide them using css
// I'll check what's a good practice

displayer.on("Container", (name) => {
	if (name == "Menu") {
		ReactDOM.render(
			<Menu nodeConnection={nodeConnection} cards={cards} displayer={displayer} />,
			document.getElementById("container")
		);
	} else if (name == "Board") {
		ReactDOM.render(
			<BoardView nodeConnection={nodeConnection} cards={cards} displayer={displayer} />,
			document.getElementById('container')
		);
	} else if (name == "CardsSwitch") {
		ReactDOM.render(
			<CardsSwitch cards={cards} displayer={displayer} />,
			document.getElementById("container")
		);
	}
});

displayer.on("Alert", (name) => {
	if (name == null) {
		ReactDOM.render(
			<div></div>,
			document.getElementById("alert")
		);
	} else if (name == "MatchMaker") {
		ReactDOM.render(
			<MatchMaker nodeConnection={nodeConnection} displayer={displayer} />,
			document.getElementById("alert")
		);
	} else if (name == "CountDownToMatchMade") {
		ReactDOM.render(
			<CountDownToMatchMade nodeConnection={nodeConnection} displayer={displayer} />,
			document.getElementById("alert")
		);
	} else if (name == "NoCardsNoMatchMaking") {
		ReactDOM.render(
			<NoCardsNoMatchMaking displayer={displayer} />,
			document.getElementById("alert")
		);
	} else if (name == "HowToPlay") {
		ReactDOM.render(
			<HowToPlay displayer={displayer} />,
			document.getElementById("alert")
		);
	} else if (name == "EndOfGame") {
		ReactDOM.render(
			<EndOfGame displayer={displayer} nodeConnection={nodeConnection} />,
			document.getElementById("alert")
		);
	}
});

// Render the header and the menu

ReactDOM.render(
	<Header nodeConnection={nodeConnection} />,
	document.getElementById("header")
);

displayer.trigger("Container", "Menu");
