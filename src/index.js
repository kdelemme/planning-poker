import React from "react";
import ReactDOM from "react-dom";
import { configureUrlQuery } from "react-url-query";

import App from "./components/App";
import history from "./history";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

configureUrlQuery({ history });

ReactDOM.render(<App />, document.getElementById("root"));
