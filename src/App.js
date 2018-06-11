import React, { Component } from "react";
import Landing from "./Landing";
import PlanningPokerRoom from "./PlanningPokerRoom";

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

export default App;
