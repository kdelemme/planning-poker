import React, { Component } from "react";
import ReactDOM from "react-dom";
import { configureUrlQuery } from "react-url-query";

import App from "./App";
import history from "./history";

configureUrlQuery({ history });

ReactDOM.render(<App />, document.getElementById("root"));
