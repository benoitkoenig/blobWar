import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import MatchMaking from "./Components/MatchMaker/index.jsx";
import HowToPlay from "./Components/HowToPlay/index.jsx";
import EndOfGame from "./Components/EndOfGame/index.jsx";

const Alert = ({ alert, container, displayAlert, clearContainer }) => {
	if (container !== null) { // This is bad. See the notes in Reducers/Navigation.js
		clearContainer();
		return (<Redirect to={container} />);
	}

	const alertElement = alert === "HowToPlay" ? <HowToPlay displayAlert={displayAlert} />
		: alert === "EndOfGame" ? <EndOfGame />
		: alert === "MatchMaking" ? <MatchMaking />
		: null

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
