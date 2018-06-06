import React, { Component } from "react";

class Estimations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.showResults) {
      return null;
    }

    return (
      <div className="col-12">
        <ul className="list list-unstyled">
          {this.props.estimations.map(estimation => {
            let p = this.props.participants.find(participant => participant.id === estimation.participantId);
            return (
              <li>
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
