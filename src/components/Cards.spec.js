import React from "react";
import Cards from "./Cards";
import { mount } from "enzyme";

describe("Cards Component", () => {
  it("shows the deck of cards if show is true", () => {
    const wrapper = mount(<Cards show={true} />);
    expect(wrapper.find("input.btn")).toHaveLength(8);
  });
});
