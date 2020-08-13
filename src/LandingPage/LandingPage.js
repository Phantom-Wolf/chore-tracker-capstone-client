import React, { Component } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import TokenService from "../services/token-service";
import "./LandingPage.css";

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
				<section className="LandingPage">
					<div className="heroImage">
						<h1>onTrack</h1>
						<p>STAY ON TASK</p>
						<p>EVERY WEEKDAY. EVERY WEEK. EVERY MONTH.</p>
						<p>ALWAYS.</p>
					</div>

					<Register className="register" />
				</section>
			</div>
		);
	}
}

export default LandingPage;
