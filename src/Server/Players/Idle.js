import Player from "./Player.js"

export default class IdlePlayer extends Player {
	constructor() {
		super(false, ["Dash", "Bloc"]);
	}
}
