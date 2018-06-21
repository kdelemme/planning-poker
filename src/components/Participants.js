import React, { Component } from "react";

class Participants extends Component {
  render() {
    const { participants, voteInProgress } = this.props;
    return (
      <div>
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Participants</span>
          <span className="badge badge-secondary badge-pill">{this.props.participants.length}</span>
        </h4>
        <ul className="list-group mb-3">
          {participants.map(p => (
            <li key={p.id} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{p.name}</h6>
                <small className={p.hasVoted && voteInProgress ? "text-success" : "text-muted"}>
                  {voteInProgress ? (p.hasVoted ? "Vote received" : "Awaiting vote") : "Awaiting new round"}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Participants;
