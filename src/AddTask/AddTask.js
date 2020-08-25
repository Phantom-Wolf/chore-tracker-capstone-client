import React, { Component } from "react";
import ValidateForm from "../ValidateForm/ValidateForm";
import DatePicker from "react-datepicker";
import ChoreContext from "../ChoreContext";
import TokenService from "../services/token-service";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import config from "../config";
import "./AddTask.css";

export class AddTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskName: {
				value: "",
				touched: false,
			},
			notes: {
				value: "",
				touched: false,
			},
			categorySelect: {
				id: "",
				touched: false,
			},
			startDate: new Date(),
			endDate: {
				value: new Date(),
				touched: false,
			},
			endChecked: false,
			categoryWeekdays: [],
			categoryWeeks: [],
			categoryMonths: [],
			error: null,
			params: {
				title: "",
				notes: "",
				recurrence: "",
				date_created: new Date(),
				date_ended: "",
				recurrence_specifics: "",
			},
		};
	}

	static contextType = ChoreContext;

	// update state

	updateTaskName(taskName) {
		this.setState({ taskName: { value: taskName, touched: true } });
	}

	updateNotes(notes) {
		this.setState({ notes: { value: notes, touched: true } });
	}

	updateEndDate = (date) => {
		this.setState({ endDate: { value: date, touched: true } });
	};

	updateCategorySelect(option) {
		this.setState({
			categorySelect: { id: option, touched: true },
			categoryWeekdays: [],
			categoryWeeks: [],
			categoryMonths: [],
		});
	}

	updateWeekdays(weekday) {
		let categoryDaysArray = this.state.categoryWeekdays;
		if (!categoryDaysArray.includes(weekday)) {
			this.setState({ categoryWeekdays: [...this.state.categoryWeekdays, weekday] });
		} else {
			let filteredDays = categoryDaysArray.filter((option) => option !== weekday);
			this.setState({
				categoryWeekdays: filteredDays,
			});
		}
	}

	updateWeeks(week) {
		let categoryWeeksArray = this.state.categoryWeeks;
		if (!categoryWeeksArray.includes(week)) {
			this.setState({ categoryWeeks: [...this.state.categoryWeeks, week] });
		} else {
			let filteredWeeks = categoryWeeksArray.filter((option) => option !== week);
			this.setState({
				categoryWeeks: filteredWeeks,
			});
		}
	}

	updateMonths(month) {
		let categoryMonthsArray = this.state.categoryMonths;
		if (!categoryMonthsArray.includes(month)) {
			this.setState({ categoryMonths: [...this.state.categoryMonths, month] });
		} else {
			let filteredMonths = categoryMonthsArray.filter((option) => option !== month);
			this.setState({
				categoryMonths: filteredMonths,
			});
		}
	}

	// validation code

	validateTaskName() {
		const taskName = this.state.taskName.value.trim();
		if (taskName.length === 0) {
			return "Task Name is required";
		} else if (taskName.length < 2) {
			return "Task Name must be atleast 2 characters long";
		}
	}

	validateEndDate() {
		let startDate = this.state.startDate;
		let endDate = this.state.endDate.value;
		if (this.state.endChecked === false) {
			if (Date.parse(startDate) > Date.parse(endDate)) {
				return "End date must occur after today's date";
			}
		}
	}

	validateEndDateNever = () => {
		const cb = document.getElementById("end_date_never_checkbox");
		if (cb.checked) {
			this.setState({
				endChecked: true,
				endDate: { value: null, touched: true },
			});
		} else if (!cb.checked && this.state.endDate.value == null) {
			this.setState({
				endChecked: false,
				endDate: { value: new Date(), touched: false },
			});
		} else {
			this.setState({
				endChecked: false,
				endDate: { touched: false },
			});
		}
	};

	validateCategorySelect() {
		const category = this.state.categorySelect.id.trim();
		if (category.length === 0 || category.length === null || category === "...") {
			return "You must choose a valid date category";
		}
	}

	validateDateListSelection() {
		if (
			this.state.categoryWeekdays.length === 0 &&
			this.state.categoryWeeks.length === 0 &&
			this.state.categoryMonths.length === 0 &&
			this.state.categorySelect.id !== "..."
		) {
			return "Please make atleast one selection";
		}
	}

	showCategoryDateList(weekdayList, weeklyList, monthlyList) {
		let htmlOutput = "";
		if (parseInt(this.state.categorySelect.id) === 1) {
			htmlOutput = (
				<ul className="add_task_cat_list1">
					{weekdayList.map((weekday) => (
						<li key={weekday.id}>
							<label>
								<input
									type="checkbox"
									name="addTaskcategoryWeekdays"
									className="add_task_check"
									id="add_task_checkbox_list1"
									value={weekday.name}
									onChange={(e) => this.updateWeekdays(e.target.value)}
								/>
								{weekday.name}
							</label>
						</li>
					))}
				</ul>
			);
		} else if (parseInt(this.state.categorySelect.id) === 2) {
			htmlOutput = (
				<ul className="add_task_cat_list2">
					{weeklyList.map((week) => (
						<li key={week.id}>
							<label>
								<input
									type="checkbox"
									className="add_task_check"
									name="addTaskcategoryWeeks"
									id="add_task_checkbox_list2"
									value={week.name}
									onChange={(e) => this.updateWeeks(e.target.value)}
								/>
								{week.name}
							</label>
						</li>
					))}
				</ul>
			);
		} else if (parseInt(this.state.categorySelect.id) === 3) {
			htmlOutput = (
				<ul className="add_task_cat_list3">
					{monthlyList.map((month) => (
						<li key={month.id}>
							<label>
								<input
									type="checkbox"
									className="add_task_check"
									name="addTaskcategoryMonths"
									id="add_task_checkbox_list1"
									value={month.name}
									onChange={(e) => this.updateMonths(e.target.value)}
								/>
								{month.name}
							</label>
						</li>
					))}
				</ul>
			);
		}
		return <div className="add_task_cat_section">{htmlOutput}</div>;
	}

	// formatQueryParams(params) {
	// 	const queryItems = Object.keys(params).map(
	// 		(key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
	// 	);
	// 	return queryItems.join("&");
	// }

	handleTaskSubmit = (e) => {
		e.preventDefault();
		//create an object to store the search filters
		const data = {};

		//get all the from data from the form component
		const formData = new FormData(e.target);
		data.addTaskcategoryWeeks = [];
		data.addTaskcategoryWeekdays = [];
		data.addTaskcategoryMonths = [];
		//for each of the keys in form data populate it with form value ***************
		for (let value of formData) {
			if (value[0] === "addTaskcategoryWeeks") {
				data.addTaskcategoryWeeks.push(value[1]);
			} else if (value[0] === "addTaskcategoryWeekdays") {
				data.addTaskcategoryWeekdays.push(value[1]);
			} else if (value[0] === "addTaskcategoryMonths") {
				data.addTaskcategoryMonths.push(value[1]);
			} else {
				data[value[0]] = value[1];
			}
		}

		let specificsOutput = "";

		if (data.addTaskcategoryWeeks.length !== 0) {
			specificsOutput = JSON.stringify(data.addTaskcategoryWeeks);
		} else if (data.addTaskcategoryWeekdays.length !== 0) {
			specificsOutput = JSON.stringify(data.addTaskcategoryWeekdays);
		} else {
			specificsOutput = JSON.stringify(data.addTaskcategoryMonths);
		}

		let stateData = {
			title: data.addTaskName,
			notes: data.addTaskNotes,
			recurrence: data.addTaskCategorySelect,
			date_created: new Date(),
			date_ended: data.addTaskEndDate,
			recurrence_specifics: specificsOutput,
		};
		console.log("stateDate", stateData);

		//assigning the object from the form data to params in the state

		this.setState({ params: stateData });

		fetch(`${config.API_ENDPOINT}/api/events`, {
			method: "POST",
			body: JSON.stringify(stateData),
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				// ... convert it to json
				return res.json();
			})
			// use the json api output
			.then((data) => {
				// check if there are no results
				if (data.totalItems === 0) {
					throw new Error("No data found");
				}
				window.location = "/home";
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
			});
	};

	disableKeyboard = () => {
		if (window.innerWidth < 1100) {
			return (
				<DatePicker
					disabledKeyboardNavigation
					id="datePicker"
					name="addTaskEndDate"
					selected={this.state.endDate.value}
					onChange={this.updateEndDate}
					disabled={this.state.endChecked}
				/>
			);
		} else {
			return (
				<DatePicker
					id="datePicker"
					name="addTaskEndDate"
					selected={this.state.endDate.value}
					onChange={this.updateEndDate}
					disabled={this.state.endChecked}
				/>
			);
		}
	};

	render() {
		// import selected context values
		const { categories = [], weekdayList = [], weeklyList = [], monthlyList = [] } = this.context;

		return (
			<section className="addTask">
				<p className="cat_page_date">{this.context.currentDate}</p>
				<header className="AddTaskHeader">
					<h2>Add a Task</h2>
				</header>
				<nav>
					<CategoryListNav />
				</nav>
				<form className="addTaskForm" onSubmit={this.handleTaskSubmit}>
					<div>
						<label htmlFor="taskName">Task Name</label>
						<input
							type="text"
							name="addTaskName"
							className="addTaskName"
							id="taskName"
							onChange={(e) => this.updateTaskName(e.target.value)}
						/>
						{this.state.taskName.touched && <ValidateForm message={this.validateTaskName()} />}
					</div>
					<div>
						<label htmlFor="addTaskNotes">Notes</label>
						<textarea
							name="addTaskNotes"
							id="addTaskNotes"
							placeholder="Add any relevant and detailed instructions here."
							rows="5"
							cols="33"
						/>
					</div>
					<div>
						<label htmlFor="datePicker">Pick End Date</label>
						{this.disableKeyboard()}
						<label>
							<input
								type="checkbox"
								className="end_date_never"
								name="addTaskEndDateNever"
								id="end_date_never_checkbox"
								onChange={this.validateEndDateNever}
							/>
							Never
						</label>
						{this.state.endDate.touched && <ValidateForm message={this.validateEndDate()} />}
					</div>
					
						<p className="catDescription">
							You can choose how often you want your tasks to repeat; whether by weekdays, weeks of
							the month, or by the month.
						</p>
						<label htmlFor="categorySelect">Select Routine</label>
						<select
							id="categorySelect"
							name="addTaskCategorySelect"
							onChange={(e) => this.updateCategorySelect(e.target.value)}
						>
							<option value={null}>...</option>
							{categories.map((category) => (
								<option key={category.id} value={category.id}>
									{category.title}
								</option>
							))}
						</select>
						{this.state.categorySelect.touched && (
							<ValidateForm message={this.validateCategorySelect()} />
						)}
					
					{this.showCategoryDateList(weekdayList, weeklyList, monthlyList)}
					{this.state.categorySelect.touched && (
						<ValidateForm message={this.validateDateListSelection()} />
					)}
					<div>
						<button
							type="submit"
							disabled={
								this.validateTaskName() ||
								this.validateEndDate() ||
								this.validateCategorySelect() ||
								this.validateDateListSelection()
							}
						>
							Add Task
						</button>
					</div>
				</form>
			</section>
		);
	}
}

export default AddTask;
