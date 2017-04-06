import React from "react";
import {connect} from "react-redux";
import {createStore} from "redux";

import Header from "./Header.jsx";

import Menu from "./Menu.jsx";
import Board from "./Board.jsx";
import CardsSwitch from "./CardsSwitch.jsx";

import MatchMaking from "./MatchMaking.jsx";
import HowToPlay from "./HowToPlay.jsx";
import EndOfGame from "./EndOfGame.jsx";

const Body = ({container, alert, displayAlert}) => {

	let containerElement;
	let alertElement;

	if (container === "Menu") {containerElement = <Menu />}
	if (container === "CardsSwitch") {containerElement = <CardsSwitch />}
	if (container === "Board") {containerElement = <Board />}

	if (alert === "HowToPlay") {alertElement = <HowToPlay displayAlert={displayAlert} />}
	if (alert === "EndOfGame") {alertElement = <EndOfGame />}
	if (alert === "MatchMaking") {alertElement = <MatchMaking />}

	return (
		<div>
			<Header />
			<div id='container'>{containerElement}</div>
			<div id='alert'>{alertElement}</div>
		</div>
	);
}


const mapStateToProps = (state, ownProps) => {
	return {
		container: state.Navigation.container,
		alert: state.Navigation.alert
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		displayAlert: () => { dispatch({type: "DisplayAlert", name: null}) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
