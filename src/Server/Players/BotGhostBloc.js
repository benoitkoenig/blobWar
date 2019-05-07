import ReinforcementLearning from "./ReinforcementLearning.js";

const name = "BotGhostBloc"

class BotGhostBloc extends ReinforcementLearning {
    name = name

    constructor(firstPlayer = false, exploratoryStarts=false) {
        super(firstPlayer, ["Ghost", "Bloc"], name, exploratoryStarts);
    }
}

export default BotGhostBloc
