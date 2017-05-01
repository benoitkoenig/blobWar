const initialState = {
	alert: null,
	container: null
}

export default (state = initialState, action) => {
	switch(action.type) {
		case "DisplayContainer":
			// Alright, this is very bad practice
			// I need to find a way for the server to trigger a Redirect
			// Right now, I assign container, the Alert component updates it, then clears it
			// Totally misses the point of Redux. There must be some way around though
			// In fact the whole Navigation reducer could be switched for a better navigation
			return Object.assign({}, state, {
				container: action.name
			});
		case "DisplayAlert":
			return Object.assign({}, state, {
				alert: action.name
			});
		case "gameStarted":
			return Object.assign({}, state, {
				container: "/Board",
				alert: null
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
