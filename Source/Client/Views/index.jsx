// I think the displayer can - and should - be traded for a function in Body
const displayer = new Event();
const cards = new Cards();
const nodeConnection = new NodeConnection(cards, displayer);

ReactDOM.render(
	<Body displayer={displayer} nodeConnection={nodeConnection} cards={cards} />,
	document.getElementById("body")
)
