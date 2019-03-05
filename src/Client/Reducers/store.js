import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import Cards from "./Cards.js";
import Navigation from "./Navigation.js";
import GameState from "./GameState.js";

const reducers = combineReducers({
	Cards,
	Navigation,
	GameState
});

// Connect on address url, or on localhost
const socket = io((window.location.href).split(":")[0] === "file" ? "http://localhost:8080/" : window.location.href);
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(socketIoMiddleware)));

export default store;
