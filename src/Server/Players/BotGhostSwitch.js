import ReinforcementLearning from "./ReinforcementLearning.js";

const name = "RBotGhostSwitch"

class BotGhostSwitch extends ReinforcementLearning {
    name = name

    constructor(firstPlayer = false, exploratoryStarts=false) {
        super(firstPlayer, ["Ghost", "Switch"], name, exploratoryStarts);
    }
}

export default BotGhostSwitch
