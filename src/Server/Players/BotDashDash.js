import ReinforcementLearning from "./ReinforcementLearning.js";

const name = "BotDashDash"

class BotGhostBloc extends ReinforcementLearning {
    name = name

    constructor(firstPlayer = false) {
        super(firstPlayer, ["Dash", "Dash"], name);
    }
}

export default BotGhostBloc
