import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./CategoryListNav.css";
import ChoreContext from "../ChoreContext";
import TokenService from "../services/token-service";

export class CategoryListNav extends Component {
	static contextType = ChoreContext;

	logout = () => {
		TokenService.clearAuthToken();
	};

	render() {
		const { categories = [] } = this.context;

		return (
			<section className="CategoryListNav">
				<ul className="CategoryListNav_List">
					<li>
						<NavLink to={`/Home`} className="catNav">
							<h3>Dashboard</h3>
						</NavLink>
					</li>
					{categories.map((category) => (
						<li key={category.id}>
							<NavLink to={`/Category/${category.title}/`} className="catNav">
								<h3>{category.title}</h3>
							</NavLink>
						</li>
					))}
					<li>
						<NavLink to={`/AddTask`} className="catNav navAddTask">
							<h3>Add Task</h3>
						</NavLink>
					</li>
					<li className="logout" onClick={this.logout}>
						<NavLink to={`/login`} className="catNav navAddTask logout">
							<h3>Sign Out</h3>
						</NavLink>
					</li>
				</ul>
			</section>
		);
	}
}

export default CategoryListNav;
