import React, { Component } from "react";
import DatePicker from "react-datepicker";
import ChoreContext from "../ChoreContext";

export class AddTask extends Component {
	static contextType = ChoreContext;

	render() {
		const { categories = [], startDate, endChecked } = this.context;

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

		return (
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
							selected={startDate}
							onChange={this.context.handleDateSelection}
							id="datePicker"
							disabled={endChecked}
						/>
						<label>
							<input
								type="checkbox"
								className="end_date_never"
								id="end_date_never_checkbox"
								onChange={this.context.validateEndDateNever}
							/>
							Never
						</label>
					</div>
					<div>
						<label htmlFor="categorySelect">Select Routine</label>
						<select
							id="categorySelect"
							name="categoryId"
							onChange={(e) => this.context.updateOption(e.target.value)}
						>
							<option value={null}>...</option>
							{categories.map((category) => (
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
		);
	}
}

export default AddTask;
