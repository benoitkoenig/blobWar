import React from "react";

import "./styles.scss";

import { logo, login } from "../../Assets";

export default () => (
	<div id="header">
		<div id="logo"><img src={logo} /><span> Blob War </span></div>
		<img id="login" src={login} />
	</div>
);
