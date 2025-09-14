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

describe("should render Users component", () => {
  it("should login and navigate to users and render its content", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/users"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const response = await fetch(`${localhostURL}/login`, {
      method: "POST",
    });

    await expect(response.json()).resolves.toEqual({
      username: "preslaw",
      password: "12345678B",
    });

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Users"));

    expect(screen.queryAllByPlaceholderText("Enter a username"));

    expect(screen.queryByText("No results!").textContent).toMatch(
      /no results!/i,
    );
  });

  it("should render user by searching", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/users"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const response = await fetch(`${localhostURL}/login`, {
      method: "POST",
    });

    await expect(response.json()).resolves.toEqual({
      username: "preslaw",
      password: "12345678B",
    });

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Users"));

    await user.type(screen.queryByLabelText("query"), "preslaw");

    expect(screen.queryByLabelText("query").value).toEqual("preslaw");

    // fireEvent.keyPress(screen.queryByLabelText("query"), {
    //   key: "Enter",
    //   code: "Enter",
    //   charCode: 13,
    // });

    // screen.debug();
  });
});
