import { renderHook } from "vitest-browser-react";
import { useCounter } from "./useCounter";
import { describe, it, expect } from "vitest";
import { act } from "react";

describe("useCounter", () => {
  it("initial value is 2", () => {
    // 使用renderHook渲染hook
    const { result } = renderHook(() => useCounter(2));
    expect(result.current.count).toBe(2);
  });
  it("increment", () => {
    const { result } = renderHook(() => useCounter());
    // 调用increment
    expect(result.current.count).toBe(0);
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it("decrement", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(-1);
  });
});
