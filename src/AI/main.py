import socketio
from agent import Agent

sio = socketio.Client()
agents = {}

@sio.on('connect')
def on_connect():
    print('[Python] SocketIO connected: AI is up. Identifying as the AI')
    sio.emit('connectAI', {'passwd': 'Kore wa watashi no passwd'})

@sio.on('create_learning_agent')
def on_create_learning_agent(data):
    agents[data["id"]] = Agent(sio, data["id"])

@sio.on('action')
def on_action(data):
    agents[data["agentId"]].action(data["data"])

@sio.on('terminate_agent')
def on_terminate_agent(data):
    del agents[data["agentId"]]

@sio.on('disconnect')
def on_disconnect():
    print('[Python] SocketIO disconnected: closing AI')

sio.connect("http://localhost:8080") # TODO: get the port right
