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

	// formatQueryParams(params) {
	// 	const queryItems = Object.keys(params).map(
	// 		(key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
	// 	);
	// 	return queryItems.join("&");
	// }

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
		console.log(data);
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
				console.log("res data", data);
				TokenService.saveAuthToken(data.authToken);
				// check if there are no results

				if (data.totalItems === 0) {
					throw new Error("No data found");
				}

				window.location = "/home";
			})
			.catch((error) => {
				console.log("Error occurred");
				try {
					error.json().then((body) => {
						//Here is already the payload from API
						console.log(body);
						console.log("message = " + body.error);
						this.setState({
							error: body.error,
						});
					});
				} catch (e) {
					console.log("Error parsing promise");
					console.log(error);
					this.setState({
						error: error,
					});
				}
			});
	};

	render() {
		return (
			<section className="loginForm">
				<form onSubmit={this.handleLogin}>
					{this.state.error && (
						<div className="error">
							<p>{this.state.error}</p>
						</div>
					)}
					<p className = "existingUser">Existing User?</p>
					<div className="logEmail">
						<label htmlFor="logEmail">
							Email:
							<input
								type="email"
								name="loginEmail"
								id="logEmail"
								onChange={(e) => this.updateEmail(e.target.value)}
							/>
						</label>
					</div>
					<div className="logPass">
						<label htmlFor="logPassword">
							Password:
							<input
								type="password"
								name="loginPassword"
								id="logPassword"
								onChange={(e) => this.updatePassword(e.target.value)}
							/>
						</label>
					</div>
					<div>
						<button type="submit" disabled={this.validateEmail() || this.validatePassword()}>
							Login
						</button>
					</div>
				</form>
			</section>
		);
	}
}

export default Login;
