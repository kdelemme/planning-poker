import React from "react";
import Landing from "./Landing";
import Input from "./Input";
import { mount } from "enzyme";

describe("Landing Component", () => {
  describe("when room and name are not specified", () => {
    it("should enable all inputs", () => {
      const wrapper = mount(<Landing />);
      expect(wrapper.find(Input)).toHaveLength(2);
    });

    it("should disable submit button", () => {
      const wrapper = mount(<Landing />);
      expect(wrapper.find("button").prop("disabled")).toBe(true);
    });
  });

  describe("when room and name are both specified", () => {
    it("should enable submit button", () => {
      const wrapper = mount(<Landing name="John" room="200" />);
      expect(wrapper.find("button").prop("disabled")).toBe(false);
    });
  });

  describe("when only room is specified", () => {
    it("should enable submit button when name is filled in", () => {
      const wrapper = mount(<Landing room="200" />);
      expect(wrapper.find("button").prop("disabled")).toBe(true);

      wrapper.setState({ name: "new name" }); // don't like this

      expect(wrapper.find("button").prop("disabled")).toBe(false);
    });
  });
});
