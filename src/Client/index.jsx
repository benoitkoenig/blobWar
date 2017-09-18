import React from "react";
import ReactDOM from "react-dom";
/* I'm thinking of taking off react-router, as it creates more problems than it solves. I'm actually only keeping it because this whole project aims at testing new tools */
import { Redirect, BrowserRouter, IndexRoute, Route, Link } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

import Cards from "./Reducers/Cards.js";
import Navigation from "./Reducers/Navigation.js";
import GameState from "./Reducers/GameState.js";

import Header from "./Components/Header.jsx";
import Alert from "./Components/Alert.jsx";
import Menu from "./Components/Menu.jsx";
import CardsSwitch from "./Components/CardsSwitch.jsx";
import Board from "./Components/Board.jsx";

import "./StyleSheets/Board.scss";
import "./StyleSheets/CardsSwitch.scss";
import "./StyleSheets/EndOfGame.scss";
import "./StyleSheets/Header.scss";
import "./StyleSheets/HowToPlay.scss";
import "./StyleSheets/MatchMaker.scss";
import "./StyleSheets/Menu.scss";
import "./StyleSheets/index.scss";

const reducers = combineReducers({
	Cards,
	Navigation,
	GameState
});

// Connect on address url, or on localhost
const socket = io((window.location.href).split(":")[0] === "file" ? "http://localhost:8080/" : window.location.href);
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);

ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Header />
					<Route path="/">
						<Redirect to="/Menu" />
					</Route>
					<Route path="/Menu" component={Menu} />
					<Route path="/Cards" component={CardsSwitch} />
					<Route path="/Board" component={Board} />
					<Alert />
				</div>
			</BrowserRouter>
		</Provider>

	),
    document.getElementById('body')
);
