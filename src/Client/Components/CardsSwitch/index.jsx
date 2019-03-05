import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./styles.scss";

import { buttons } from "../../Assets";

const Card = ({ cardIndex, title, description, firstSpell, secondSpell, setCard }) => (
	<div className="card">
		<div className="title">{title}</div>
		<div className="description">{description}</div>
		<div className='button'>
			<div><img src={buttons[firstSpell ? "blue" : "normal"].space} onClick={() => { setCard(0, cardIndex); }} /></div>
			<div><img src={buttons[secondSpell ? "blue" : "normal"].right} onClick={() => { setCard(1, cardIndex); }} /></div>
		</div>
	</div>
);

const mapStateToProps = (state, ownProps) => (
	{
		cards: state.Cards.cards,
		data: state.Cards.data
	}
)

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		setCard: (index, value) => { dispatch({type: "SetCard", index: index, value: value}); },
		goBack: () => { dispatch({type: "DisplayContainer", name: "Menu"}) }
	}
)

const CardsSwitch = ({ cards, data, setCard, goBack }) => {
	const cardsElement = []; // The list of cards which is displayed
	for (var i=0 ; i<data.length ; i++) {
		cardsElement.push(<Card key={i.toString()} cardIndex={i} title={data[i].title} description={data[i].description} setCard={setCard} firstSpell={cards[0] == i} secondSpell={cards[1] == i} />);
	}
	return (
		<div id='cardsSwitch'>
			<div id='cardsContainer'> {cardsElement} </div>
			<Link id='confirmButton' to="/"> Confirm </Link>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsSwitch);
