import React from "react";
import {connect} from "react-redux";
import {createStore} from "redux";

const Card = ({cardIndex, title, description, firstSpell, secondSpell, setCard}) => {
	return (
		<div className="card">
			<div className="title">{title}</div>
			<div className="description">{description}</div>
			<div className='button'>
				<div><img src={`Assets/ButtonSpace${firstSpell ? "Blue" : ""}.png`} onClick={() => { setCard(0, cardIndex); }} /></div>
				<div><img src={`Assets/ButtonRightClick${secondSpell ? "Blue" : ""}.png`} onClick={() => { setCard(1, cardIndex); }} /></div>
			</div>
		</div>
	);
}

const mapStateToProps = (state, ownProps) => {
	return {
		cards: state.Cards.cards,
		data: state.Cards.data
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setCard: (index, value) => { dispatch({type: "SetCard", index: index, value: value}); },
		goBack: () => { dispatch({type: "DisplayContainer", name: "Menu"}) }
	}
}

const CardsSwitch = ({cards, data, setCard, goBack}) => {
	const cardsElement = []; // The list of cards which is displayed
	for (var i=0 ; i<data.length ; i++) {
		cardsElement.push(<Card key={i.toString()} cardIndex={i} title={data[i].title} description={data[i].description} setCard={setCard} firstSpell={cards[0] == i} secondSpell={cards[1] == i} />);
	}
	return (
		<div className='cardsSwitch'>
			<div id='cardsContainer'> {cardsElement} </div>
			<div id='confirmButton' onClick={goBack}> Confirm </div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsSwitch);
