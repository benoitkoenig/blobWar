class Cards extends Event {

	constructor() {
		super();
		this._cards = [sessionStorage.getItem("card0"), sessionStorage.getItem("card1")];
		this.data = [ // Data is written twice, server-side and front-side. Merge those two in a json when I have time
			{title: "Dash", description: "The blob jumps forward on a short distance with a hat on. This spell can only be re-used if it kills an opponent"},
			{title: "Bloc", description: "The blob stops and gets a hat. He has it removed upon moving"},
			{title: "Ghost", description: "The blob turns into a ghost, meaning he can go through enemies. The spell is canceled when triggered again"},
			{title: "Kamikaze", description: "The blob runs in a straight line with a hat. He dies upon hitting a wall"},
			{title: "Gravity", description: "The blob attracts enemy blobs in vicinity. The spell will only stop at the death of the blob"},
			{title: "Revive", description: "Two seconds after casting this spell, if the blob has died, he is revived with a five-second hat. Can only be used once a game"},
			{title: "Switch", description: "The three blobs dash to each other's place with a hat, forming a death triangle. Can only be used once a game"},
			{title: "Orbit", description: "The blobs orbit around the selected blob clockwise, stopping upon hitting a wall, casting a spell, or moving"}
		];
	}

	// card is a private variable and using setCard is necessary to handle the sessionStorage
	setCard(idCard, idSpell) {
		this._cards[idCard] = idSpell;
		sessionStorage.setItem(`card${idCard}`, idSpell);
	}

	getCard(idCard) {
		return this._cards[idCard];
	}

	// get description from the first or second card. Could have accepted the title as a parameter but getDesc is more convinient from the views
	getDesc(index) {
		if (index == null) return null;
		const key = this._cards[index];
		for (var i=0 ; i<this.data.length ; i++) {
			if (key == this.data[i].title) return this.data[i].description;
		}
	}

	// Called from the menu, when the user chooses to pick at random
	random() {
		this.setCard(0, this.data[parseInt(Math.random()*this.data.length)].title);
		this.setCard(1, this.data[parseInt(Math.random()*this.data.length)].title);
	}

}
