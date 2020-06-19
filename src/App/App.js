import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import CategoryListMain from "../CategoryListMain/CategoryListMain";
import Tasks from "../PracticeEntries";
import ChoreContext from "../ChoreContext";
import Categories from "../STORE";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Date.prototype.getWeekOfMonth = function (exact) {
	let month = this.getMonth(),
		year = this.getFullYear(),
		firstWeekday = new Date(year, month, 1).getDay(),
		lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
		offsetDate = this.getDate() + firstWeekday - 1,
		index = 1, // start index at 0 or 1, your choice
		weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7),
		week = index + Math.floor(offsetDate / 7);
	if (exact || week < 2 + index) return week;
	return week === weeksInMonth ? index + 5 : week;
};

export class App extends Component {
	state = {
		categories: [],
		tasks: [],
		error: [],
		weekday: null,
		day: null,
		weekOfMonth: null,
		month: null,
		monthNumber: null,
		year: null,
		option: {
			id: "",
			touched: false,
			visible: "none",
		},
		startDate: new Date(),
		endChecked: false,
	};

	componentDidMount() {
		// additions of the date to the state

		let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
			new Date().getDay()
		];

		let dateDay = new Date().getDate();

		let weekOfMonth = new Date().getWeekOfMonth();

		let month = [
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
		][new Date().getMonth()];

		let monthNumber = new Date().getMonth() + 1;

		let year = new Date().getFullYear();

		const categories = [
			{
				id: 1,
				title: "Weekdays",
				subText: "(Sunday through Saturday)",
				dateType: `(${weekday})`,
			},
			{
				id: 2,
				title: "Weekly",
				subText: "(Weeks 1-5)",
				dateType: ` (Week ${weekOfMonth} of the Month)`,
			},
			{
				id: 3,
				title: "Monthly",
				subText: "(January through December)",
				dateType: `(${month})`,
			},
		];

		this.setState({
			categories,
			weekday,
			month,
			day: dateDay,
			monthNumber,
			year,
			weekOfMonth,
		});
	}

	updateOption(option) {
		// this.setState({ option: { id: option, touched: true } });
		let Categories = this.state.categories;
		let found = Categories.find((category) => category.id === parseInt(option));
		console.log(found);
	}

	handleDeleteTask = (taskId) => {
		this.setState({
			tasks: this.state.tasks.filter((task) => task.id !== parseInt(taskId)),
		});
	};

	addTask = (task) => {
		this.setState({
			tasks: [...this.state.tasks, task],
		});
	};

	// add task - end date functions

	validateEndDateNever = () => {
		const cb = document.getElementById("end_date_never_checkbox");
		if (cb.checked) {
			this.setState({
				endChecked: true,
			});
		} else {
			this.setState({
				endChecked: false,
			});
		}
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
		});
	};

	render() {
		const options1 = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			week: "numeric",
		};
		let date1 = new Date();
		const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);
		console.log(dateTimeFormat3.format(date1));

		// lists for addTask form
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

		// values for context provider
		const value = {
			tasks: this.state.tasks,
			categories: this.state.categories,
			weekday: this.state.weekday,
			day: this.state.day,
			weekOfMonth: this.state.weekOfMonth,
			month: this.state.month,
			monthNumber: this.state.monthNumber,
			year: this.state.year,
			deleteTask: this.handleDeleteTask,
			addTask: this.addTask,
		};
		console.log("state", this.state);
		return (
			<ChoreContext.Provider value={value}>
				<div className="App">
					<section className="loginForm">
						<header>
							<h1>Title</h1>
						</header>
						<h3 className="subTitle">NEVER FALL BEHIND AGAIN</h3>

						<form className="signUpForm">
							<div>
								<label htmlFor="email">Email:</label>
								<input type="email" className="signUpEmail" id="email" />
							</div>
							<div>
								<label htmlFor="password">Password:</label>
								<input type="text" className="signUpPassword" id="password" />
							</div>
							<div>
								<label htmlFor="confirmPass">Confirm Password:</label>
								<input type="text" className="signUpConfirmPass" id="confirmPass" />
							</div>
							<div>
								<button type="submit" disabled>
									Sign-Up
								</button>
								<button disabled>Login</button>
							</div>
						</form>
					</section>
					<section className="homePage">
						<header>
							<h1>
								<Link to="/" className="title">
									Title
								</Link>
							</h1>
						</header>
						<nav>
							<CategoryListNav />
						</nav>
						<main>
							<CategoryListMain />
							<section className="CategoryPage">
								<header className="CategoryPageHeader">
									<h2>Weekdays</h2>
									<p>It is currently {this.state.weekday}</p>
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
									<p>It is currently Week {this.state.weekOfMonth} of the Month</p>
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
									<p>It is currently {this.state.month}</p>
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
							<section className="addTask">
								<header className="AddTaskHeader">
									<h2>Add a Task</h2>
								</header>
								<form className="addTaskForm">
									<div>
										<label htmlFor="taskName">Task Name</label>
										<input type="text" className="addTaskName" id="taskName" />
									</div>
									<div>
										<label htmlFor="addTaskNotes">Notes</label>
										<textarea name="content" id="addTaskNotes" rows="5" cols="33" />
									</div>
									<div>
										<label htmlFor="datePicker">Pick End Date</label>
										<DatePicker
											selected={this.state.startDate}
											onChange={this.handleChange}
											id="datePicker"
											disabled={this.state.endChecked}
										/>
										<label>
											<input
												type="checkbox"
												className="end_date_never"
												id="end_date_never_checkbox"
												onChange={this.validateEndDateNever}
											/>
											Never
										</label>
									</div>
									<div>
										<label htmlFor="categorySelect">Select Routine</label>
										<select
											id="categorySelect"
											name="categoryId"
											onChange={(e) => this.updateOption(e.target.value)}
										>
											<option value={null}>...</option>
											{this.state.categories.map((category) => (
												<option key={category.id} value={category.id}>
													{category.title}
												</option>
											))}
										</select>
									</div>
									<div className="add_task_cat_section">
										<ul className="add_task_cat_list">
											{weekdayList.map((weekday) => (
												<li>
													<label>
														<input
															type="checkbox"
															className="add_task_check"
															id="add_task_checkbox_list"
															value={weekday}
														/>
														{weekday}
													</label>
												</li>
											))}
										</ul>
										<ul className="add_task_cat_list">
											{weeklyList.map((week) => (
												<li>
													<label>
														<input
															type="checkbox"
															className="add_task_check"
															id="add_task_checkbox_list"
															value={week}
														/>
														{week}
													</label>
												</li>
											))}
										</ul>
										<ul className="add_task_cat_list">
											{monthlyList.map((month) => (
												<li>
													<label>
														<input
															type="checkbox"
															className="add_task_check"
															id="add_task_checkbox_list"
															value={month}
														/>
														{month}
													</label>
												</li>
											))}
										</ul>
									</div>
								</form>
							</section>
						</main>
					</section>
				</div>
			</ChoreContext.Provider>
		);
	}
}

export default App;
