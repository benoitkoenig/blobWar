class NoCardsNoMatchMaking extends React.Component {
	constructor(props) {
		super(props);
		this.gotIt = this.gotIt.bind(this);
		this.clickOnDark = this.clickOnDark.bind(this);
	}

	gotIt() {
		this.props.displayer.trigger("Alert", null);
	}

	clickOnDark(ev) {
		if (ev.target.id == "darkPart") this.gotIt();
	}

	render() {
		return (
			<div id="darkPart" onClick={this.clickOnDark}>
				<div id="alertContainer" className="matchMaker">
					<div id="matchMakerLookForOpponent"> You need to pick 2 cards to play with </div>
					<div id="matchMakerCancel" onClick={this.gotIt}> Got it </div>
				</div>
			</div>
		);
	}
}

class CountDownToMatchMade extends React.Component {
	constructor(props) {
		super(props);
		props.nodeConnection.on("countDownToGame", (timeLeft) => {
			if (timeLeft == 0) {
				this.props.displayer.trigger("Alert", null);
				this.props.displayer.trigger("Container", "Board");
			} else {
				this.setState({countDown: timeLeft});
			}
		});
		this.state = {countDown: 3};
	}

	render() {
		return (
			<div id="darkPart">
				<div id="alertContainer" className="matchMaker">
					<div id="matchMakerCountDown"> The game will start in </div>
					<div id="matchMakerCountDownValue"> {this.state.countDown} </div>
				</div>
			</div>
		);
	}
}

class MatchMaker extends React.Component {
	constructor(props) {
		super(props);
		this.cancelMatchMaking = this.cancelMatchMaking.bind(this);
		props.nodeConnection.on("countDownToGame", (timeLeft) => {
			this.props.displayer.trigger("Alert", "CountDownToMatchMade")
		});
	}

	cancelMatchMaking() {
		this.props.nodeConnection.cancelMatchMaking();
		this.props.displayer.trigger("Alert", null);
	}

	render() {
		return (
			<div id="darkPart">
				<div id="alertContainer" className="matchMaker">
					<div id="matchMakerLookForOpponent"> Waiting for an opponent<span className='threePointsAnimation'><span>.</span><span>.</span><span>.</span></span></div>
					<div id="matchMakerCancel" onClick={this.cancelMatchMaking}> Cancel </div>
				</div>
			</div>
		);
	}
}
