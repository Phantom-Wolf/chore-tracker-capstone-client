import React from "react";

const ChoreContext = React.createContext({
	tasks: [],
	events: [],
	categories: [],
	day: null,
	weekday: null,
	weekOfMonth: null,
	firstOfWeekDate: null,
	lastOfWeekDate: null,
	month: null,
	monthNumber: null,
	year: null,
	startDate: null,
	endChecked: null,
	handleDateSelection: () => {},
	weekdayList: [],
	weeklyList: [],
	monthlyList: [],
	currentDate: null,
});

export default ChoreContext;
