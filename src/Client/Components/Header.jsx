import React from "react";

import { logo, login } from "../Assets/assets.js";

export default () => (
	<div id="header">
		<div id="logo"><img src={logo} /><span> Blob War </span></div>
		<img id="login" src={login} />
	</div>
);
