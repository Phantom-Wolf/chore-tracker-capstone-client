import React, { Component } from "react";
import "./CategoryListMain.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import ChoreContext from "../ChoreContext";

const options1 = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
	week: "numeric",
};
let date1 = new Date();
const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);

export class CategoryListMain extends Component {
	static defaultProps = {
		match: {
			params: {},
		},
	};

	static contextType = ChoreContext;

	renderCategories(category) {
		console.log("params", category);
		let htmlOutput = "";
		if (category === "Weekdays") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{dateTimeFormat3.format(date1)}</p>

					<header className="CategoryPageHeader">
						<h2>Weekdays</h2>
						<p>It is currently {this.context.weekday}</p>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<ul className="CategoryPageDateTypes">
						{this.context.weekdayList.map((weekday) => (
							<li key={weekday.id}>
								<h3>{weekday.name}</h3>
							</li>
						))}
					</ul>
				</section>
			);
		} else if (category === "Weekly") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{dateTimeFormat3.format(date1)}</p>

					<header className="CategoryPageHeader">
						<h2>Weeks</h2>
						<p>It is currently Week {this.context.weekOfMonth} of the Month</p>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<ul className="CategoryPageDateTypes">
						{this.context.weeklyList.map((week) => (
							<li key={week.id}>
								<h3>{week.name}</h3>
							</li>
						))}
					</ul>
				</section>
			);
		} else if (category === "Monthly") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{dateTimeFormat3.format(date1)}</p>

					<header className="CategoryPageHeader">
						<h2>Months</h2>
						<p>It is currently {this.context.month}</p>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<ul className="CategoryPageDateTypes">
						{this.context.monthlyList.map((month) => (
							<li key={month.id}>
								<h3>{month.name}</h3>
							</li>
						))}
					</ul>
				</section>
			);
		}
		return <div className="catList_section">{htmlOutput}</div>;
	}

	render() {
		// import selected context values
		// const {
		// 	weekday,
		// 	weekOfMonth,
		// 	month,
		// 	weekdayList = [],
		// 	weeklyList = [],
		// 	monthlyList = [],
		// } = this.context;

		return <>{this.renderCategories(this.props.match.params.category)}</>;
	}
}

export default CategoryListMain;
