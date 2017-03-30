import Ev from "./Models/Ev.js";
import Cards from "./Models/Cards.js";
import NodeConnection from "./Models/NodeConnection.js";

import React from "react";
import ReactDOM from "react-dom";

import Body from "./Views/Body.jsx";

// I think the displayer can - and should - be traded for a function in Body
const displayer = new Ev();
const cards = new Cards();
const nodeConnection = new NodeConnection(cards, displayer);

ReactDOM.render(
	<Body displayer={displayer} nodeConnection={nodeConnection} cards={cards} />,
	document.getElementById("body")
)
