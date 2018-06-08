import React, { Component } from "react";
import ReactDOM from "react-dom";
import uuid from "uuid/v4";
import EventsService from "./events-service";
import Estimations from "./Estimations";
import Participants from "./Participants";
import Cards from "./Cards";
import StartEstimation from "./StartEstimation";
import Name from "./Name";

class App extends Component {
  state = {
    roomId: "2345",
    participants: [],
    estimations: [],
    hasStarted: false
  };

  constructor(props) {
    super(props);
    this.eventsService = new EventsService(this.state.roomId);

    this.eventsService.subscribeToEstimationsResultEvent(estimations => {
      this.setState({ estimations, hasStarted: false });
    });

    this.eventsService.subscribeToConnectEvent(({ participantId }) => {
      this.setState({ participantId });
    });

    this.eventsService.subscribeToEstimationStartedEvent(() => {
      this.setState({
        participants: this.state.participants.map(p => Object.assign({}, p, { hasVoted: false })),
        estimations: [],
        hasStarted: true
      });
    });

    this.eventsService.subscribeToParticipantListEvent(participants => {
      this.setState({ participants });
    });

    this.eventsService.subscribeToCardPlayedEvent(({ participantId }) => {
      const index = this.state.participants.findIndex(p => p.id === participantId);
      this.setState({
        participants: [
          ...this.state.participants.slice(0, index),
          Object.assign({}, this.state.participants[index], { hasVoted: true }),
          ...this.state.participants.slice(index + 1)
        ]
      });
    });

    this.eventsService.subscribeToNameChangedEvent(participant => {
      const index = this.state.participants.findIndex(p => p.id === participant.id);
      this.setState({
        participants: [
          ...this.state.participants.slice(0, index),
          Object.assign({}, this.state.participants[index], { name: participant.name }),
          ...this.state.participants.slice(index + 1)
        ]
      });
    });
  }

  isAdmin = () => {
    const { participants, participantId } = this.state;
    return participants.find(participant => participant.id === participantId && participant.isAdmin);
  };

  render() {
    const { participants, estimations, hasStarted } = this.state;
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-sm-3">
            <Name handleChange={this.eventsService.publishChangeNameEvent} />
            <Participants participants={participants} />
          </div>
          <div className="col-12 col-sm-9">
            <StartEstimation
              handleStartEstimation={this.eventsService.publishStartEstimationEvent}
              showButton={this.isAdmin() && !hasStarted}
            />
            <Cards showCards={hasStarted} handlePlayCard={this.eventsService.publishPlayCardEvent} />
            <Estimations
              showResults={!hasStarted && estimations.length > 0}
              participants={participants}
              estimations={estimations}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
