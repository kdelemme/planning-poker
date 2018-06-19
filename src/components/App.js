import React, { Component } from "react";
import Landing from "./Landing";
import PlanningPokerRoom from "./PlanningPokerRoom";

import { addUrlProps, replaceInUrlQuery } from "react-url-query";

export class App extends Component {
  state = { room: this.props.room };

  handleSubmit = ({ name, room }) => {
    this.setState({ name, room });
    this.props.onChangeRoom(room);
  };

  render() {
    const { room, name } = this.state;
    return (
      <div>
        {(!room || !name) && <Landing {...this.state} handleSubmit={this.handleSubmit} />}
        {room && name && <PlanningPokerRoom {...this.state} />}
      </div>
    );
  }
}

const mapUrlToProps = (url, props) => ({ room: url.room });
const mapUrlChangeHandlersToProps = props => ({ onChangeRoom: value => replaceInUrlQuery("room", value) });

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(App);
