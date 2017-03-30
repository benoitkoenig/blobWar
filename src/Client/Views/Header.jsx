import React from "react";

export default class Header extends React.Component {
	render() {
		return (
			<div id="header">
				<div id="logo"><img src="Assets/Logo.png" /><span> Blob War </span></div>
				<img id="login" src="Assets/Login.png" />
			</div>
		);
	}
}
