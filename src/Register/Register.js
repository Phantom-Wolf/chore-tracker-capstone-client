import React, { Component } from "react";

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: {
				value: "",
				touched: false,
			},
			password: {
				value: "",
				touched: false,
			},
			option: {
				id: "",
				touched: false,
			},
			error: null,
		};
	}

	validateEmail(inputEmail) {
		let outputEmail = inputEmail;
		let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!inputEmail.match(mailformat)) {
			outputEmail = "";
		}
		return outputEmail;
	}

	validatePassword(inputPassword) {
		let outputPassword = inputPassword;
		// at least one number, one lowercase and one uppercase letter
		// at least eight characters that are letters, numbers or the underscore
		let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
		if (!inputPassword.match(passwordformat)) {
			outputPassword = "";
		}
		return outputPassword;
	}

	render() {
		const errorMessage = this.state.error ? (
			<p className="error-message">{this.state.error}</p>
		) : (
			false
		);

		return (
			<section className="loginForm">
				<header>
					<h1>Title</h1>
				</header>
				<h3 className="subTitle">NEVER FALL BEHIND AGAIN</h3>

				<form className="signUpForm">
					{errorMessage}
					<div>
						<label htmlFor="email">Email:</label>
						<input type="email" className="signUpEmail" id="email" />
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input type="text" className="signUpPassword" id="password" />
					</div>
					<div>
						<label htmlFor="confirmPass">Confirm Password:</label>
						<input type="text" className="signUpConfirmPass" id="confirmPass" />
					</div>
					<div>
						<button type="submit" disabled>
							Sign-Up
						</button>
						<button disabled>Login</button>
					</div>
				</form>
			</section>
		);
	}
}

export default Register;
