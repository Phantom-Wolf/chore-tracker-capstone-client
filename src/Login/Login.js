import React, { Component } from "react";
import config from "../config";
import "./Login.css";
import TokenService from "../services/token-service";
import ChoreContext from "../ChoreContext";

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			email: {
				value: "",
				touched: false,
			},
			password: {
				value: "",
				touched: false,
			},
			params: {
				loginEmail: "",
				loginPassword: "",
			},
		};
	}

	componentDidMount() {
		if (TokenService.hasAuthToken()) {
			TokenService.clearAuthToken();
		}
	}

	static contextType = ChoreContext;

	// input credentials into state

	updateEmail(email) {
		this.setState({ email: { value: email, touched: true } });
	}

	updatePassword(password) {
		this.setState({ password: { value: password, touched: true } });
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
		// at least one number, one lowercase and one uppercase letter
		// at least eight characters that are letters, numbers or the underscore
		let passwordformat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
		if (!inputPassword.match(passwordformat)) {
			return "Password must be atleast 8 characters long and it must include atleast one number, one lowercase and one uppercase letter.";
		}
	}

	handleLogin = (e) => {
		e.preventDefault();
		//create an object to store the search filters
		const data = {};

		//get all the from data from the form component
		const formData = new FormData(e.target);

		//for each of the keys in form data populate it with form value
		for (let value of formData) {
			data[value[0]] = value[1];
		}
		
		let { loginEmail, loginPassword } = data;
		if (this.validateEmail(loginEmail) === "") {
			this.setState({
				error: "email is not valid",
			});
		}
		if (this.validatePassword(loginPassword) === "") {
			this.setState({
				error: "password is not valid",
			});
		}
		//assigning the object from the form data to params in the state

		this.setState({ params: data });

		let stateData = {
			user_email: data.loginEmail,
			user_password: data.loginPassword,
		};
		this.setState({ error: null });
		fetch(`${config.API_ENDPOINT}/api/auth/login`, {
			method: "POST",
			body: JSON.stringify(stateData),
			headers: {
				"content-type": "application/json",
			},
		})
			// if the api returns data ...
			.then((res) => {
				if (!res.ok) {
					// throw new Error(res.data);
					throw res;
				}

				return res.json();
			})
			// use the json api output
			.then((data) => {
				//check if there is meaningfull data
				
				TokenService.saveAuthToken(data.authToken);
				// check if there are no results

				if (data.totalItems === 0) {
					throw new Error("No data found");
				}

				window.location = "/home";
			})
			.catch((error) => {
	
				try {
					error.json().then((body) => {
						this.setState({
							error: body.error,
						});
					});
				} catch (e) {
					this.setState({
						error: error,
					});
				}
			});
	};

	returnHome() {
		window.location = "/Landing";
	}

	render() {
		return (
			<section className="loginForm">
				<form onSubmit={this.handleLogin}>
					<p className="existingUser">Sign in to onTrack</p>
					<div className="logEmail">
						<label htmlFor="logEmail">Email:</label>
						<input
							type="email"
							name="loginEmail"
							id="logEmail"
							onChange={(e) => this.updateEmail(e.target.value)}
						/>
					</div>
					<div className="logPass">
						<label htmlFor="logPassword">Password:</label>
						<input
							type="password"
							name="loginPassword"
							id="logPassword"
							onChange={(e) => this.updatePassword(e.target.value)}
						/>
					</div>
					<div>
						<button type="submit" disabled={this.validateEmail() || this.validatePassword()}>
							Login
						</button>
					</div>
					{this.state.error && (
						<div className="error">
							<p>{this.state.error}</p>
						</div>
					)}
					<div>
						<p>Demo: </p>
						<p>E: dunder@outlook.com</p>
						<p>P: Password1!</p>
						<p>
							New to onTrack?{" "}
							<span className="clickSignUp" onClick={this.returnHome}>
								Sign up Here.
							</span>
						</p>
					</div>
				</form>
			</section>
		);
	}
}

export default Login;
