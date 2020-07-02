import React, { Component } from "react";
import config from "../config";
import "./Login.css";

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
		let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
		if (!inputPassword.match(passwordformat)) {
			return "Password must be atleast 8 characters long and it must include atleast one number, one lowercase and one uppercase letter.";
		}
	}

	formatQueryParams(params) {
		const queryItems = Object.keys(params).map(
			(key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
		);
		return queryItems.join("&");
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

		//check if the state is populated with the search params data
		console.log(this.state.params);

		const searchURL = `${config.API_ENDPOINT}/login`;

		const queryString = this.formatQueryParams(data);

		//sent all the params to the final url
		const url = searchURL + "?" + queryString;

		console.log(url);

		//define the API call parameters
		const options = {
			method: "POST",
			header: {
				Authorization: "",
				"Content-Type": "application/json",
			},
		};

		//useing the url and paramters above make the api call
		fetch(url, options)
			// if the api returns data ...
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
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};

	render() {
		return (
			<section className="loginForm">
				<form onSubmit={this.handleLogin}>
					<div>
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
					<div>
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
