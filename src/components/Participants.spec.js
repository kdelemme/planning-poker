import React from "react";
import Participants from "./Participants";
import { mount } from "enzyme";

describe("Participants Component", () => {
  it("should show number of participants", () => {
    const participants = [{ id: 100, name: "John" }, { id: 300, name: "Bob" }, { id: 200, name: "Alice" }];
    const wrapper = mount(<Participants participants={participants} />);

    expect(wrapper.find(".badge").text()).toBe("3");
  });

  it("should mention 'Vote received' when estimation in progress and participant has voted", () => {
    const participants = [
      { id: 100, name: "John", hasVoted: true },
      { id: 300, name: "Bob" },
      { id: 200, name: "Alice" }
    ];
    const wrapper = mount(<Participants participants={participants} estimationInProgress={true} />);

    expect(
      wrapper
        .find(".text-success")
        .first()
        .text()
    ).toBe("Vote received");
  });

  it("should mention 'Awaiting new round' when estimation is not in progress", () => {
    const participants = [
      { id: 100, name: "John", hasVoted: true },
      { id: 300, name: "Bob" },
      { id: 200, name: "Alice" }
    ];
    const wrapper = mount(<Participants participants={participants} estimationInProgress={false} />);

    expect(
      wrapper
        .find("small.text-muted")
        .first()
        .text()
    ).toBe("Awaiting new round");
  });

  it("should mention 'Awaiting vote' when estimation is in progress but participant has not voted", () => {
    const participants = [
      { id: 100, name: "John", hasVoted: false },
      { id: 300, name: "Bob" },
      { id: 200, name: "Alice" }
    ];
    const wrapper = mount(<Participants participants={participants} estimationInProgress={true} />);

    expect(
      wrapper
        .find("small.text-muted")
        .first()
        .text()
    ).toBe("Awaiting vote");
  });
});
