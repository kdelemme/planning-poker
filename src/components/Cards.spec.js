import React from "react";
import Cards from "./Cards";
import { mount } from "enzyme";

describe("Cards Component", () => {
  it("shows the deck of cards if show is true", () => {
    const wrapper = mount(<Cards show={true} />);
    expect(wrapper.find("input.btn")).toHaveLength(8);
  });

  it("triggers the handlePlayed when clicking on a card", () => {
    const handlePlayCardSpy = jest.fn();
    const wrapper = mount(<Cards show={true} handlePlayCard={handlePlayCardSpy} />);
    const cardOne = wrapper.find("input.btn").first();
    expect(cardOne.hasClass("btn-primary"));

    cardOne.simulate("click");

    expect(handlePlayCardSpy).toHaveBeenCalledWith(1);
    expect(cardOne.hasClass("btn-danger"));
  });
});
