class EndOfGame extends React.Component {
	// A simple alert with a button to the menu
	constructor(props) {
		super(props);
		this.validate = this.validate.bind(this);
	}

	validate() {
		this.props.displayer.trigger("Alert", null);
		this.props.displayer.trigger("Container", "Menu");
	}

	render() {
		return (
			<div id="darkPart" onClick={(ev) => {if (ev.target.id == "darkPart") this.validate();}}>
				<div id="alertContainer" className="endOfGame">
					<p> {this.props.nodeConnection.endOfGameValue} </p>
					<div className="goBack" onClick={this.validate}> Back to the Menu </div>
				</div>
			</div>
		);
	}
}
