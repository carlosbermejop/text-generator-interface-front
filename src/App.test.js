import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App - Basic functionality", () => {
  it("should render the correct response when no username is given", () => {
    render(<App />);
    const button = screen.getByText(/Say hi!/);
    fireEvent.click(button);
    const linkElement = screen.getByText(/Hi stranger!/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render the name of the user when given", () => {
    render(<App />);
    const input = screen.getByLabelText("Username:", { selector: "input" });
    fireEvent.change(input, { target: { value: "Carlos" } });
    const button = screen.getByText(/Say hi!/);
    fireEvent.click(button);
    const linkElement = screen.getByText(/Hi Carlos!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
