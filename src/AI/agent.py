import numpy as np

from Xsa import getXsa, getAction

W_SIZE = 645

W_weights_matrix = np.memmap("W_weights_matrix", dtype='float32', mode='r+', shape=(W_SIZE))
w = np.copy(W_weights_matrix)

print("[Python] Loading W_weights_matrix " + `w.max()` + " " + `w.min()`)

alpha = 1. / W_SIZE
epsilon = 0.1
gamma = 0.9
traceDecay = 0.9

def determineReward(state, newState):
    newAliveAllies = sum(s["alive"] for s in newState["army"])
    newAliveEnemies = sum(s["alive"] for s in newState["enemy"])
    oldAliveAllies = sum(s["alive"] for s in state["army"])
    oldAliveEnemies = sum(s["alive"] for s in state["enemy"])
    if (oldAliveAllies - newAliveAllies == 1 & oldAliveEnemies - newAliveEnemies == 1):
        return 50
    elif (oldAliveEnemies - newAliveEnemies == 1):
        return 100
    else:
        return -1

class Agent:
    def __init__(self, sio, id):
        sio.emit("learning_agent_created", {"id": id})
        self.sio = sio
        self.id = id
        self.oldXsa = np.zeros(W_SIZE)
        self.oldState = None
        self.t = 0
        self.z = np.zeros(W_SIZE)

    def action(self, data):
        if (data["type"] == "update"):
            self.update(data)
        if (data["type"] == "endOfGame"):
            self.endOfGame(data["value"])

    def endOfGame(self, value):
        global w, W_weights_matrix
        if (value == "Victory !"):
            reward = 500
        elif (value == "Defeat"):
            reward = 0
        else:
            reward = 100

        self.z = traceDecay * gamma * self.z + self.oldXsa
        delta = reward - np.dot(w, self.oldXsa)
        w = w + alpha * delta * self.z
        print("[Python] End of game after " + `self.t` + " episodes. Array distance: " + `np.linalg.norm(w - W_weights_matrix)`)
        W_weights_matrix[:] = w[:]

        self.sio.emit("action-" + `self.id`, {"type": None}) # Needs to play one last time for the game to properly end

    def update(self, state):
        global w
        if (self.oldState == None): # First update, initializing the state
            self.oldState = state
            return
        self.t += 1
        if (self.t % 15 != 0):
            self.sio.emit("action-" + `self.id`, {"type": None})
            return # give time for our action to have a consequence

        Xsa = getXsa(state) #Xsa is a list for each Xs for a given a
        Q = np.array([np.dot(w, X) for X in Xsa])
        if (np.random.uniform() < epsilon):
            bestActionId = np.random.choice(range(len(Q)))
        else:
            bestActionId = np.random.choice(np.flatnonzero(Q == Q.max()))

        reward = determineReward(self.oldState, state)
        self.z = traceDecay * gamma * self.z + self.oldXsa
        delta = reward + gamma * Q[bestActionId] - np.dot(w, self.oldXsa)
        w = w + alpha * delta * self.z

        self.oldState = state
        self.oldXsa = Xsa[bestActionId].tolist()
        bestAction = getAction(state, bestActionId)
        self.sio.emit("action-" + `self.id`, bestAction)
