import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import Greeting from "./Greeting";

describe("Greeting", () => {
  it("renders a default greeting", () => {
    const { getByText } = render(<Greeting />);
    expect(getByText("Hello, World!").element()).toBeInTheDocument();
  });

  it("renders a greeting with a name", () => {
    const { getByText } = render(<Greeting name="Jiaqi" />);
    expect(getByText("Hello, Jiaqi!").element()).toBeInTheDocument();
  });
});
