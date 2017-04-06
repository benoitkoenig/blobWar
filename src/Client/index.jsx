import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware} from "redux";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import Cards from "./Reducers/Cards.js";
import Navigation from "./Reducers/Navigation.js";
import GameState from "./Reducers/GameState.js";

import Body from "./Components/Body.jsx";

const reducers = combineReducers({
	Cards,
	Navigation,
	GameState
});

// Connect on address url, or on localhost
let socket = io((window.location.href).split(":")[0] === "file" ? "http://localhost:8080/" : window.location.href);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

let store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);

render(
	<Provider store={store}>
		<Body />
	</Provider>,
	document.getElementById('body')
)
