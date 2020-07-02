import React, { Component } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";

export class LandingPage extends Component {
	render() {
		return (
			<div>
				<div className="topBarLogin">
					<Login />
				</div>
				<section>
					<div></div>

					<Register />
				</section>
			</div>
		);
	}
}

export default LandingPage;
