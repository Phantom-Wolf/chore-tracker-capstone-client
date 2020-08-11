import React, { Component } from "react";
import ValidateForm from "../ValidateForm/ValidateForm";
import config from "../config";
import "./Register.css";

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
			success: null,
			params: {
				user_email: "",
				user_password: "",
			},
		};
	}

	// input credentials into state

	updateEmail(email) {
		this.setState({ email: { value: email, touched: true } });
	}

	updatePassword(password) {
		this.setState({ password: { value: password, touched: true } });
	}

	updateConfirmPassword(confirmPassword) {
		this.setState({ confirmPassword: { value: confirmPassword, touched: true } });
	}

	// credentials validations

	validateEmail() {
		let inputEmail = this.state.email.value;
		let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (inputEmail.length === 0) {
			return "Email is required";
		} else if (!inputEmail.match(mailformat)) {
			return "Invalid Email Address";
		}
	}

	validatePassword() {
		let inputPassword = this.state.password.value;
		// at least one number, one lowercase and one uppercase letter, one special character
		// at least eight characters that are letters, numbers or the underscore
		let passwordformat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
		if (!inputPassword.match(passwordformat)) {
			return "Password must contain 1 upper case, lower case, number and special character";
		}
	}

	validateConfirmPassword() {
		let originalPassword = this.state.password.value;
		let confirmPassword = this.state.confirmPassword.value;
		if (originalPassword !== confirmPassword) {
			return "Passwords to not match";
		}
	}

	// submit to api

	handleRegister = (e) => {
		e.preventDefault();
		//create an object to store the search filters
		const data = {};

		//get all the from data from the form component
		const formData = new FormData(e.target);

		//for each of the keys in form data populate it with form value
		for (let value of formData) {
			data[value[0]] = value[1];
		}
		console.log(data);
		let { user_email, user_password } = data;
		if (this.validateEmail(user_email) === "") {
			this.setState({
				error: "email is not valid",
			});
		}
		if (this.validatePassword(user_password) === "") {
			this.setState({
				error: "password is not valid",
			});
		}
		//assigning the object from the form data to params in the state

		this.setState({ params: data });

		//check if the state is populated with the search params data
		console.log(this.state.params);

		const newUser = {
			user_email: this.state.params.user_email,
			user_password: this.state.params.user_password,
		};
		console.log(newUser);
		this.setState({ error: null });
		fetch(`${config.API_ENDPOINT}/api/users`, {
			method: "POST",
			body: JSON.stringify(newUser),
			headers: {
				"content-type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				// ... convert it to json
				return res.json();
			})
			// use the json api output
			.then((data) => {
				//check if there is meaningfull data
				console.log(data);
				// check if there are no results
				if (data.totalItems === 0) {
					throw new Error("No data found");
				}

				this.setState({
					success: "Registration successful! You may now sign in!",
				});

				document.getElementById("registerForm").reset();
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};

	render() {
		return (
			<section className="signUpForm">
				<form id="registerForm" onSubmit={this.handleRegister}>
					<div>
						<h2 className="signUpHeader">Sign Up</h2>
						<label htmlFor="registerEmail">Email:</label>
						<input
							type="email"
							name="user_email"
							id="signupEmail"
							onChange={(e) => this.updateEmail(e.target.value)}
						/>
						{this.state.email.touched && <ValidateForm message={this.validateEmail()} />}
					</div>
					<div>
						<label htmlFor="signupPassword">Password:</label>
						<input
							type="text"
							name="user_password"
							id="signupPassword"
							onChange={(e) => this.updatePassword(e.target.value)}
						/>
						{this.state.password.touched && <ValidateForm message={this.validatePassword()} />}
					</div>
					<div>
						<label htmlFor="confirmPass">Confirm Password:</label>
						<input
							type="text"
							id="confirmPass"
							name="confirm_password"
							onChange={(e) => this.updateConfirmPassword(e.target.value)}
						/>
						{this.state.confirmPassword.touched && (
							<ValidateForm message={this.validateConfirmPassword()} />
						)}
					</div>
					<div>
						<button
							type="submit"
							disabled={
								this.validateEmail() || this.validatePassword() || this.validateConfirmPassword()
							}
						>
							Sign Up
						</button>
					</div>
				</form>
				{this.state.error && (
					<div>
						<p className="error-message">{this.state.error}</p>
					</div>
				)}
				{this.state.success && (
					<div>
						<p className="success-message">{this.state.success}</p>
					</div>
				)}
			</section>
		);
	}
}

export default Register;
