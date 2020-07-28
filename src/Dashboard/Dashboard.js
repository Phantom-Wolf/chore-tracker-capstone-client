import React, { Component } from "react";
import "./Dashboard.css";
import config from "../config";
import TokenService from "../services/token-service";
import ChoreContext from "../ChoreContext";
import CategoryListNav from "../CategoryListNav/CategoryListNav";

export class CategoryListMain extends Component {
	state = {
		tasks: [],
	};

	static contextType = ChoreContext;

	componentDidMount() {
		fetch(`${config.API_ENDPOINT}/api/events`, {
			method: "GET",
			headers: { authorization: `bearer ${TokenService.getAuthToken()}` },
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				return res.json();
			})
			.then((res) => {
				console.log("Events List", res);
				this.context.grabEvents(res);

				this.context.events.map((event) => {
					let event_id = event.id;

					fetch(`${config.API_ENDPOINT}/api/tasks/tasker/${event_id}`, {
						method: "GET",
						headers: {},
					})
						.then((res) => {
							if (!res.ok) {
								throw new Error("Something went wrong, please try again later.");
							}
							return res.json();
						})
						// use the json api output
						.then((data) => {
							// read existing tasks from the state
							let existingTasks = this.state.tasks;

							// update state with new data pushed into existing tasks
							this.setState({
								tasks: existingTasks.concat(data),
							});
							this.context.grabTasks(this.state.tasks);
						})
						.catch((err) => {
							this.setState({
								error: err.message,
							});
						});
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const { categories = [], tasks = [] } = this.context;
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
				<nav>
					<CategoryListNav />
				</nav>

				<ul className="CategoryListMain_List">
					{categories.map((category) => (
						<li key={category.id}>
							<section className="CategorySection">
								<h3>
									{category.title} <span className="subText">{category.dateType}</span>
								</h3>
								<ul>
									{tasks.map((task) => {
										if (
											category.title === "Weekdays" &&
											task.taskCat === category.title &&
											parseInt(task.date_of_task.getDate()) === parseInt(this.context.day)
										) {
											return <li key={task.id}>{task.taskTitle} </li>;
										} else if (
											category.title === "Monthly" &&
											task.taskCat === category.title &&
											parseInt(task.date_of_task.getMonth() + 1) ===
												parseInt(this.context.monthNumber) &&
											parseInt(task.date_of_task.getFullYear()) === parseInt(this.context.year)
										) {
											return <li key={task.id}>{task.taskTitle} </li>;
										} else if (
											category.title === "Weekly" &&
											task.taskCat === category.title &&
											task.task_recurrence_specifics.includes(this.context.weekOfMonth) &&
											parseInt(task.date_of_task.getMonth() + 1) ===
												parseInt(this.context.monthNumber) &&
											parseInt(task.date_of_task.getFullYear()) === parseInt(this.context.year)
										) {
											return <li key={task.id}>{task.taskTitle} </li>;
										}
										
									})}
								</ul>
							</section>
						</li>
					))}
				</ul>
			</section>
		);
	}
}

export default CategoryListMain;
