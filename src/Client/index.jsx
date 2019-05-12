import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from 'react-router-dom';


import Header from "./Components/Header/index.jsx";
import Alert from "./Components/Alert/index.jsx";
import Menu from "./Components/Menu/index.jsx";
import CardsSwitch from "./Components/CardsSwitch/index.jsx";
import Board from "./Components/Board/index.jsx";
import ImgGenerator from "./Components/ImgGenerator/index.jsx";

import store from "./Reducers/store.js";

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
					<Route path="/ImgGenerator" component={ImgGenerator} />
					<Alert />
				</div>
			</BrowserRouter>
		</Provider>

	),
    document.getElementById('body')
);
