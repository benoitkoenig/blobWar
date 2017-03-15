class HowToPlay extends React.Component {
	// A simple alert with a back button
	render() {
		return (
			<div id="darkPart" onClick={(ev) => {if (ev.target.id == "darkPart") this.props.displayer.trigger("Alert", null)}}>
				<div id="alertContainer" className="howToPlay">
					<p> Blob War is a two-player game. Each player has <span className='blue'>3 blobs and 2 cards</span>. To win, you must kill all enemy blobs while keeping at least one of yours alive </p>
					<p> When two blobs from different teams <span className='blue'>collide</span>, they kill each other. A <span className='blue'>blob with a hat</span> will survive the collision. If both blobs have a hat, they both die. Hats can be given by some cards </p>
					<p> You can select a blob with <span className='blue'>W</span>, <span className='blue'>E</span>, or <span className='blue'>R</span> keys and move them with <span className='blue'>Left Click</span>. Your cards can be triggered by <span className='blue'>Space Key</span> and <span className='blue'>Right Click</span> </p>
					<p> Now, just pick <span className='blue'>two random cards</span> and try a <span className='blue'>Training Mod</span> to test the game against an idle opponent </p>
					<div className="goBack" onClick={() => {this.props.displayer.trigger("Alert", null)}}> Back to the Menu </div>
				</div>
			</div>
		);
	}
}
