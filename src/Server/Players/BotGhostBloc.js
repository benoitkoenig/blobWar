import ReinforcementLearning from "./ReinforcementLearning.js";

class BotGhostBloc extends ReinforcementLearning {
    name = "BotGhostBloc"

    constructor(firstPlayer = false) {
        super(firstPlayer, ["Ghost", "Bloc"]);
    }
}

export default BotGhostBloc
