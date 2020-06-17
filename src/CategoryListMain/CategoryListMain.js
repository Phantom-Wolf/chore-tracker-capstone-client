import React, { Component } from "react";
import "./CategoryListMain.css";
import ChoreContext from "../ChoreContext";

export class CategoryListMain extends Component {
	static contextType = ChoreContext;

	render() {
		const { categories = [] } = this.context;

		const options1 = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			week: "numeric",
		};
		let date1 = new Date();
		const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);

		return (
			<section className="CategoryListMain">
				<header>
					<h2 className="dashboard">Dashboard</h2>
					<p className="dashboardDate">{dateTimeFormat3.format(date1)}</p>
				</header>

				<ul className="CategoryListMain_List">
					{categories.map((category) => (
						<li key={category.id}>
							<section className="CategorySection">
								<h3>
									{category.title} <span className="subText">{category.dateType}</span>
								</h3>
							</section>
						</li>
					))}
				</ul>
			</section>
		);
	}
}

export default CategoryListMain;
