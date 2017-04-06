import React from "react";
import {connect} from "react-redux";
import {createStore} from "redux";

const mapStateToProps = (state, ownProps) => {
	return {
		text: state.GameState.endOfGameValue
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		displayContainer: (name) => { dispatch({type: "DisplayContainer", name: name}); },
		displayAlert: (name) => { dispatch({type: "DisplayAlert", name: name}); }
	}
}

const EndOfGame = ({displayAlert, displayContainer, text}) => {

	const validate = () => {
		displayContainer("Menu");
		displayAlert(null);
	}

	return (
		<div id="darkPart" onClick={(ev) => {if (ev.target.id == "darkPart") validate()}}>
			<div id="alertContainer" className="endOfGame">
				<p> {text} </p>
				<div className="goBack" onClick={validate}> Back to the Menu </div>
			</div>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(EndOfGame);
