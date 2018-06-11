import React, { Component } from "react";
import ReactDOM from "react-dom";
import Landing from "./Landing";
import PlanningPokerRoom from "./PlanningPokerRoom";
import { addUrlProps } from "react-url-query";

function mapUrlToProps(url, props) {
  return {
    roomId: url.roomId,
    name: url.name
  };
}

class App extends Component {
  state = { roomId: this.props.roomId, name: this.props.name };

  handleSubmit = ({ name, roomId }) => this.setState({ name, roomId });

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

const AppRouted = addUrlProps({ mapUrlToProps })(App);

ReactDOM.render(<AppRouted />, document.getElementById("root"));
