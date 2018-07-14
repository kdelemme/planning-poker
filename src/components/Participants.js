import React, { Component } from "react";

class Participants extends Component {
  displayName(participant) {
    const { voteInProgress } = this.props;
    if (participant.hasVoted || !voteInProgress) {
      return `😀 ${participant.name}`;
    } else {
      return `🤔 ${participant.name}`;
    }
  }

  render() {
    const { participants, voteInProgress } = this.props;
    const allVotesReceived = participants.every(p => p.hasVoted);
    return (
      <div>
        <ul className="list-group mb-3">
          {participants.map(p => (
            <li key={p.id} className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{this.displayName(p)}</h6>
                <small className={p.hasVoted && voteInProgress ? "text-success" : "text-muted"}>
                  {voteInProgress ? (p.hasVoted ? "Vote received" : "Awaiting vote") : "Awaiting new round"}
                </small>
              </div>
              <span className="badge badge-secondary px-2">{allVotesReceived ? p.card : "?"}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Participants;
