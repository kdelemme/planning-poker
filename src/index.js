import React, { Component } from "react";
import ReactDOM from "react-dom";
import EventsService from "./events-handler";
import Estimations from "./Estimations";
import Participants from "./Participants";
import Cards from "./Cards";
import StartEstimation from "./StartEstimation";
import Name from "./Name";

class App extends Component {
  state = {
    roomId: "39944e90-c9f5-427e-a616-98c3f91b08bb",
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

    this.eventsService.subscribeToEstimationStartedEvent(() => {
      this.setState({ estimations: [], hasStarted: true });
    });

    this.eventsService.subscribeToParticipantListEvent(participants => {
      this.setState({ participants });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <Name handleChange={this.eventsService.publishChangeNameEvent} />
          <Participants participants={this.state.participants} />
          <StartEstimation
            handleStartEstimation={this.eventsService.publishStartEstimationEvent}
            showButton={!this.state.hasStarted}
          />
          <Cards showCards={this.state.hasStarted} handlePlayCard={this.eventsService.publishPlayCardEvent} />
          <Estimations
            showResults={!this.state.hasStarted && this.state.estimations.length > 0}
            participants={this.state.participants}
            estimations={this.state.estimations}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
