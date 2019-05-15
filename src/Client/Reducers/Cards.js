import Cards from "../Cards.json";

const initialState = {
	cards: [sessionStorage.getItem("card0"), sessionStorage.getItem("card1")],
	data: Cards,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case "SetCard":
			sessionStorage.setItem(`card${action.index}`, action.value);
			return Object.assign({}, state, {
				cards: [
					action.index === 0 ? action.value : state.cards[0],
					action.index === 1 ? action.value : state.cards[1],
				],
			});
		case "RandomCards":
			const card0 = parseInt(Math.random()*initialState.data.length);
			const card1 = parseInt(Math.random()*initialState.data.length);
			sessionStorage.setItem("card0", card0);
			sessionStorage.setItem("card1", card1);
			return Object.assign({}, state, {
				cards: [card0, card1],
			});
		default:
			return state
	}
}
