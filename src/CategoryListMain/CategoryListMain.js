import React, { Component } from "react";
import "./CategoryListMain.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import ChoreContext from "../ChoreContext";


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
					<p className="cat_page_date">{this.context.currentDate}</p>

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
								<ul>
									{this.context.events.map((event) => {
										if (event.recurrence_specifics.includes(weekday.name)) {
											return <li key={event.id}>{event.title}</li>;
										}
									})}
								</ul>
							</li>
						))}
					</ul>
				</section>
			);
		} else if (category === "Weekly") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{this.context.currentDate}</p>

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
								<ul>
									{this.context.events.map((event) => {
										if (event.recurrence_specifics.includes(week.name)) {
											console.log(event.title);
											return <li key={event.id}>{event.title}</li>;
										} else {
											console.log("false match");
										}
									})}
								</ul>
							</li>
						))}
					</ul>
				</section>
			);
		} else if (category === "Monthly") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{this.context.currentDate}</p>

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
								<ul>
									{this.context.events.map((event) => {
										if (event.recurrence_specifics.includes(month.name)) {
											console.log(event.title);
											return <li key={event.id}>{event.title}</li>;
										} else {
											console.log("false match");
										}
									})}
								</ul>
							</li>
						))}
					</ul>
				</section>
			);
		}
		return <div className="catList_section">{htmlOutput}</div>;
	}

	render() {

		return <>{this.renderCategories(this.props.match.params.category)}</>;
	}
}

export default CategoryListMain;
