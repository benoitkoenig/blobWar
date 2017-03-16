class Body extends React.Component {
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

		if (this.state.Container == "Menu") container = (<Menu displayer={displayer} nodeConnection={nodeConnection} cards={cards} />);
		if (this.state.Container == "Board") container = (<Board displayer={displayer} nodeConnection={nodeConnection} cards={cards} />);
		if (this.state.Container == "CardsSwitch") container = (<CardsSwitch displayer={displayer} cards={cards} />);

		if (this.state.Alert == "MatchMaker") alert = (<MatchMaker displayer={displayer} nodeConnection={nodeConnection} />);
		if (this.state.Alert == "CountDownToMatchMade") alert = (<CountDownToMatchMade displayer={displayer} nodeConnection={nodeConnection} />);
		if (this.state.Alert == "NoCardsNoMatchMaking") alert = (<NoCardsNoMatchMaking displayer={displayer} />);
		if (this.state.Alert == "HowToPlay") alert = (<HowToPlay displayer={displayer} />);
		if (this.state.Alert == "EndOfGame") alert = (<EndOfGame displayer={displayer} nodeConnection={nodeConnection} />);

		return (
			<div>
				<Header />
				<div id="container">{container}</div>
				<div id="alert">{alert}</div>
			</div>
		);
	}
}
