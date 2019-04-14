import numpy as np

from actions import getActionsVectors, getActions
from features import getX, getPositionData

w = np.zeros(41472)
alpha = 0.1
epsilon = 0.1

def determineReward(state, newState):
    newAliveValue = sum([s["alive"] for s in newState["enemy"]])
    oldAliveValue = sum([s["alive"] for s in state["enemy"]])
    return newAliveValue - oldAliveValue - 1

class Agent:
    def __init__(self, sio, id):
        sio.emit("learning_agent_created", {"id": id})
        self.sio = sio
        self.id = id
        self.oldState = None
        self.states = []
        self.actions = []
        self.rewards = []
        self.Xs = []

    def action(self, data):
        if (data["type"] == "update"):
            self.update(data["army"], data["enemy"])
        if (data["type"] == "endOfGame"):
            self.endOfGame(data["value"])

    def endOfGame(self, value):
        if (value == "Victory !"):
            self.rewards.append(100)
        elif (value == "Defeat"):
            self.rewards.append(-100)
        else:
            self.rewards.append(0)
        G = 0
        oldW = np.copy(w)
        for i in range(len(states)):
            j = len(states) - 1 - i
            G += self.rewards[j+1]
            Q = np.dot(w, self.Xs[j])
            w = w + alpha * (G - self.Q) * self.Xs[j]
        print("[Python] End of game: w has been updated. w update value is:" + `np.dot(w, oldW)`)

    def update(self, army, enemy):
        newState = {"army": army, "enemy": enemy}
        if (self.oldState == None): # First update, initializing the state
            self.oldState = newState
            return
        stateData = getPositionData(army, enemy)
        actionsVectors = getActionsVectors()
        Xsa = [np.array(getX(stateData, av)) for av in actionsVectors]
        Q = np.array([np.dot(w, X) for X in Xsa])
        # Q is a list with one element per action : we'll keep the action with the best value
        bestActionId = np.random.choice(range(len(Q)))
        if (np.random.uniform() > epsilon):
            bestActionId = np.random.choice(np.flatnonzero(Q == Q.max()))
        bestAction = getActions(army, enemy)[bestActionId]
        self.states.append(newState)
        self.rewards.append(determineReward(newState, self.oldState))
        self.actions.append(bestAction)
        self.Xs.append(Xsa[bestActionId])
        self.oldState = newState
        print(bestAction)
        self.sio.emit("action-" + `self.id`, bestAction)
