class Card extends React.Component {
	// Cards displayed in the colorSwitch, with buttons to select them either on space bar or on right click
	constructor(props) {
		super(props);
		this.assignFirstSpell = this.assignFirstSpell.bind(this);
		this.assignSecondSpell = this.assignSecondSpell.bind(this);
	}

	assignFirstSpell() { this.props.assignSpell(0, this.props.title); }

	assignSecondSpell() { this.props.assignSpell(1, this.props.title); }

	render() {
		return (
			<div className="card">
				<div className="title">{this.props.title}</div>
				<div className="description">{this.props.description}</div>
				<div className='button'>
					<div><img src={`Assets/ButtonSpace${this.props.firstSpell ? "Blue" : ""}.png`} onClick={this.assignFirstSpell} /></div>
					<div><img src={`Assets/ButtonRightClick${this.props.secondSpell ? "Blue" : ""}.png`} onClick={this.assignSecondSpell} /></div>
				</div>
			</div>
		);
	}

}

class CardsSwitch extends React.Component {

	constructor(props) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.assignSpell = this.assignSpell.bind(this);
		this.state = {
			firstSpell: this.props.cards.getCard(0),
			secondSpell: this.props.cards.getCard(1)
		}
	}

	// The changes are saved on real time, so validation only consists in displaying the menu
	goBack() { this.props.displayer.trigger("Container", "Menu"); }

	// Function called in the Card class, defined here to update the state thus re-rendering if necessary
	assignSpell(spellId, cardName) {
		this.props.cards.setCard(spellId, cardName);
		if (spellId == 0) this.setState({firstSpell: cardName});
		if (spellId == 1) this.setState({secondSpell: cardName});
	}

	render() {
		const cards = []; // The list of cards which is displayed
		for (var i=0 ; i<this.props.cards.data.length ; i++) {
			const title = this.props.cards.data[i].title;
			const description = this.props.cards.data[i].description;
			cards.push(<Card title={title} description={description} assignSpell={this.assignSpell} firstSpell={this.state.firstSpell == title} secondSpell={this.state.secondSpell == title} />);
		}
		return (
			<div className='cardsSwitch'>
				<div id='cardsContainer'> {cards} </div>
				<div id='confirmButton' onClick={this.goBack}> Confirm </div>
			</div>
		);
	}
}
