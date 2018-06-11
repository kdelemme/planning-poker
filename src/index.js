import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { configureUrlQuery, addUrlProps, replaceInUrlQuery } from "react-url-query";
import history from "./history";

configureUrlQuery({ history });

const mapUrlToProps = (url, props) => ({ roomId: url.roomId });
const mapUrlChangeHandlersToProps = props => ({ onChangeRoomId: value => replaceInUrlQuery("roomId", value) });

const AppWithUrlRewrite = addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(App);

ReactDOM.render(<AppWithUrlRewrite />, document.getElementById("root"));
