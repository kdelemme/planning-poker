import React, { Component } from "react";
import ReactDOM from "react-dom";
import Landing from "./Landing";
import PlanningPokerRoom from "./PlanningPokerRoom";

class App extends Component {
  state = {};

  handleSubmit = ({ name, roomId }) => this.setState({ name, roomId });

  render() {
    const { roomId, name } = this.state;
    return (
      <div>
        {!roomId && !name && <Landing handleSubmit={this.handleSubmit} />}
        {roomId && name && <PlanningPokerRoom {...this.state} />}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
