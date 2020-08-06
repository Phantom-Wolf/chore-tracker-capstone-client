import React, { Component } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import TokenService from "../services/token-service";

export class LandingPage extends Component {
	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			TokenService.clearAuthToken();
		}
	}

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
