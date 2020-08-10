import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./CategoryListNav.css";
import ChoreContext from "../ChoreContext";
import TokenService from "../services/token-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class CategoryListNav extends Component {
	state = {
		isToggle: false,
	};

	componentDidMount() {
		window.onresize = () => {
			if (window.innerWidth > 1100) {
				this.setState({
					isToggle: true,
				});
			}
		};
	}

	// componentDidUpdate() {
	// 	if (window.innerWidth > 1100) {
	// 		this.setState({
	// 			isToggle: true,
	// 		});
	// 	}
	// }

	static contextType = ChoreContext;

	logout = () => {
		TokenService.clearAuthToken();
	};
	Toggle = () => {
		this.setState({
			isToggle: !this.state.isToggle,
		});
	};
	render() {
		const { categories = [] } = this.context;

		return (
			<section className="CategoryListNav">
				<ul className="CategoryListNav_List">
					<div className="mainList">
						<li>
							<NavLink to={`/Home`} className="catNav always-show">
								<h3>Dashboard</h3>
							</NavLink>
						</li>
						<li className="catNav always-show toggleBar" onClick={this.Toggle}>
							<h3>
								<FontAwesomeIcon icon="bars" />
							</h3>
						</li>
					</div>
					<div className="dropList">
						{categories.map((category) => (
							<li key={category.id}>
								<NavLink
									to={`/Category/${category.title}/`}
									className="catNav "
									style={{
										display: this.state.isToggle || window.innerWidth > 1100 ? "block" : "none",
									}}
								>
									<h3>{category.title}</h3>
								</NavLink>
							</li>
						))}
						<li>
							<NavLink
								to={`/AddTask`}
								className="catNav navAddTask "
								style={{
									display: this.state.isToggle || window.innerWidth > 1100 ? "block" : "none",
								}}
							>
								<h3>Add Task</h3>
							</NavLink>
						</li>
						<li className="logout" onClick={this.logout}>
							<NavLink
								to={`/login`}
								className="catNav navAddTask logout "
								style={{
									display: this.state.isToggle || window.innerWidth > 1100 ? "block" : "none",
								}}
							>
								<h3>Sign Out</h3>
							</NavLink>
						</li>
					</div>
				</ul>
			</section>
		);
	}
}

export default CategoryListNav;
