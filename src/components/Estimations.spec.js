import React from "react";
import Estimations from "./Estimations";
import { mount } from "enzyme";

describe("Estimations Component", () => {
  const PROPS = {
    participants: [{ id: 100, name: "John", hasVoted: true }, { id: 200, name: "Alice", hasVoted: true }],
    estimations: [{ participantId: 100, estimation: 5 }, { participantId: 200, estimation: 3 }],
    show: true
  };

  it("shows the deck of cards if show is true", () => {
    const wrapper = mount(<Estimations {...PROPS} />);
    expect(wrapper.find("li")).toHaveLength(PROPS.participants.length);
  });

  it("should strip out estimations with no participants", () => {
    const props = Object.assign({}, PROPS);
    props.estimations.push({ participantId: 500, estimation: 1 });
    const wrapper = mount(<Estimations {...props} />);
    expect(wrapper.find("li")).toHaveLength(PROPS.participants.length);
  });
});
