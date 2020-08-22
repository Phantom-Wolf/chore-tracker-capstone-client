import React, { Component } from "react";
import "./NotFoundPage.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import ChoreContext from "../ChoreContext";

export class NotFoundPage extends Component {
	static contextType = ChoreContext;
	render() {
		return (
			<div className="NotFound">
				<p className="cat_page_date">{this.context.currentDate}</p>
				<header>
					<h2>404 Not Found</h2>
				</header>
				<nav>
					<CategoryListNav />
				</nav>
				<p>
					Opps! Looks like we got lost. No worries, press any link on the navigation bar to get back
					on track.
				</p>
			</div>
		);
	}
}

export default NotFoundPage;
