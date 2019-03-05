import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./styles.scss";

import { buttons, dices, cards as cardsSrc } from "../../Assets";

// A card. Quite similar to cards in CardsSwitch
const CardMenu = ({ title, description, isSpace }) => (
	<div className="cardMenu">
		<div className="title">{title}</div>
		<div className="description">{description}</div>
		<img src={buttons.normal[isSpace ? "space" : "right"]} />
	</div>
);

const CardsMenu = ({ cards, randomCards, chooseCards, displayAlert }) => {
	// The left side of the menu. Two states exists : both card are defined, or not
	const noCard = (cards[0] === null || cards[1] === null);
	return (
		<div id="cardsMenu" className={noCard ? "noCard" : ""}>
			<div id="yourCards"> Your Cards </div>
			<div className="blank"></div>
			<div id="cardsRandom" onClick={randomCards}><img src={dices} /><span> Get random cards </span></div>
			<div id="cardsChoose"><Link to='/Cards'><img src={cardsSrc} /><span> Choose your cards </span></Link></div>
			<div id="cardsTutorial"> Dont know what to do ? See <span id='cardsTutorialButton' onClick={() => {displayAlert("HowToPlay")}}>How to play</span> </div>
			<CardMenu title={noCard ? "" : cards[0].title} description={noCard ? "" : cards[0].description} isSpace={true} />
			<CardMenu title={noCard ? "" : cards[1].title} description={noCard ? "" : cards[1].description} isSpace={false} />
		</div>
	);
}

const mapStateToProps = (state, ownProps) => (
	{
		cards: [
			state.Cards.cards[0] === null ? null : state.Cards.data[state.Cards.cards[0]],
			state.Cards.cards[1] === null ? null : state.Cards.data[state.Cards.cards[1]]
		]
	}
)

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		randomCards: () => { dispatch({type: "RandomCards"}); },
		displayAlert: (name) => { dispatch({type: "DisplayAlert", name: name}); },
		startGame: (category, cards) => {
			if (cards[0] === null || cards[1] === null) {
				dispatch({type: "DisplayAlert", name: "MatchMaking"});
			} else {
				dispatch({type: "server/StartGame", category: category, cards: [cards[0].title, cards[1].title]})
			}
		}
	}
)

// The left side of the menu is a different React class bc it is quite complex, while the right side consists only of three buttons
const Menu = ({ cards, randomCards, displayAlert, startGame, startMatchMaking }) => (
	<div id="menu">
		<CardsMenu className="cardsMenuContainer" randomCards={randomCards} cards={cards} displayAlert={displayAlert} />
		<div id="start">
			<div className="blank"></div>
			<div id="startTutorial" onClick={() => {displayAlert("HowToPlay")}}> How to play </div>
			<div id="startMatchMaking" onClick={() => {startGame("MatchMaking", cards)}}> Match Making </div>
			<div id="startBotGame" onClick={() => {startGame("Bot", cards)}}> Play against a bot </div>
			<div id="startTrainingGame" onClick={() => {startGame("Idle", cards)}}> Training Mod </div>
		</div>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
