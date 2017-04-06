const initialState = {
	container: "Menu",
	alert: null
}

export default (state = initialState, action) => {
	switch(action.type) {
		case "DisplayContainer":
			return Object.assign({}, state, {
				container: action.name
			});
		case "DisplayAlert":
			return Object.assign({}, state, {
				alert: action.name
			});
		case "gameStarted":
			return Object.assign({}, state, {
				alert: null,
				container: "Board"
			});
		case "countdown":
			return Object.assign({}, state, {
				alert: "MatchMaking"
			});
		case "endOfGame":
			return Object.assign({}, state, {
				alert: "EndOfGame"
			});
		default:
			return state
	}
}
