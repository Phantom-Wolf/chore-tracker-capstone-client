import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./CategoryListMain.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import config from "../config";
import TokenService from "../services/token-service";
import ChoreContext from "../ChoreContext";

export class CategoryListMain extends Component {
	state = {
		events: [],
	};

	static defaultProps = {
		match: {
			params: {},
		},
	};

	componentDidMount() {
		fetch(`${config.API_ENDPOINT}/api/events`, {
			method: "GET",
			headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
		})
			.then((eventRes) => {
				if (!eventRes.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				return eventRes.json();
			})
			.then((res) => {
			
				this.setState({
					events: res,
				});
			})
			.catch((err) => {
				
			});
	}

	static contextType = ChoreContext;

	renderCategories(category) {
		
		let htmlOutput = "";
		if (category === "Weekdays") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{this.context.currentDate}</p>

					<header className="CategoryPageHeader">
						<h2>Weekdays</h2>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<div className="catBody">
						<p className="listMainSubtext">
							Here are the tasks that you will perform on each day of the week
						</p>
						<ul className="CategoryPageDateTypes">
							{this.context.weekdayList.map((weekday) => (
								<li key={weekday.id}>
									<h3 className="listTitleName">{weekday.name}</h3>
									<ul className="CategoryPageEventUl">
										{this.state.events.map((event) => {
											if (event.recurrence_specifics.includes(weekday.name)) {
												return (
													<li key={event.id} className="eventPageListItem">
														<NavLink to={`/Event/${event.id}`} className="event">
															<h3>{event.title}</h3>
														</NavLink>
													</li>
												);
											}
										})}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</section>
			);
		} else if (category === "Weekly") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{this.context.currentDate}</p>

					<header className="CategoryPageHeader">
						<h2>Weekly</h2>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<div className="catBody">
						<p className="listMainSubtext">
							Here are the tasks that you will perform in each week of the month
						</p>
						<p className="listMainSubDate">
							It is currently Week {this.context.weekOfMonth} of {this.context.month}
						</p>
						<ul className="CategoryPageDateTypes">
							{this.context.weeklyList.map((week) => (
								<li key={week.id}>
									<h3 className="listTitleName">{week.name}</h3>
									<ul className="CategoryPageEventUl">
										{this.state.events.map((event) => {
											if (event.recurrence_specifics.includes(week.name)) {
												
												return (
													<li key={event.id} className="eventPageListItem">
														<NavLink to={`/Event/${event.id}`} className="event">
															<h3>{event.title}</h3>
														</NavLink>
													</li>
												);
											} else {
											
											}
										})}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</section>
			);
		} else if (category === "Monthly") {
			htmlOutput = (
				<section className="CategoryPage">
					<p className="cat_page_date">{this.context.currentDate}</p>

					<header className="CategoryPageHeader">
						<h2>Months</h2>
					</header>
					<nav>
						<CategoryListNav />
					</nav>
					<div className="catBody">
						<p className="listMainSubtext">
							Here are the tasks that will you perform in each month of the year
						</p>

						<ul className="CategoryPageDateTypes">
							{this.context.monthlyList.map((month) => (
								<li key={month.id}>
									<h3 className="listTitleName">{month.name}</h3>
									<ul className="CategoryPageEventUl">
										{this.state.events.map((event) => {
											if (event.recurrence_specifics.includes(month.name)) {
												
												return (
													<li key={event.id} className="eventPageListItem">
														<NavLink to={`/Event/${event.id}`} className="event">
															<h3>{event.title}</h3>
														</NavLink>
													</li>
												);
											} else {
												
											}
										})}
									</ul>
								</li>
							))}
						</ul>
					</div>
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
