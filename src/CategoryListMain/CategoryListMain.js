import React, { Component } from "react";
import "./CategoryListMain.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import ChoreContext from "../ChoreContext";

export class CategoryListMain extends Component {
	static contextType = ChoreContext;

	render() {
		const { weekday, weekOfMonth, month } = this.context;

		const options1 = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			week: "numeric",
		};
		let date1 = new Date();
		const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);

		let weekdayList = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		let weeklyList = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
		let monthlyList = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		return (
			<>
				<section className="CategoryPage">
					<header className="CategoryPageHeader">
						<p className="cat_page_date">{dateTimeFormat3.format(date1)}</p>
						<h2>Weekdays</h2>
						<p>It is currently {weekday}</p>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<ul className="CategoryPageDateTypes">
						{weekdayList.map((weekday) => (
							<li>
								<h3>{weekday}</h3>
							</li>
						))}
					</ul>
				</section>
				<section className="CategoryPage">
					<header className="CategoryPageHeader">
						<h2>Weeks</h2>
						<p>It is currently Week {weekOfMonth} of the Month</p>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<ul className="CategoryPageDateTypes">
						{weeklyList.map((week) => (
							<li>
								<h3>{week}</h3>
							</li>
						))}
					</ul>
				</section>
				<section className="CategoryPage">
					<header className="CategoryPageHeader">
						<h2>Months</h2>
						<p>It is currently {month}</p>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<ul className="CategoryPageDateTypes">
						{monthlyList.map((month) => (
							<li>
								<h3>{month}</h3>
							</li>
						))}
					</ul>
				</section>
			</>
		);
	}
}

export default CategoryListMain;
