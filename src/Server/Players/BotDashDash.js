import ReinforcementLearning from "./ReinforcementLearning.js";

const name = "BotDashDash"

class BotGhostBloc extends ReinforcementLearning {
    name = name

    constructor(firstPlayer = false, exploratoryStarts=false) {
        super(firstPlayer, ["Dash", "Dash"], name, exploratoryStarts);
    }
}

export default BotGhostBloc
