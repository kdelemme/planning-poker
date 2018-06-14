import openSocket from "socket.io-client";

class EventsService {
  constructor(roomId, name) {
    this.socket = openSocket("http://localhost:3000", {
      query: {
        roomId,
        name
      }
    });
  }

  subscribeToParticipantListEvent = callback => {
    this.socket.on("PARTICIPANT_LIST", data => callback(data));
  };

  subscribeToEstimationsResultEvent = callback => {
    this.socket.on("ESTIMATIONS_RESULT", data => callback(data));
  };

  subscribeToEstimationStartedEvent = callback => {
    this.socket.on("ESTIMATION_STARTED", () => callback());
  };

  subscribeToConnectEvent = callback => {
    this.socket.on("ON_CONNECT", data => callback(data));
  };

  publishStartEstimationEvent = () => {
    this.socket.emit("START_ESTIMATION");
  };

  publishPlayCardEvent = value => {
    this.socket.emit("PLAY_CARD", { value });
  };
}

export default EventsService;
