"use strict";

// I think the displayer can - and should - be traded for a function in Body
var displayer = new Event();
var cards = new Cards();
var nodeConnection = new NodeConnection(cards, displayer);

ReactDOM.render(React.createElement(Body, { displayer: displayer, nodeConnection: nodeConnection, cards: cards }), document.getElementById("body"));