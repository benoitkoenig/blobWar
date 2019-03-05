import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import MatchMaking from "./MatchMaker/index.jsx";
import HowToPlay from "./HowToPlay/index.jsx";
import EndOfGame from "./EndOfGame/index.jsx";

const Alert = ({ alert, container, displayAlert, clearContainer }) => {
	if (container !== null) { // This is bad. See the notes in Reducers/Navigation.js
		clearContainer();
		return (<Redirect to={container} />);
	}

	let alertElement;

	if (alert === "HowToPlay") {alertElement = <HowToPlay displayAlert={displayAlert} />}
	if (alert === "EndOfGame") {alertElement = <EndOfGame />}
	if (alert === "MatchMaking") {alertElement = <MatchMaking />}

	return (
		<div id='alert'>{alertElement}</div>
	);
}

const mapStateToProps = (state, ownProps) => (
	{
		alert: state.Navigation.alert,
		container: state.Navigation.container
	}
)

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		displayAlert: () => { dispatch({type: "DisplayAlert", name: null}) },
		clearContainer: () => { dispatch({type: "DisplayContainer", name: null}) }
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
