import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddTask from "./AddTask";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(
		<BrowserRouter>
			<AddTask />
		</BrowserRouter>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
