import React from "react";

const ChoreContext = React.createContext({
	tasks: [],
	categories: [],
	day: null,
	weekday: null,
	weekOfMonth: null,
	month: null,
	monthNumber: null,
	year: null,
	startDate: null,
	endChecked: null,
	deleteTask: () => {},
	addTask: () => {},
	editTask: () => {},
	handleDateSelection: () => {},
	validateEndDateNever: () => {},
	updateOption: () => {},
	weekdayList: [],
	weeklyList: [],
	monthlyList: [],
});

export default ChoreContext;
