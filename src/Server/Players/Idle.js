import Player from "./Player.js"

export default class IdlePlayer extends Player {
	constructor(firstPlayer = false) {
		super(firstPlayer, ["Dash", "Bloc"]);
	}
}
