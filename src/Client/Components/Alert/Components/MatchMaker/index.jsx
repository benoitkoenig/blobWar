import React from "react";
import { connect } from "react-redux";

import "./styles.scss";

const mapStateToProps = (state, ownProps) => ({
	countdown: state.GameState.countdown,
	needCards: state.Cards.cards[0] === null || state.Cards.cards[1] === null,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	displayAlert: (name) => { dispatch({type: "DisplayAlert", name: name}); },
	cancelMatchMaking: () => { dispatch({type: "server/cancelMatchMaking"}); },
});

const MatchMaking = ({ displayAlert, countdown, needCards, cancelMatchMaking }) => {
	const cancel = () => {
		displayAlert(null);
	}

	const hardCancel = () => {
		cancelMatchMaking();
		cancel();
	}

	if (needCards) {
		return (
			<div id="darkPart" onClick={cancel}>
				<div id="alertContainer" className="matchMaker">
					<div id="matchMakerLookForOpponent"> You need to pick 2 cards to play with </div>
					<div id="matchMakerCancel" onClick={cancel}> Got it </div>
				</div>
			</div>
		);
	} else if (countdown > 0) {
		return (
			<div id="darkPart">
				<div id="alertContainer" className="matchMaker">
					<div id="matchMakerCountDown"> The game will start in </div>
					<div id="matchMakerCountDownValue"> {countdown} </div>
				</div>
			</div>
		);
	} else {
		return (
			<div id="darkPart" onClick={hardCancel}>
				<div id="alertContainer" className="matchMaker">
					<div id="matchMakerLookForOpponent"> Waiting for an opponent<span className='threePointsAnimation'><span>.</span><span>.</span><span>.</span></span></div>
					<div id="matchMakerCancel" onClick={hardCancel}> Cancel </div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchMaking);
