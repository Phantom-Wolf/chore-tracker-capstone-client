import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import CategoryListMain from "../CategoryListMain/CategoryListMain";
import ChoreContext from "../ChoreContext";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import AddTask from "../AddTask/AddTask";
import EventPage from "../EventPage/EventPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "react-datepicker/dist/react-datepicker.css";
import { weekdayList, weeklyList, monthlyList } from "../STORE";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";

function getWeekOfMonth(date) {
	const startWeekDayIndex = 0; // 1 MonthDay 0 Sundays
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
			new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" })).getDay()
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
				subText: "Here are the tasks that you will perform each day of the week",
				dateType: `(${weekday})`,
			},
			{
				id: 2,
				title: "Weekly",
				subText: "Here are the tasks that you will perform each week of the month",
				dateType: ` (Week ${weekOfMonth} of the Month)`,
			},
			{
				id: 3,
				title: "Monthly",
				subText: "Here are the tasks that will you perform each month of the year",
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

	// routing
	renderMainRoutes() {
		return (
			<Switch>
				<PrivateRoute exact path="/" component={LandingPage} />
				<PublicOnlyRoute path="/Landing" component={LandingPage} />
				<PublicOnlyRoute path="/Login" component={Login} />
				<PrivateRoute path="/Home" component={Dashboard} />
				<PrivateRoute path="/Category/:category" component={CategoryListMain} />
				<PrivateRoute path="/Event/:event_id" component={EventPage} />
				<PrivateRoute path="/AddTask" component={AddTask} />
				<PrivateRoute component={NotFoundPage} />
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
		let date1 = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
		let date2 = new Date(date1);
		const dateTimeFormat3 = new Intl.DateTimeFormat({ timeZone: "America/Chicago" }, options1);

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
			handleDateSelection: this.handleDateSelection,
			weekdayList: weekdayList,
			weeklyList: weeklyList,
			monthlyList: monthlyList,
			currentDate: dateTimeFormat3.format(date2),
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
