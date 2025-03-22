import { render } from "vitest-browser-react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
  beforeEach(() => {
    // Mock the global fetch function
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    // Clear all mocks after each test
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it("fetches and displays the user data", async () => {
    const fetchMock = vi.mocked(fetch);
    const mockUser = { name: "John Doe", email: "john@example.com" };
    // 设置fetch的返回值
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve(mockUser),
    } as unknown as Response);

    // 渲染组件
    const screen = render(<UserProfile userId="1" />);
    expect(screen.getByText(/loading/i).element()).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1");
    await expect.element(screen.getByText("John Doe")).toBeInTheDocument();
    await expect.element(screen.getByText("john@example.com")).toBeInTheDocument();
  });
});
