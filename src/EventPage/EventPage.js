import React, { Component } from "react";
import "./EventPage.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
// import ValidateForm from "../ValidateForm/ValidateForm";
import TokenService from "../services/token-service";
import config from "../config";
import ChoreContext from "../ChoreContext";

export class EventPage extends Component {
	state = {
		event: {},
		notes: "",
		touched: false,
		recurrence: "",
		error: "",
		id: "",
	};

	static defaultProps = {
		match: {
			params: {},
		},
	};
	static contextType = ChoreContext;

	componentDidMount() {
		let id = this.props.match.params.event_id;
		this.setState({ id: id });
		fetch(`${config.API_ENDPOINT}/api/events/${id}`, {
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
					event: res,
					notes: res.notes,
					recurrence: res.recurrence_specifics,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// page render methods

	renderCategory() {
		let htmlOutput;
		let event = this.state.event;
		if (parseInt(event.recurrence) === 1) {
			htmlOutput = "Weekdays";
		} else if (parseInt(event.recurrence) === 2) {
			htmlOutput = "Weekly";
		} else {
			htmlOutput = "Monthly";
		}
		return htmlOutput;
	}

	renderRecurrence() {
		let event = this.state.recurrence;
		let newArray = [];
		if (event != 0) {
			event.map((e) => {
				newArray.push(e);
			});
		}
		let newString = newArray.join(", ");

		return newString;
	}

	renderEndDate = () => {
		let event = this.state.event;
		if (event.date_ended != null) {
			let newDate = new Date(event.date_ended).toLocaleDateString();
			return newDate;
		} else {
			let newString = "Never";
			return newString;
		}
	};

	// update notes

	updateNotes = (notes) => {
		this.setState({
			notes: notes,
			touched: true,
		});
	};

	// validation

	// functionality removed until knex .update bug repaired

	// validatePatchNotes() {
	// 	if (this.state.notes === this.state.event.notes) {
	// 		return "No change in notes detected";
	// 	}
	// }

	// submissions

	// functionality removed until knex .update bug repaired

	// handlePatch = (e) => {
	// 	e.preventDefault();
	// 	console.log("patch");
	// 	console.log(e.value);
	// 	let data = {};
	// 	const formData = new FormData(e.target);
	// 	for (let value of formData) {
	// 		data[value[0]] = value[1];
	// 	}
	// 	console.log(data.eventNotes);
	// 	let stateData = {
	// 		user_id: this.state.event.user_id,
	// 		title: this.state.event.title,
	// 		notes: data.eventNotes,
	// 		recurrence: this.state.event.recurrence,
	// 		date_created: this.state.event.date_created,
	// 		date_ended: this.state.event.date_ended,
	// 		recurrence_specifics: this.state.event.recurrence_specifics,
	// 	};
	// 	console.log("stateDate", stateData);
	// 	fetch(`${config.API_ENDPOINT}/api/events/${parseInt(this.state.id)}`, {
	// 		method: "PATCH",
	// 		body: JSON.stringify(stateData),
	// 		headers: {
	// 			"content-type": "application/json",
	// 			authorization: `bearer ${TokenService.getAuthToken()}`,
	// 		},
	// 	})
	// 		.then((eventRes) => {
	// 			if (!eventRes.ok) {
	// 				console.log(eventRes.error.message);
	// 				throw new Error("Something went wrong, please try again later.");
	// 			}
	// 			console.log(eventRes.json());
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	handleDelete = () => {
		let submitData = parseInt(this.state.id);

		fetch(`${config.API_ENDPOINT}/api/events/${submitData}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Something went wrong, please try again later.");
				}
				window.location = "/home";
			})
			.catch((err) => {
				this.setState({
					error: err.message,
				});
				console.log(this.state.error);
			});
	};

	render() {
		return (
			<div className="EventDetails">
				<p className="cat_page_date">{this.context.currentDate}</p>

				<header className="EventPageHeader">
					<h2>Task Details</h2>
				</header>
				<nav>
					<CategoryListNav />
				</nav>
				<section className="eventSection">
					<h3>{this.state.event.title}</h3>
					<p>
						<span>Date Created: </span>
						{new Date(this.state.event.date_created).toLocaleDateString()}
					</p>
					<p>
						<span>End Date: </span>
						{this.renderEndDate()}
					</p>
					<p>
						<span>Category: </span>
						{this.renderCategory()}
					</p>
					<p>
						<span>Recurrence: </span>
						{this.renderRecurrence()}
					</p>
					<p>
						<span>Notes: </span>
						{this.state.event.notes}
					</p>
					<form className="EventPageEdit" onSubmit={this.handlePatch}>
						
							<button type="button" onClick={this.handleDelete}>
								Delete
							</button>
						
					</form>
					<div></div>
				</section>
			</div>
		);
	}
}

export default EventPage;

// ********** had to remove patch functionality until programmers who maintenance knex fixes .update in the back end.
// it replaces the array brackets in the database into object brackets in database, which invalidates the code. **********

// <label htmlFor="eventNotes">Notes</label>
// <textarea
// 	name="eventNotes"
// 	id="eventNotes"
// 	value={this.state.notes}
// 	rows="5"
// 	cols="33"
// 	onChange={(e) => this.updateNotes(e.target.value)}
// />
// {this.state.touched && <ValidateForm message={this.validatePatchNotes()} />}

// <button type="submit" disabled={this.validatePatchNotes()}>
// 		Update Notes
// </button>
