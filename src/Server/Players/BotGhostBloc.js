import ReinforcementLearning from "./ReinforcementLearning.js";

const name = "BotGhostBloc"

class BotGhostBloc extends ReinforcementLearning {
    name = name

    constructor(firstPlayer = false) {
        super(firstPlayer, ["Ghost", "Bloc"], name);
    }
}

export default BotGhostBloc
