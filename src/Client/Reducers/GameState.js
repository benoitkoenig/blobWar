const initialState = {
	endOfGameValue: null,
	army: null,
	enemy: null,
	countdown: null
}

export default (state = initialState, action) => {
	switch(action.type) {
		case "update":
			return Object.assign({}, state, {
				army: action.army,
				enemy: action.enemy
			});
		case "endOfGame":
			return Object.assign({}, state, {
				endOfGameValue: action.value
			});
		case "countdown":
			return Object.assign({}, state, {
				countdown: action.value
			});
		default:
			return state
	}
}
