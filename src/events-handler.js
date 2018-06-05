import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000", {
  query: {
    roomId: "39944e90-c9f5-427e-a616-98c3f91b08bb"
  }
});

const subscribeToParticipantListEvent = callback => {
  socket.on("PARTICIPANT_LIST", data => callback(data));
};

const subscribeToEstimationsResultEvent = callback => {
  socket.on("ESTIMATIONS_RESULT", data => callback(data));
};

const subscribeToEstimationStartedEvent = callback => {
  socket.on("ESTIMATION_STARTED", () => callback());
};

const publishStartEstimationEvent = () => {
  socket.emit("START_ESTIMATION");
};

const publishPlayCardEvent = value => {
  socket.emit("PLAY_CARD", { value });
};

const publishChangeNameEvent = name => {
  socket.emit("CHANGE_NAME", { name });
};

export {
  subscribeToEstimationsResultEvent,
  subscribeToEstimationStartedEvent,
  subscribeToParticipantListEvent,
  publishChangeNameEvent,
  publishPlayCardEvent,
  publishStartEstimationEvent
};
