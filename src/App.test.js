/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("App - Basic functionality", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "development";
  });

  it("should render the correct response when no username is given", async () => {
    axios.get.mockResolvedValueOnce({ status: 200, data: "Hi stranger!" });
    render(<App />);
    const button = screen.getByText(/Say hi!/);
    await act(async () => {
      fireEvent.click(button);
    });
    const linkElement = screen.getByText(/Hi stranger!/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render the name of the user when given", async () => {
    axios.get.mockResolvedValueOnce({ status: 200, data: "Hi Carlos!" });

    render(<App />);
    const input = screen.getByLabelText("Username:", { selector: "input" });
    await act(async () => {
      fireEvent.change(input, { target: { value: "Carlos" } });
    });
    const button = screen.getByText(/Say hi!/);
    await act(async () => {
      fireEvent.click(button);
    });
    const linkElement = screen.getByText(/Hi Carlos!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
