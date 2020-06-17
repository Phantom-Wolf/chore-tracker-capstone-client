import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./CategoryListNav.css";
import ChoreContext from "../ChoreContext";

export class CategoryListNav extends Component {
	static contextType = ChoreContext;

	render() {
		const { categories = [] } = this.context;

		return (
			<section className="CategoryListNav">
				<ul className="CategoryListNav_List">
					<li>
						<NavLink to={`/`} className="catNav">
							<h3>Dashboard</h3>
						</NavLink>
					</li>
					{categories.map((category) => (
						<li key={category.id}>
							<NavLink to={`/${category.title}/`} className="catNav">
								<h3>{category.title}</h3>
							</NavLink>
						</li>
					))}
				</ul>
			</section>
		);
	}
}

export default CategoryListNav;
