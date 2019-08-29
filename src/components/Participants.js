import React from "react";

function Participants(props) {
  const displayName = participant => {
    const { voteInProgress } = props;
    if (participant.hasVoted || !voteInProgress) {
      return `😀 ${participant.name}`;
    } else {
      return `🤔 ${participant.name}`;
    }
  };

  const { participants, voteInProgress } = props;
  const allVotesReceived = participants.every(p => p.hasVoted);

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Participants</span>
        <span className="badge badge-secondary">{participants.length}</span>
      </h4>
      <ul className="list-group mb-3">
        {participants.map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 className="my-0">{displayName(p)}</h6>
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

export default Participants;
