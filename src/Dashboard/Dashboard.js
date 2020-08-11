import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import config from "../config";
import TokenService from "../services/token-service";
import ChoreContext from "../ChoreContext";
import CategoryListNav from "../CategoryListNav/CategoryListNav";

export class CategoryListMain extends Component {
	state = {
		events: [],
		tasks: [],
	};

	static contextType = ChoreContext;

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
				console.log("Events List", res);
				this.setState({
					events: res,
				});

				this.state.events.map((event) => {
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
							this.updateTaskList();
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

	updateTaskList() {
		if (this.state.tasks.length !== 0) {
			let newTaskList = [];
			this.state.tasks.map((task) => {
				task.date_of_task = new Date(new Date(task.date_of_task).toDateString());

				// grab event object from state by given ID in task object
				let taskEventSharedMatch = this.state.events.find(
					(event) => parseInt(event.id) === parseInt(task.event_id)
				);
				// grab category number from reccurence property
				let taskEventCategory = parseInt(taskEventSharedMatch.recurrence);
				// translate category number to corresponding text
				if (taskEventCategory === 1) {
					taskEventCategory = "Weekdays";
				} else if (taskEventCategory === 2) {
					taskEventCategory = "Weekly";
				} else {
					taskEventCategory = "Monthly";
				}
				// create new object with category value
				let taskCategory = {
					taskCat: taskEventCategory,
					taskTitle: taskEventSharedMatch.title,
					task_recurrence_specifics: taskEventSharedMatch.recurrence_specifics,
				};

				// push object with new value into existing task
				let newTask = Object.assign(task, taskCategory);
				// push updated task into a new task list
				newTaskList.push(newTask);
			});
			// push updated task list into state
			this.setState({
				tasks: newTaskList,
			});
		}
	}

	updateCheckStatus = (e) => {
		console.log(e);
		let taskObject = this.state.tasks.find((task) => parseInt(task.id) === parseInt(e));
		console.log(taskObject);
		let stateData = {
			event_id: taskObject.event_id,
			date_of_task: taskObject.date_of_task,
			task_status: !taskObject.task_status,
			task_completion_date: taskObject.task_completion_date,
		};
		console.log("stateDate", stateData);
		fetch(`${config.API_ENDPOINT}/api/tasks/${parseInt(e)}`, {
			method: "PATCH",
			body: JSON.stringify(stateData),
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((TaskRes) => {
				if (!TaskRes.ok) {
					console.log(TaskRes.error.message);
					throw new Error("Something went wrong, please try again later.");
				}

				window.location = "/home";
			})
			.catch((err) => {
				console.log(err);
			});
	};

	statusCheck = (task) => {
		let htmlOutput = "";
		if (task.task_status) {
			htmlOutput = (
				<input
					type="checkbox"
					className="complete_task"
					name="taskCompletion"
					id={task.id}
					defaultChecked
					value={task.id}
					onClick={(e) => this.updateCheckStatus(e.target.value)}
				/>
			);
		} else {
			htmlOutput = (
				<input
					type="checkbox"
					className="complete_task"
					name="taskCompletion"
					id={task.id}
					value={task.id}
					onClick={(e) => this.updateCheckStatus(e.target.value)}
				/>
			);
		}
		return htmlOutput;
	};

	render() {
		const { categories = [] } = this.context;
		const tasks = this.state.tasks;

		return (
			<section className="CategoryListMain">
				<p className="cat_page_date">{this.context.currentDate}</p>
				<header>
					<h2 className="dashboard">Dashboard</h2>
				</header>
				<nav>
					<CategoryListNav />
				</nav>
				<p className="dashSubtext">Here are the current tasks that need to be completed</p>
				<ul className="CategoryListMain_List">
					{categories.map((category) => (
						<li key={category.id}>
							<section className="CategorySection">
								<h3 className="listTitleNameDash">{category.title}</h3>
								<p className="subText">{category.dateType}</p>
								<ul className="dashTaskul">
									{tasks.map((task) => {
										if (
											category.title === "Weekdays" &&
											task.taskCat === category.title &&
											parseInt(task.date_of_task.getDate()) === parseInt(this.context.day) &&
											task.date_of_task.getMonth() + 1 === this.context.monthNumber
										) {
											return (
												<li key={task.id} className="dashTask">
													<NavLink to={`/Event/${task.event_id}`} className="task">
														<h3>{task.taskTitle}</h3>
													</NavLink>
													<form id={task.id} className="taskItemForm">
														<span>Completed? {this.statusCheck(task)}</span>
													</form>
												</li>
											);
										} else if (
											category.title === "Monthly" &&
											task.taskCat === category.title &&
											task.date_of_task.getMonth() + 1 === this.context.monthNumber &&
											task.date_of_task.getFullYear() === this.context.year
										) {
											return (
												<li key={task.id} className="dashTask">
													<NavLink to={`/Event/${task.event_id}`} className="task">
														<h3>{task.taskTitle}</h3>
													</NavLink>
													<form id={task.id} className="taskItemForm">
														<span>Completed? {this.statusCheck(task)}</span>
													</form>
												</li>
											);
										} else if (
											category.title === "Weekly" &&
											task.taskCat === category.title &&
											task.date_of_task >= new Date(this.context.firstOfWeekDate) &&
											task.date_of_task <= new Date(this.context.lastOfWeekDate)
										) {
											return (
												<li key={task.id} className="dashTask">
													<NavLink to={`/Event/${task.event_id}`} className="task">
														<h3>{task.taskTitle}</h3>
													</NavLink>
													<form id={task.id} className="taskItemForm">
														<span>Completed? {this.statusCheck(task)}</span>
													</form>
												</li>
											);
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
// <p className="dashboardDate">{dateTimeFormat3.format(date1)}</p>
