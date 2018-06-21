import React, { Component } from "react";

class Estimations extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    const { participants } = this.props;

    return (
      <div className="row">
        <ul className="col-12 list list-unstyled">
          {participants.map(participant => {
            return (
              <li key={participant.id}>
                <span className="text-success">{participant.name}</span> played the card{" "}
                <span className="text-success">{participant.card}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Estimations;
