import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CategoryListNav from "./CategoryListNav";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<CategoryListNav />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
