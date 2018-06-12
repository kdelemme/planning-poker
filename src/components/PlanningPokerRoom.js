import React, { Component } from "react";
import EventsService from "../events-service";
import Estimations from "./Estimations";
import Participants from "./Participants";
import Cards from "./Cards";
import StartEstimation from "./StartEstimation";
import CopyRoomLink from "./CopyLinkRoom";

class PlanningPokerRoom extends Component {
  state = {
    roomId: this.props.roomId,
    name: this.props.name,
    participants: [],
    estimations: [],
    estimationInProgress: false
  };

  constructor(props) {
    super(props);
    this.eventsService = new EventsService(this.state.roomId, this.state.name);

    this.eventsService.subscribeToEstimationsResultEvent(estimations => {
      this.setState({ estimations, estimationInProgress: false });
    });

    this.eventsService.subscribeToConnectEvent(({ participantId }) => {
      this.setState({ participantId });
    });

    this.eventsService.subscribeToEstimationStartedEvent(() => {
      this.setState({
        participants: this.state.participants.map(p => Object.assign({}, p, { hasVoted: false })),
        estimations: [],
        estimationInProgress: true
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
  }

  isAdmin = () => {
    const { participants, participantId } = this.state;
    return participants.find(participant => participant.id === participantId && participant.isAdmin);
  };

  render() {
    const { participants, estimations, estimationInProgress } = this.state;
    return (
      <div className="container">
        <div className="row py-4">
          <div className="col-md-4 mb-3">
            <Participants participants={participants} />
            <StartEstimation
              handleStartEstimation={this.eventsService.publishStartEstimationEvent}
              show={this.isAdmin()}
              disabled={estimationInProgress}
            />
          </div>
          <div className="col-md-8">
            <h4 class="mb-3">
              Planning Poker <CopyRoomLink />
            </h4>
            <Cards show={estimationInProgress} handlePlayCard={this.eventsService.publishPlayCardEvent} />
            <Estimations
              show={!estimationInProgress && estimations.length > 0}
              participants={participants}
              estimations={estimations}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PlanningPokerRoom;
