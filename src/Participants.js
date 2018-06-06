import React, { Component } from "react";

class Participants extends Component {
  render() {
    return (
      <div className="col-12">
        Participants:
        <ul className="list-inline">
          {this.props.participants.map(p => (
            <li className={`list-inline-item ${p.hasVoted ? "text-success" : "text-muted"}`}>{p.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Participants;
