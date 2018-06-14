import React, { Component } from "react";

class Estimations extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    const { estimations, participants } = this.props;

    return (
      <div className="row">
        <ul className="col-12 list list-unstyled">
          {estimations
            .filter(estimation => participants.find(participant => participant.id === estimation.participantId))
            .map(estimation => {
              let p = participants.find(participant => participant.id === estimation.participantId);
              return (
                <li key={p.id}>
                  <span className="text-success">{p.name}</span> played the card{" "}
                  <span className="text-success">{estimation.estimation}</span>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Estimations;
