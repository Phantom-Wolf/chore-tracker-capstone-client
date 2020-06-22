import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";

import CategoryListMain from "../CategoryListMain/CategoryListMain";
import Tasks from "../PracticeEntries";
import ChoreContext from "../ChoreContext";
import Register from "../Register/Register";
import Dashboard from "../Dashboard/Dashboard";
import AddTask from "../AddTask/AddTask";
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

	updateOption = (option) => {
		// this.setState({ option: { id: option, touched: true } });
		let Categories = this.state.categories;
		let found = Categories.find((category) => category.id === parseInt(option));
		console.log(found);
	};

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

	// add task form - end date functions

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

	handleDateSelection = (date) => {
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
			startDate: this.state.startDate,
			endChecked: this.state.endChecked,
			deleteTask: this.handleDeleteTask,
			addTask: this.addTask,
			handleDateSelection: this.handleDateSelection,
			validateEndDateNever: this.validateEndDateNever,
			updateOption: this.updateOption,
		};

		console.log("state", this.state);
		return (
			<ChoreContext.Provider value={value}>
				<div className="App">
					<Register />
					<Dashboard />
					<CategoryListMain />
					<AddTask />
				</div>
			</ChoreContext.Provider>
		);
	}
}

export default App;
