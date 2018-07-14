import React from "react";
import Cards from "./Cards";
import { mount } from "enzyme";

describe("Cards Component", () => {
  it("should enable the deck of cards if disabled is false", () => {
    const wrapper = mount(<Cards disabled={false} />);
    expect(wrapper.find("input.btn")).toHaveLength(8);
    wrapper.find("input.btn").forEach(btn => {
      expect(btn.prop("disabled")).toBe(false);
    });
  });

  it("should disable the deck of cards if disabled is true", () => {
    const wrapper = mount(<Cards disabled={true} />);
    expect(wrapper.find("input.btn")).toHaveLength(8);
    wrapper.find("input.btn").forEach(btn => {
      expect(btn.prop("disabled")).toBe(true);
    });
  });

  it("triggers the handlePlayed when clicking on a card", () => {
    const handlePlayCardSpy = jest.fn();
    const wrapper = mount(<Cards disabled={false} handlePlayCard={handlePlayCardSpy} />);
    const cardOne = wrapper.find("input.btn").first();
    expect(cardOne.hasClass("btn-primary"));

    cardOne.simulate("click");

    expect(handlePlayCardSpy).toHaveBeenCalledWith(1);
    expect(cardOne.hasClass("btn-danger"));
  });
});
