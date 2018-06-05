import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  publishChangeNameEvent,
  publishPlayCardEvent,
  publishStartEstimationEvent,
  subscribeToEstimationsResultEvent,
  subscribeToParticipantListEvent,
  subscribeToEstimationStartedEvent
} from "./events-handler";

class Estimations extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="col-12 list">
        {this.props.estimations.map(estimation => {
          let p = this.props.participants.find(participant => participant.id === estimation.participantId);
          return (
            <li>
              {p.name}: {estimation.estimation}
            </li>
          );
        })}
      </ul>
    );
  }
}

class App extends Component {
  state = {
    roomId: "39944e90-c9f5-427e-a616-98c3f91b08bb",
    participants: [],
    estimations: [],
    hasStarted: false,
    selectedCard: undefined
  };

  constructor(props) {
    super(props);

    subscribeToEstimationsResultEvent(estimations => {
      this.setState({ estimations, hasStarted: false });
    });

    subscribeToEstimationStartedEvent(() => {
      this.setState({ estimations: [], hasStarted: true, selectedCard: undefined });
    });

    subscribeToParticipantListEvent(participants => {
      this.setState({ participants });
    });
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    publishChangeNameEvent(this.state.name);
  };

  startEstimation = () => {
    publishStartEstimationEvent();
  };

  selectCard = card => {
    publishPlayCardEvent(card);
    this.setState({ selectedCard: card });
  };

  render() {
    const cardValues = [1, 2, 3, 5, 8, 11];
    const boundedSelectCards = cardValues.map(card => this.selectCard.bind(this, card));
    return (
      <div className="container">
        <div className="row mt-5">
          <form onSubmit={this.handleSubmit} className="col-12">
            <label>
              Your name: <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
          </form>

          <p className="col-12">Participants: {this.state.participants.map(p => p.name).join(", ")}</p>

          <div className="col-12 mb-3">
            <input
              type="button"
              className="btn btn-primary"
              onClick={this.startEstimation}
              disabled={this.state.hasStarted}
              value="Start estimation"
            />
          </div>

          {this.state.hasStarted && (
            <div className="col-12">
              {cardValues.map((cardValue, index) => (
                <input
                  type="button"
                  className={`btn ${this.state.selectedCard == cardValue ? "btn-danger" : "btn-primary"}`}
                  onClick={boundedSelectCards[index]}
                  value={cardValue}
                />
              ))}
            </div>
          )}

          {!this.state.hasStarted &&
            this.state.estimations.length > 0 && (
              <Estimations participants={this.state.participants} estimations={this.state.estimations} />
            )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
