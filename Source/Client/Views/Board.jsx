class BoardCard extends React.Component {
	// It is mostly the same as CardsMenu -> I could merge the classes
	render() {
		return (
			<div className={`boardCard${this.props.moveCard ? " moveCard" : ""}`}>
				<div className="title">{this.props.title}</div>
				<div className="description">{this.props.description}</div>
				<img src={`Assets/${this.props.buttonName}.png`} />
			</div>
		);
	}
}

class BlobView extends React.Component {
	// Render the blob and any attribute attached (hat, pointer, etc..)
	constructor(props) {
		super(props);
		this.state = {hatId: parseInt(Math.random()*6)};
	}

	render() {
		const data = this.props.blob;
		if (!data.alive) return <div></div>;
		const style = {
			left: (data.x-0.05)*100 + "%",
			top: (data.y-0.075)*100 + "%", // We align the position to the base of the blob, which is slighlty below the png's center
			opacity: data.status == "ghost" ? 0.3 : 1
		}
		const name = this.props.team ? "Blob" : "Enemy";
		const hatStyle = { visibility: data.status == "fury" ? "visible" : "hidden" }
		const keyBlob = this.props.selected ? "Active" : this.props.idBlob == 0 ? "W" : this.props.idBlob == 1 ? "E" : "R";
		const pointerStyle = {visibility: (this.props.team ? "visible" : "hidden")}
		return (
			<div className="blob" style={style}>
				<img src={`Assets/${name}${data.orientation}.png`} />
				<img src={`Assets/Hat${this.state.hatId}.png`} style={hatStyle} />
				<img src={`Assets/Pointer${keyBlob}.png`} style={pointerStyle} />
			</div>
		);
	}
}

class Board extends React.Component {

	constructor(props) {
		super(props);
		this.mouseClick = this.mouseClick.bind(this);
		this.rightClick = this.rightClick.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.keyPressed = this.keyPressed.bind(this);
		this.mousePos = {x: 0, y: 0};
		this.state = {idBlob: 0, army: [], enemy: []}
	}

	keyPressed(ev) {
		if (ev.code == "Space") { // Triggers the first spell
			this.props.nodeConnection.triggerCard(0, this.state.idBlob, this.mousePos);
		}
		var id = ev.code == "KeyW" ? 0 : ev.code == "KeyE" ? 1 : ev.code == "KeyR" ? 2 : null;
		if (id != null) this.setState({idBlob: id});
	}

	componentWillMount() {
		// Listen to keyboard events for the blob's selection and the space key card
		document.addEventListener("keypress", this.keyPressed);
		this.props.nodeConnection.on("update", (data) => {
			this.setState({
				army: data.army,
				enemy: data.enemy
			});
		});
	}

	componentWillUnmount() {
		// Stops listening to the events, otherwise it doesn't stop and causes issues
		document.removeEventListener("keypress", this.keyPressed);
	}

	_getPosition(mouseX, mouseY) {
		const board = document.getElementsByClassName("board")[0];
		const offsets = board.getBoundingClientRect();
		return {
			x: 1. * (mouseX - offsets.left) / board.offsetWidth,
			y: 1. * (mouseY - offsets.top) / board.offsetHeight
		}
	}

	mouseClick(ev) {
		// Moves the blob to the targeted destination
		ev.preventDefault();
		this.props.nodeConnection.blobDestination(this.state.idBlob, this._getPosition(ev.clientX, ev.clientY));
	}

	rightClick(ev) {
		// Triggers the second spell
		ev.preventDefault();
		this.props.nodeConnection.triggerCard(1, this.state.idBlob, this._getPosition(ev.clientX, ev.clientY));
	}

	mouseMove(ev) {
		// Used for the second spell, triggered via space bar, as the event has no mouse position
		this.mousePos = this._getPosition(ev.clientX, ev.clientY)
	}

	render() {
		const blobs = [];
		for (let i=0 ; i<this.state.army.length ; i++) {
			blobs.push(<BlobView blob={this.state.army[i]} selected={this.state.idBlob==i} idBlob={i} team={true} />);
		}
		for (let i=0 ; i<this.state.enemy.length ; i++) {
			blobs.push(<BlobView blob={this.state.enemy[i]} selected={this.state.idBlob==i} idBlob={i} team={false} />);
		}
		return (
			<div id="boardContainer" onContextMenu={this.rightClick} onMouseMove={this.mouseMove}>
				<div className="boardCards">
					<BoardCard title={this.props.cards.getCard(0)} description={this.props.cards.getDesc(0)} buttonName='ButtonSpace' />
					<BoardCard title={this.props.cards.getCard(1)} description={this.props.cards.getDesc(1)} buttonName='ButtonRightClick' />
					<BoardCard title="Move" description="" buttonName='ButtonLeftClick' moveCard={true} />
				</div>
				<div className="board" onClick={this.mouseClick}>
					<div id="boardHeightSetter"></div>
					{blobs}
				</div>
			</div>
		);
	}
}
