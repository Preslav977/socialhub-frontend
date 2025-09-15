import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { localhostURL } from "../../utility/localhostURL";
import { routes } from "../router/routes";

describe("should render Chats component", () => {
  it("should render all chats with the user", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/chats"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const loginResponse = await fetch(`${localhostURL}/login`, {
      method: "POST",
    });

    await expect(loginResponse.json()).resolves.toEqual({
      username: "preslaw",
      password: "12345678B",
    });

    const chats = await fetch(`${localhostURL}/chats`);

    await expect(chats.json()).resolves.toEqual([
      {
        id: "123bg",
        senderChatId: 1,
        receiverChatId: 2,
        senderChat: {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          createdAt: "2025-08-17T05:29:01.873Z",
        },
        receiverChat: {
          id: 2,
          username: "user",
          display_name: "user",

          createdAt: "2025-08-17T05:29:16.247Z",
        },
        messages: [],
      },
    ]);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Message"));

    expect(screen.queryByText("Messages").textContent).toMatch(/messages/i);

    expect(screen.queryAllByText("user")[1].textContent).toMatch(/user/i);

    screen.debug();
  });
});
