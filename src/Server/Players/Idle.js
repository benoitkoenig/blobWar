import Player from "./Player.js"

export default class IdlePlayer extends Player {
	name = "IdlePlayer"

	constructor(firstPlayer = false) {
		super(firstPlayer, ["Dash", "Bloc"]);
	}
}
