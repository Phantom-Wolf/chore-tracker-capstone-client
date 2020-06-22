import React, { Component } from "react";
import ValidateForm from "../ValidateForm/ValidateForm"

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
			confirmPassword: {
				value: "",
				touched: false,
			},
			error: null,
		};
	}

	// input credentials into state

	updateEmail(email) {
		this.setState(
			{ email: { value: email, touched: true } }
		)
	}

	updatePassword(password) {
		this.setState(
			{ password: { value: password, touched: true } }
		)
	}

	updateConfirmPassword(confirmPassword) {
		this.setState(
			{ confirmPassword: { value: confirmPassword, touched: true } }
		)
	}

	// credentials validations

	validateEmail() {
		let inputEmail = this.state.email.value;
		let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputEmail.length === 0) {
			return "Email is required";
		} 
		 else if (!inputEmail.match(mailformat)) {
			return "Invalid Email Address"
		}
	}

	validatePassword() {
		let inputPassword = this.state.password.value;
		// at least one number, one lowercase and one uppercase letter
		// at least eight characters that are letters, numbers or the underscore
		let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
		if (!inputPassword.match(passwordformat)) {
			return "Password must be atleast 8 characters long and it must include atleast one number, one lowercase and one uppercase letter."
		}
	}

	validateConfirmPassword() {
		let originalPassword = this.state.password.value;
		let confirmPassword = this.state.confirmPassword.value;
		if (originalPassword !== confirmPassword) {
			return "Passwords to not match"
		}
	}

	render() {

		return (
			<section className="loginForm">
				<header>
					<h1>Title</h1>
				</header>
				<h3 className="subTitle">NEVER FALL BEHIND AGAIN</h3>

				<form className="signUpForm">
					
					<div>
						<label htmlFor="email">Email:</label>
						<input type="email" className="signUpEmail" id="email" onChange={(e) => this.updateEmail(e.target.value)}/>
						{this.state.email.touched && <ValidateForm message={this.validateEmail()} />}
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input type="text" className="signUpPassword" id="password" onChange={(e) => this.updatePassword(e.target.value)}/>
						{this.state.password.touched && <ValidateForm message={this.validatePassword()} />}
					</div>
					<div>
						<label htmlFor="confirmPass">Confirm Password:</label>
						<input type="text" className="signUpConfirmPass" id="confirmPass" onChange={(e) => this.updateConfirmPassword(e.target.value)}/>
						{this.state.confirmPassword.touched && <ValidateForm message={this.validateConfirmPassword()} />}
					</div>
					<div>
					<div>
						<button
							type="submit"
							disabled={this.validateEmail() || this.validatePassword() || this.validateConfirmPassword()}
						>
							Sign Up
						</button>
					</div>
						<button disabled>Login</button>
					</div>
				</form>
				{this.state.error && (
					<div>
						<p className="error-message">{this.state.error}</p>
					</div>
				)}
			</section>
		);
	}
}

export default Register;
