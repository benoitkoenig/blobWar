def getActions(army, enemy):
    actions = []
    for blobId in range(len(army)):
        for otherBlob in enemy:
            actions.append({"type": "server/setDestination", "idBlob": blobId, "destination": {"x": otherBlob["x"], "y": otherBlob["y"]}})
            actions.append({"type": "server/triggerCard", "idBlob": blobId, "destination": {"x": otherBlob["x"], "y": otherBlob["y"]}, "idCard": 0})
            actions.append({"type": "server/triggerCard", "idBlob": blobId, "destination": {"x": otherBlob["x"], "y": otherBlob["y"]}, "idCard": 1})
    return actions

def getActionsVectors():
    actionsVectors = []
    for i in range(27):
        a = [0] * 27
        a[i] = 1
        actionsVectors.append(a)
    return actionsVectors
