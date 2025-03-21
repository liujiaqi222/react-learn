import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import Counter from "./Counter";

describe("Counter", async () => {
  it("increments counter on button click", async () => {
    const screen = render(<Counter />);
    // 获取按钮 在Counter组件中按钮的名字是increment
    const btn = screen.getByRole("button", { name: /increment/ });

    // 获取p标签
    const counterValue = screen.getByRole("paragraph");
    expect(counterValue.element()).toHaveTextContent("0"); // 默认应该为0
  });
});
