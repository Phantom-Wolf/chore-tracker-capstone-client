import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CategoryListMain from "./CategoryListMain";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<CategoryListMain />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
