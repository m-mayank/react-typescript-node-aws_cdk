import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { Header } from "./components/atoms";

test("renders without crashing", () => {
  shallow(<App />);
});

test("have <Header> component", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.contains(<Header />)).toBeTruthy();
});
