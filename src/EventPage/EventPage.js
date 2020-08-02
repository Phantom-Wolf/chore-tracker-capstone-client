import React, { Component } from "react";
import CategoryListNav from "../CategoryListNav/CategoryListNav";

export class EventPage extends Component {
    static defaultProps = {
		match: {
			params: {},
		},
    };
    
    
	render() {
		return (
			<>
				<p className="cat_page_date">{this.context.currentDate}</p>

				<header className="EventPageHeader">
					<h2>Event Specifics</h2>
				</header>
				<nav>
					<CategoryListNav />
                </nav>
                <section>
                <h3></h3>
                <form className = "EventPageEdit">
						<label htmlFor="eventNotes">Notes</label>
						<textarea name="eventNotes" id="eventNotes" rows="5" cols="33" />
				</form>
                </section>
			</>
		);
	}
}

export default EventPage;
