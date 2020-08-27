import React, { Component } from "react";
import "./NotFoundPage.css";
import CategoryListNav from "../CategoryListNav/CategoryListNav";
import ChoreContext from "../ChoreContext";
import error404 from "../error404.jpg"

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
				<div className="notFoundBody">
				<img className="errorImg" src={error404} alt="error comic meme"/> 
				</div>
			</div>
		);
	}
}

export default NotFoundPage;
