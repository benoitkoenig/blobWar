import math

def getPositionData(army, enemy):
    data = []
    for blob in army:
        for otherBlob in enemy:
            distance = math.sqrt(((blob["x"] - otherBlob["x"]) ** 2 + (blob["y"] - otherBlob["y"]) ** 2) / 2)
            angle = math.atan2(blob["y"] - otherBlob["y"], blob["x"] - otherBlob["x"]) / math.pi + 0.5
            # distance and angle are inside [0, 1]
            data.append(distance)
            data.append(angle)
    return data

def createAllCombinaisons(lenParams, maxNumber):
    # Create Product(C(i)**j), with every combinaison for i and j. 0 < i <lenParams, 0 < j < maxPower
    combinaisons = []
    for i in range(maxNumber ** lenParams):
        combinaison = []
        for j in range(lenParams):
            power = (i / (maxNumber ** j)) % maxNumber
            combinaison.append(power)
        combinaisons.append(combinaison)
    return combinaisons

stateDataCombinaisons = createAllCombinaisons(9, 2)

def getX(stateData, actionVector):
    features = []
    for combinaison in stateDataCombinaisons:
        value = 1.
        for j in range(len(combinaison)):
            value = value * stateData[j] ** combinaison[j]
        f1 = [a * math.cos(value * math.pi) for a in actionVector]
        f2 = [a * math.cos(value * math.pi / 2) for a in actionVector]
        f3 = [a * math.cos(value * math.pi / 3) for a in actionVector]
        features = features + f1 + f2 + f3
    return features

# "state":{
#     "army":[
#         {
#         "x":0.2,
#         "y":0.9,
#         "orientation":3,
#         "alive":true,
#         "status":"normal"
#         },
#         {
#         "x":0.5,
#         "y":0.9,
#         "orientation":3,
#         "alive":true,
#         "status":"normal"
#         },
#         {
#         "x":0.8,
#         "y":0.9,
#         "orientation":3,
#         "alive":true,
#         "status":"normal"
#         }
#     ],
#     "enemy":[
#         {
#         "x":0.2,
#         "y":0.1,
#         "orientation":1,
#         "alive":true,
#         "destination":null,
#         "status":"normal",
#         "currentSpell":null
#         },
#         {
#         "x":0.5,
#         "y":0.1,
#         "orientation":1,
#         "alive":true,
#         "destination":null,
#         "status":"normal",
#         "currentSpell":null
#         },
#         {
#         "x":0.8,
#         "y":0.1,
#         "orientation":1,
#         "alive":true,
#         "destination":null,
#         "status":"normal",
#         "currentSpell":null
#         }
#     ]
# }
