import React, { Component } from "react";
import ReactDOM from "react-dom";
import Landing from "./Landing";
import PlanningPokerRoom from "./PlanningPokerRoom";
import { configureUrlQuery, addUrlProps, replaceInUrlQuery } from "react-url-query";

import history from "./history";

const mapUrlToProps = (url, props) => ({ roomId: url.roomId });
const mapUrlChangeHandlersToProps = props => ({ onChangeRoomId: value => replaceInUrlQuery("roomId", value) });

class App extends Component {
  state = { roomId: this.props.roomId };

  handleSubmit = ({ name, roomId }) => {
    this.setState({ name, roomId });
    this.props.onChangeRoomId(roomId);
  };

  render() {
    const { roomId, name } = this.state;
    return (
      <div>
        {(!roomId || !name) && <Landing {...this.state} handleSubmit={this.handleSubmit} />}
        {roomId && name && <PlanningPokerRoom {...this.state} />}
      </div>
    );
  }
}

const AppRouted = addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(App);

configureUrlQuery({ history });

ReactDOM.render(<AppRouted />, document.getElementById("root"));
