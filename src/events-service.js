import openSocket from "socket.io-client";

class EventsService {
  constructor(roomId) {
    this.socket = openSocket("http://localhost:3000", {
      query: {
        roomId
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

  subscribeToCardPlayedEvent = callback => {
    this.socket.on("CARD_PLAYED", data => callback(data));
  };

  subscribeToNameChangedEvent = callback => {
    this.socket.on("NAME_CHANGED", data => callback(data));
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

  publishChangeNameEvent = name => {
    this.socket.emit("CHANGE_NAME", { name });
  };
}

export default EventsService;
