import React, { Component } from "react";
import "./App.css";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import TokenService from "../services/token-service";
import CategoryListMain from "../CategoryListMain/CategoryListMain";
import ChoreContext from "../ChoreContext";
import LandingPage from "../LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";
import AddTask from "../AddTask/AddTask";
import "react-datepicker/dist/react-datepicker.css";
import { weekdayList, weeklyList, monthlyList } from "../STORE";

// Date.prototype.getWeekOfMonth = function (exact) {
// 	let month = this.getMonth(),
// 		year = this.getFullYear(),
// 		firstWeekday = new Date(year, month, 1).getDay(),
// 		lastDateOfMonth = new Date(year, month + 1, 0).getDate(),
// 		offsetDate = this.getDate() + firstWeekday - 1,
// 		index = 1, // start index at 0 or 1, your choice
// 		weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7),
// 		week = index + Math.floor(offsetDate / 7);
// 	if (exact || week < 2 + index) return week;
// 	return week === weeksInMonth ? index + 5 : week;
// };
function getWeekOfMonth(date) {
	const startWeekDayIndex = 1; // 1 MonthDay 0 Sundays
	const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
	const firstDay = firstDate.getDay();

	let weekNumber = Math.ceil((date.getDate() + firstDay) / 7);
	if (startWeekDayIndex === 1) {
		if (date.getDay() === 0 && date.getDate() > 1) {
			weekNumber -= 1;
		}

		if (firstDate.getDate() === 1 && firstDay === 0 && date.getDate() > 1) {
			weekNumber += 1;
		}
	}
	return weekNumber;
}

export class App extends Component {
	state = {
		categories: [],
		tasks: [],
		events: [],
		error: [],
		weekday: null,
		day: null,
		weekOfMonth: null,
		firstOfWeekDate: null,
		lastOfWeekDate: null,
		month: null,
		monthNumber: null,
		year: null,
	};

	componentDidMount() {
		// additions of the date to the state

		let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
			new Date().getDay()
		];
		let dateDay = new Date().getDate();
		let weekOfMonth = getWeekOfMonth(new Date());
		let curr = new Date();
		let first = curr.getDate() - curr.getDay();
		let last = first + 6;
		let firstOfWeekDate = new Date(new Date(curr).setDate(first)).toUTCString();
		let lastOfWeekDate = new Date(new Date(curr).setDate(last)).toUTCString();
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
			firstOfWeekDate,
			lastOfWeekDate,
		});
	}

	handleDeleteTask = (taskId) => {
		this.setState({
			tasks: this.state.tasks.filter((task) => task.id !== parseInt(taskId)),
		});
	};

	handleGrabEvents = (events) => {
		this.setState({ events });
	};

	handleGrabTasks = (taskList) => {
		this.setState({ tasks: taskList });

		if (this.state.tasks.length !== 0) {
			let newTaskList = [];
			this.state.tasks.map((task) => {
				task.date_of_task = new Date(task.date_of_task);
				// grab event object from state by given ID in task object
				let taskEventSharedMatch = this.state.events.find(
					(event) => parseInt(event.id) === parseInt(task.event_id)
				);
				// grab category number from reccurence property
				let taskEventCategory = parseInt(taskEventSharedMatch.recurrence);
				// translate category number to corresponding text

				console.log("task recurrence", taskEventCategory);
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
	};

	// alterTaskList = (taskList) => {
	// 	let newTaskList = [];
	// 	this.state.tasks.map((task) => {
	// 		task.date_of_task = new Date(task.date_of_task);
	// 		// grab event object from state by given ID in task object
	// 		let taskEventSharedMatch = this.state.events.find(
	// 			(event) => parseInt(event.id) === parseInt(task.event_id)
	// 		);
	// 		// grab category number from reccurence property
	// 		let taskEventCategory = parseInt(taskEventSharedMatch.recurrence);
	// 		// translate category number to corresponding text

	// 		console.log("task recurrence", taskEventCategory);
	// 		if (taskEventCategory === 1) {
	// 			taskEventCategory = "Weekdays";
	// 		} else if (taskEventCategory === 2) {
	// 			taskEventCategory = "Weekly";
	// 		} else {
	// 			taskEventCategory = "Monthly";
	// 		}
	// 		// create new object with category value
	// 		let taskCategory = {
	// 			taskCat: taskEventCategory,
	// 			taskTitle: taskEventSharedMatch.title,
	// 		};

	// 		// push object with new value into existing task
	// 		let newTask = Object.assign(task, taskCategory);
	// 		// push updated task into a new task list
	// 		newTaskList.push(newTask);
	// 	});
	// 	return newTaskList;
	// };

	// routing
	renderMainRoutes() {
		return (
			<Switch>
				<Route path="/login" component={LandingPage} />
				<Route path="/Home" component={Dashboard} />
				<Route path="/Category/:category" component={CategoryListMain} />
				<Route path="/AddTask" component={AddTask} />
			</Switch>
		);
	}

	render() {
		//full date format
		const options1 = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			week: "numeric",
		};
		let date1 = new Date();
		const dateTimeFormat3 = new Intl.DateTimeFormat("en-US", options1);

		// values for context provider
		const value = {
			tasks: this.state.tasks,
			events: this.state.events,
			categories: this.state.categories,
			weekday: this.state.weekday,
			day: this.state.day,
			weekOfMonth: this.state.weekOfMonth,
			firstOfWeekDate: this.state.firstOfWeekDate,
			lastOfWeekDate: this.state.lastOfWeekDate,
			month: this.state.month,
			monthNumber: this.state.monthNumber,
			year: this.state.year,
			startDate: this.state.startDate,
			endChecked: this.state.endChecked,
			deleteTask: this.handleDeleteTask,
			grabTasks: this.handleGrabTasks,
			grabEvents: this.handleGrabEvents,
			handleDateSelection: this.handleDateSelection,
			validateEndDateNever: this.validateEndDateNever,
			weekdayList: weekdayList,
			weeklyList: weeklyList,
			monthlyList: monthlyList,
		};

		return (
			<ChoreContext.Provider value={value}>
				<div className="App">
					<main>{this.renderMainRoutes()}</main>
				</div>
			</ChoreContext.Provider>
		);
	}
}

export default App;
// {TokenService.hasAuthToken() ? console.log("hello") : <Redirect to="/login" />}
