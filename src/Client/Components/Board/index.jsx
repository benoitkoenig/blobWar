import React from "react";
import { connect } from "react-redux";

import "./styles.scss";

import { buttons, blobs, enemies, pointers, hats } from "../../Assets";

// It is mostly the same as CardsMenu
const Card = ({ title, description, buttonName, moveCard }) => (
	<div className={`boardCard${moveCard ? " moveCard" : ""}`}>
		<div className="title">{title}</div>
		<div className="description">{description}</div>
		<img src={buttons.normal[buttonName]} />
	</div>
);

class Blob extends React.Component {
	// Render the blob and any attribute attached (hat, pointer, etc..)

	constructor(props) {
		super(props);
		this.hatId = parseInt(Math.random()*6);
	}

	render() {
		if (!this.props.blob.alive) return <div></div>;
		const style = {
			left: (this.props.blob.x-0.05)*100 + "%",
			top: (this.props.blob.y-0.075)*100 + "%", // We align the position to the base of the blob, which is slighlty below the png's center
			opacity: this.props.blob.status == "ghost" ? 0.3 : 1
		}
		const blobSrc = this.props.team ? blobs[this.props.blob.orientation] : enemies[this.props.blob.orientation];
		const hatStyle = { visibility: this.props.blob.status == "fury" ? "visible" : "hidden" };
		const keyBlob = this.props.selected ? "active" : this.props.idBlob == 0 ? "w" : this.props.idBlob == 1 ? "e" : "r";
		const pointerStyle = {visibility: (this.props.team ? "visible" : "hidden")};
		return (
			<div className="blob" style={style}>
				<img src={blobSrc} />
				<img src={hats[this.hatId]} style={hatStyle} />
				<img src={pointers[keyBlob]} style={pointerStyle} />
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => (
	{
		cards: [
			state.Cards.cards[0] === null ? null : state.Cards.data[state.Cards.cards[0]],
			state.Cards.cards[1] === null ? null : state.Cards.data[state.Cards.cards[1]]
		],
		army: state.GameState.army,
		enemy: state.GameState.enemy,
		idBlob: state.GameState.idBlob
	}
)

const mapDispatchToProps = (dispatch, ownProps) => (
	{
		displayContainer: (name) => { dispatch({type: "DisplayContainer", name: name}); },
		displayAlert: (name) => { dispatch({type: "DisplayAlert", name: name}); },
		setDestination: (idBlob, destination) => { dispatch({type: "server/setDestination", idBlob: idBlob, destination: destination}); },
		triggerCard: (idBlob, idCard, destination) => { dispatch({type: "server/triggerCard", idBlob: idBlob, idCard: idCard, destination: destination}); },
	}
)

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.mousePos = {x: 0, y: 0}
		this.keyPressed = this.keyPressed.bind(this);
		this.state = {idBlob: 0};
	}

	getPosition(mouseX, mouseY) {
		const board = document.getElementsByClassName("board")[0];
		const offsets = board.getBoundingClientRect();
		return {
			x: 1. * (mouseX - offsets.left) / board.offsetWidth,
			y: 1. * (mouseY - offsets.top) / board.offsetHeight
		}
	}

	keyPressed(ev) {
		if (ev.code == "Space") { // Triggers the first spell
			this.props.triggerCard(this.state.idBlob, 0, this.mousePos);
		}
		var id = ev.code == "KeyW" ? 0 : ev.code == "KeyE" ? 1 : ev.code == "KeyR" ? 2 : null;
		if (id != null) this.setState({idBlob: id});
	}

	componentWillMount() {
		// Listen to keyboard events for the blob's selection and the space key card
		document.addEventListener("keypress", this.keyPressed);
	}

	componentWillUnmount() {
		// Stops listening to the events, otherwise it doesn't stop and causes issues
		document.removeEventListener("keypress", this.keyPressed);
	}

	render() {
		const blobs = [];
		for (let i=0 ; i<this.props.army.length ; i++) {
			blobs.push(<Blob key={i.toString()} blob={this.props.army[i]} selected={this.state.idBlob==i} idBlob={i} team={true} />);
		}
		for (let i=0 ; i<this.props.enemy.length ; i++) {
			blobs.push(<Blob key={(i+this.props.army.length).toString()} blob={this.props.enemy[i]} selected={false} idBlob={i} team={false} />);
		}
		return (
			<div id="boardContainer" onContextMenu={(ev) => {ev.preventDefault() ; this.props.triggerCard(this.state.idBlob, 1, this.getPosition(ev.clientX, ev.clientY))}} onMouseMove={(ev) => {this.mousePos = this.getPosition(ev.clientX, ev.clientY)}}>
				<div className="boardCards">
					<Card title={this.props.cards[0].title} description={this.props.cards[0].description} buttonName='space' moveCard={false} />
					<Card title={this.props.cards[1].title} description={this.props.cards[1].description} buttonName='right' moveCard={false} />
					<Card title="Move" description="" buttonName='left' moveCard={true} />
				</div>
				<div className="board" onClick={(ev) => {this.props.setDestination(this.state.idBlob, this.getPosition(ev.clientX, ev.clientY))}}>
					<div id="boardHeightSetter"></div>
					{blobs}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
