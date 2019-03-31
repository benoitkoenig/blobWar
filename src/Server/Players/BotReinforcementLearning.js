import Player from "./Player.js"
import { spawn } from "child_process"

const pipe = (f, g) => (...args) => f(g(...args));

const takeAction = (state, previousState, actionsTook, training) => new Promise((resolve, reject) => {
    // I do not have an open chanel between node and python, thought I would rather do
    const data = { state, previousState, actionsTook, training };
    const process = spawn("python", ["IA.py", JSON.stringify(data)]);
    process.stdout.on("data", pipe(resolve, JSON.parse));
    process.stdout.on("error", reject);
});

class BotReinforcementLearning extends Player {
	constructor(firstPlayer, training) {
        super(firstPlayer, ["Ghost", "Bloc"]);
        this.previousState = null;
        this.actionsTook = null;
        this.training = training;
	}

    iterateBlobs = async (enemy) => {
        const state = { army: this.getArmyData(), enemy };
        try {
            const actionsToTake = await takeAction(state, this.previousState, this.actionsTook, this.training);
            actionsToTake.forEach((action) => {
                if (action.type == "setDestination") {
                    this._army[action.idBlob].destination = action.destination;
                } else if (action.type == "triggerCard") {
                    this._cards[action.idCard].trigger({idBlob: action.idBlob, destination: action.destination}, this._army);
                }
            })
            console.log("Number of actions decided:", actionsToTake.length);
            this.previousState = state;
            this.actionsTook = actionsToTake;
        } catch(e) {
            console.error("Error iterating BotReinforcementLearning", e);
        }
        super.iterateBlobs();
    }

    emit = (data) => {
        if (data.type === "endOfGame") {
            takeAction({ enfOfGame: data.value }, this.previousState, this.actionsTook, this.training);
        }
    }
}

export default BotReinforcementLearning;
