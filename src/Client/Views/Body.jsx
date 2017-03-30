import React from "react";

import Header from "./Header.jsx";

import Menu from "./Menu.jsx";
import Board from "./Board.jsx";
import CardsSwitch from "./CardsSwitch.jsx";

import {MatchMaker, CountDownToMatchMade, NoCardsNoMatchMaking} from "./MatchMaker.jsx";
import HowToPlay from "./HowToPlay.jsx";
import EndOfGame from "./EndOfGame.jsx";

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {"Container": "Menu", "Alert": null}
	}

	componentWillMount() {
		this.props.displayer.on("Container", (name) => {
			this.setState({"Container": name});
		});
		this.props.displayer.on("Alert", (name) => {
			this.setState({"Alert": name});
		});
	}

	render() {
		let container = null;
		let alert = null;

		if (this.state.Container == "Menu") container = (<Menu displayer={this.props.displayer} nodeConnection={this.props.nodeConnection} cards={this.props.cards} />);
		if (this.state.Container == "Board") container = (<Board displayer={this.props.displayer} nodeConnection={this.props.nodeConnection} cards={this.props.cards} />);
		if (this.state.Container == "CardsSwitch") container = (<CardsSwitch displayer={this.props.displayer} cards={this.props.cards} />);

		if (this.state.Alert == "MatchMaker") alert = (<MatchMaker displayer={this.props.displayer} nodeConnection={this.props.nodeConnection} />);
		if (this.state.Alert == "CountDownToMatchMade") alert = (<CountDownToMatchMade displayer={this.props.displayer} nodeConnection={this.props.nodeConnection} />);
		if (this.state.Alert == "NoCardsNoMatchMaking") alert = (<NoCardsNoMatchMaking displayer={this.props.displayer} />);
		if (this.state.Alert == "HowToPlay") alert = (<HowToPlay displayer={this.props.displayer} />);
		if (this.state.Alert == "EndOfGame") alert = (<EndOfGame displayer={this.props.displayer} nodeConnection={this.props.nodeConnection} />);

		return (
			<div>
				<Header />
				<div id="container">{container}</div>
				<div id="alert">{alert}</div>
			</div>
		);
	}
}
