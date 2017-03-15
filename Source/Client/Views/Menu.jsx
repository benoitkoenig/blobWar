class CardMenu extends React.Component {
	// A card. Quite similar to cards in CardsSwitch
	render() {
		return (
			<div className="cardMenu">
				<div className="title">{this.props.title}</div>
				<div className="description">{this.props.description}</div>
				<img src={`Assets/${this.props.isSpace ? "ButtonSpace" : "ButtonRightClick"}.png`} />
			</div>
		);
	}
}

class CardsMenu extends React.Component {
	// The left side of the menu. Two states exists : both card are defined, or not
	render() {
		const noCard = (this.props.cards.card0 == null || this.props.cards.card1 == null);
		return (
			<div id="cardsMenu" className={noCard ? "noCard" : ""}>
				<div id="yourCards"> Your Cards </div>
				<div className="blank"></div>
				<div id="cardsRandom" onClick={this.props.randomCards}><img src="Assets/Dices.png" /><span> Get random cards </span></div>
				<div id="cardsChoose" onClick={() => {this.props.displayer.trigger("Container", "CardsSwitch")}}><img src="Assets/Cards.png" /><span> Choose your cards </span></div>
				<div id="cardsTutorial"> Dont know what to do ? See <span id='cardsTutorialButton'>How to play</span> </div>
				<CardMenu title={noCard ? "" : this.props.cards.card0} description={noCard ? "" : this.props.cards.desc0} isSpace={true} />
				<CardMenu title={noCard ? "" : this.props.cards.card1} description={noCard ? "" : this.props.cards.desc1} isSpace={false} />
			</div>
		);
	}
}

class Menu extends React.Component {
	// Main menu
	constructor(props) {
		super(props);
		this.startGame = this.startGame.bind(this);
		this.startBotGame = this.startBotGame.bind(this);
		this.randomCards = this.randomCards.bind(this);
		this.state = {
			cardsValue: {
				card0: this.props.cards.getCard(0),
				card1: this.props.cards.getCard(1),
				desc0: this.props.cards.getDesc(0),
				desc1: this.props.cards.getDesc(1)
			}
		}
	}

	// Start the match making
	startGame() {
		if (this.state.cardsValue.card0 == null || this.state.cardsValue.card1 == null) {
			this.props.displayer.trigger("Alert", "NoCardsNoMatchMaking");
		} else {
			this.props.nodeConnection.init();
			this.props.displayer.trigger("Alert", "MatchMaker");
		}
	}

	// Start the game against an idle opponent
	startBotGame() {
		if (this.state.cardsValue.card0 == null || this.state.cardsValue.card1 == null) {
			this.props.displayer.trigger("Alert", "NoCardsNoMatchMaking");
		} else {
			this.props.nodeConnection.initBotGame();
			this.props.displayer.trigger("Container", "Board");
		}
	}

	// Calls cards to set two random cards and get the result in state for render
	randomCards() {
		this.props.cards.random();
		this.setState({
			cardsValue: {
				card0: this.props.cards.getCard(0),
				card1: this.props.cards.getCard(1),
				desc0: this.props.cards.getDesc(0),
				desc1: this.props.cards.getDesc(1)
			}
		});
	}

	render() {
		// The left side of the menu is a different React class bc it is quite complex, while the right side consists only of three buttons
		return (
			<div className="menu">
				<CardsMenu className="cardsMenuContainer" displayer={this.props.displayer} randomCards={this.randomCards} cards={this.state.cardsValue} />
				<div id="start">
					<div className="blank"></div>
					<div id="startTutorial" onClick={() => {this.props.displayer.trigger("Alert", "HowToPlay")}}> How to play </div>
					<div id="startMatchMaking" onClick={this.startGame}> Match Making </div>
					<div id="startBotGame" onClick={this.startBotGame}> Training Mod </div>
				</div>
			</div>
		);
	}
}
