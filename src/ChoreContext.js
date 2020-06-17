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
	deleteTask: () => {},
	addTask: () => {},
	editTask: () => {},
});

export default ChoreContext;
