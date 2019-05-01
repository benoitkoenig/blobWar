import math
import numpy as np

def getAction(state, actionId):
    actions = []
    for blobId in range(len(state["army"])):
        for otherBlob in state["enemy"]:
            actions.append({"type": "server/setDestination", "idBlob": blobId, "destination": {"x": otherBlob["x"], "y": otherBlob["y"]}})
        actions.append({"type": "server/triggerCard", "idBlob": blobId, "destination": {"x": 0, "y": 0}, "idCard": 0})
        actions.append({"type": "server/triggerCard", "idBlob": blobId, "destination": {"x": 0, "y": 0}, "idCard": 1})
    return actions[actionId]

def getFeaturesPerBlob(state):
    featuresPerBlob = []
    for blob in state["army"]:
        Xblob = [1 - int(blob["alive"])] # Xsa depends both on X and on the blob concerned by the action
        for otherBlob in state["enemy"]:
            Xblob.append(1 - int(otherBlob["alive"]))
        for otherBlob in state["enemy"]:
            distance = math.sqrt(((blob["x"] - otherBlob["x"]) ** 2 + (blob["y"] - otherBlob["y"]) ** 2) / 2)
            goingThere = 0
            if (blob["destination"] != None):
                if ((blob["destination"]["x"] - otherBlob["x"]) ** 2 + (blob["destination"]["y"] - otherBlob["y"]) ** 2 < 0.0001):
                    goingThere = 1
            Xblob.append(goingThere)
            for d in [distance, goingThere, 1 - distance, (1 - distance) ** 2]:
                Xblob += [
                    int(otherBlob["alive"]) * int(blob["alive"]) * d * int(blob["status"] == "normal"),
                    int(otherBlob["alive"]) * int(blob["alive"]) * d * int(blob["status"] == "hat"),
                    int(otherBlob["alive"]) * int(blob["alive"]) * d * int(blob["status"] == "ghost"),
                ]
        featuresPerBlob.append(np.array(Xblob))
    return featuresPerBlob

def getXsa(state):
    featuresPerBlob = getFeaturesPerBlob(state)
    Xsa = []
    zeros = np.zeros(len(featuresPerBlob[0]))
    for blobId in range(len(state["army"])):
        for action in range(5): # 5 actions per blob
            X = np.empty(0)
            for i in range(5 * len(state["army"])):
                if (i == blobId * 5 + action):
                    X = np.concatenate([X, featuresPerBlob[blobId]])
                else:
                    X = np.concatenate([X, zeros])
            Xsa.append(X)
    return Xsa
