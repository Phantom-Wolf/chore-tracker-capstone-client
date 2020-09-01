import React, { Component } from "react";
import Register from "../Register/Register";
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
				<section className="LandingPage">
					<div className="heroImage">
						<h1>onTrack</h1>
						<p className="explainingParagraph">
							Allow onTrack to maintain all your repeating, everyday tasks so that you can focus on
							what matters. From weekdays, weeks of the month, or monthly - you can divide your
							responsibilities on an easy to use and simply formatted platform. Sign up below to get started.
						</p>
					</div>

					<Register className="register" />
				</section>
			</div>
		);
	}
}

export default LandingPage;
