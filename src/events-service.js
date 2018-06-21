import openSocket from "socket.io-client";

class EventsService {
  constructor(room, name) {
    this.socket = openSocket("http://localhost:3000", {
      query: {
        room,
        name
      }
    });
  }

  subscribeToParticipantsEvent = callback => {
    this.socket.on("PARTICIPANTS", data => callback(data));
  };

  subscribeToParticipantsWithVoteEvent = callback => {
    this.socket.on("PARTICIPANTS_WITH_VOTE", data => callback(data));
  };

  subscribeToVoteStartedEvent = callback => {
    this.socket.on("VOTE_STARTED", () => callback());
  };

  subscribeToConnectEvent = callback => {
    this.socket.on("ON_CONNECT", data => callback(data));
  };

  publishStartVoteEvent = () => {
    this.socket.emit("START_VOTE");
  };

  publishVoteCardEvent = value => {
    this.socket.emit("VOTE_CARD", { value });
  };
}

export default EventsService;
