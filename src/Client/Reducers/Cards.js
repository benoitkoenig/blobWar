const initialState = {
	cards: [sessionStorage.getItem("card0"), sessionStorage.getItem("card1")],
	data: [ // Data is written twice, server-side and front-side. Merge those two in a json when I have time
		{title: "Dash", description: "The blob jumps forward on a short distance with a hat on. This spell can only be re-used if it kills an opponent"},
		{title: "Bloc", description: "The blob stops and gets a hat. He has it removed upon moving"},
		{title: "Ghost", description: "The blob turns into a ghost, meaning he can go through enemies. The spell is canceled when triggered again"},
		{title: "Kamikaze", description: "The blob runs in a straight line with a hat. He dies upon hitting a wall"},
		{title: "Gravity", description: "The blob attracts enemy blobs in vicinity. The spell will only stop at the death of the blob"},
		{title: "Revive", description: "Two seconds after casting this spell, if the blob has died, he is revived with a five-second hat. Can only be used once a game"},
		{title: "Switch", description: "The three blobs dash to each other's place with a hat, forming a death triangle. Can only be used once a game"},
		{title: "Orbit", description: "The blobs orbit around the selected blob clockwise, stopping upon hitting a wall, casting a spell, or moving"}
	]
}

export default (state = initialState, action) => {
	switch(action.type) {
		case "SetCard":
			sessionStorage.setItem(`card${action.index}`, action.value);
			return Object.assign({}, state, {
				cards: [
					action.index === 0 ? action.value : state.cards[0],
					action.index === 1 ? action.value : state.cards[1]
				]
			});
		case "RandomCards":
			const card0 = parseInt(Math.random()*initialState.data.length);
			const card1 = parseInt(Math.random()*initialState.data.length);
			sessionStorage.setItem("card0", card0);
			sessionStorage.setItem("card1", card1);
			return Object.assign({}, state, {
				cards: [card0, card1]
			})
		default:
			return state
	}
}
