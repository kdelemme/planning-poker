import React, { Component } from "react";
import EventsService from "../events-service";
import Participants from "./Participants";
import Cards from "./Cards";
import StartEstimation from "./StartEstimation";
import CopyRoomLink from "./CopyLinkRoom";

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
    });

    this.eventsService.subscribeToConnectEvent(({ participantId }) => {
      this.setState({ participantId });
    });

    this.eventsService.subscribeToVoteStartedEvent(() => {
      this.setState({ voteInProgress: true });
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
          <div className="col-md-8 offset-md-2">
            <h4 class="mb-3">
              Planning Poker <CopyRoomLink />
            </h4>
            <Cards disabled={!voteInProgress} handlePlayCard={this.eventsService.publishVoteCardEvent} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2 mb-3">
            <Participants participants={participants} voteInProgress={voteInProgress} />
            <StartEstimation
              handleStartEstimation={this.eventsService.publishStartVoteEvent}
              show={this.isAdmin()}
              disabled={voteInProgress}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PlanningPokerRoom;
