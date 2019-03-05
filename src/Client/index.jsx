import React from "react";
import ReactDOM from "react-dom";
/* I'm thinking of taking off react-router, as it creates more problems than it solves. I'm actually only keeping it because this whole project aims at testing new tools */
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import store from "./Reducers/store.js";

import Header from "./Components/Header/index.jsx";
import Alert from "./Components/Alert/index.jsx";
import Menu from "./Components/Menu/index.jsx";
import CardsSwitch from "./Components/CardsSwitch/index.jsx";
import Board from "./Components/Board/index.jsx";

import "./StyleSheets/index.scss";

ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Header />
					<Route exact path="/" component={Menu} />
					<Route path="/Cards" component={CardsSwitch} />
					<Route path="/Board" component={Board} />
					<Alert />
				</div>
			</BrowserRouter>
		</Provider>

	),
    document.getElementById('body')
);
