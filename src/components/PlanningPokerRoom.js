import React, { Component } from "react";
import EventsService from "../events-service";
import Participants from "./Participants";
import Cards from "./Cards";
import StartEstimation from "./StartEstimation";
import CopyRoomLink from "./CopyLinkRoom";
import AnalyticsService from "../analytics-service";

class PlanningPokerRoom extends Component {
  state = {
    room: this.props.room,
    name: this.props.name,
    participants: [],
    voteInProgress: false
  };

  constructor(props) {
    super(props);
    this.eventsService = new EventsService(this.state.room, this.state.name);

    this.eventsService.subscribeToParticipantsWithVoteEvent(participants => {
      this.setState({ participants, voteInProgress: false });
      AnalyticsService.track("Vote Ended", {
        room: this.state.room,
        totalParticipants: this.state.participants.length
      });
    });

    this.eventsService.subscribeToConnectEvent(({ participantId }) => {
      this.setState({ participantId });
    });

    this.eventsService.subscribeToVoteStartedEvent(() => {
      this.setState({ voteInProgress: true });
      AnalyticsService.track("Vote Started", {
        room: this.state.room,
        totalParticipants: this.state.participants.length
      });
    });

    this.eventsService.subscribeToParticipantsEvent(participants => {
      this.setState({ participants });
    });
  }

  isAdmin = () => {
    const { participants, participantId } = this.state;
    return participants.find(participant => participant.id === participantId && participant.isAdmin);
  };

  render() {
    const { room, participants, voteInProgress } = this.state;
    return (
      <div className="container">
        <div className="row py-4">
          <div className="col-md-4 mb-3 order-md-1 order-2">
            <Participants participants={participants} voteInProgress={voteInProgress} />
            <StartEstimation
              handleStartEstimation={this.eventsService.publishStartVoteEvent}
              show={this.isAdmin()}
              disabled={voteInProgress}
            />
          </div>
          <div className="col-md-8 col-lg-6 order-md-2 order-1">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Planning Poker</span>
              <span>
                <CopyRoomLink />
              </span>
            </h4>
            <Cards disabled={!voteInProgress} handlePlayCard={this.eventsService.publishVoteCardEvent} />
          </div>
        </div>
      </div>
    );
  }
}

export default PlanningPokerRoom;
