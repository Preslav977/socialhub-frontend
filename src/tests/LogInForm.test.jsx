import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { localhostURL } from "../../utility/localhostURL";
import { routes } from "../router/routes";
import { server } from "./mocks/server";

describe("should render LogInForm", () => {
  it("should render the form with it's content", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.queryByText("Welcome back!").textContent).toMatch(
      /welcome back!/i,
    );

    expect(
      screen.queryByText("Please fill your login details").textContent,
    ).toMatch(/please fill your login details/i);

    expect(screen.queryByRole("button", { name: "Login" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Guest User" }),
    ).toBeInTheDocument();

    expect(screen.queryByText("Don't have an account?").textContent).toMatch(
      /don't have an account?/i,
    );

    expect(screen.queryByText("Sign Up").textContent).toMatch(/sign up/i);

    expect(screen.queryByRole("heading", { level: 1 }).textContent).toMatch(
      /socialhub/i,
    );

    expect(screen.queryByText("Your network, improved.").textContent).toMatch(
      /your network, improved./i,
    );
  });

  it("should render span errors if the inputs are empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByText("Username is required").textContent).toMatch(
      /username is required/i,
    );

    expect(screen.queryByText("Password is required").textContent).toMatch(
      /password is required/i,
    );
  });

  it("should't render span errors if the inputs are not empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
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

    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();

    expect(screen.queryByText("Password is required")).not.toBeInTheDocument();
  });

  it("should render loading spinner when successfully login", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
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

    expect(await screen.findByAltText("loading spinner"));
  });

  it("should render an error if wrong credentials are provided", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();
    server.use(
      http.post(`${localhostURL}/login`, () => {
        return HttpResponse.json(
          { msg: "Password or Username is incorrect" },
          { status: 401 },
        );
      }),
    );

    await user.type(screen.queryByLabelText("username"), "preslaw123");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw123");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(
      screen.queryByText("Password or Username is incorrect").textContent,
    ).toMatch(/password or username is incorrect/i);
  });

  it("should render loading spinner on guest user login", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const response = await fetch(`${localhostURL}/guest_login`, {
      method: "POST",
    });

    await expect(response.json()).resolves.toEqual({
      username: "guest",
      password: "12345678B",
    });

    await user.type(screen.queryByLabelText("username"), "test");

    expect(screen.queryByLabelText("username").value).toEqual("test");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Guest User" }));

    expect(await screen.findByAltText("loading spinner"));
  });

  it("should navigate to signup form and render the form", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.queryByText("Sign Up"));

    expect(screen.queryByText("Join us Today!").textContent).toMatch(
      /join us today!/i,
    );

    expect(
      screen.queryByText("Please fill in your details above below").textContent,
    ).toMatch(/please fill in your details above below/i);

    expect(
      screen.queryByRole("button", { name: "Sign up" }),
    ).toBeInTheDocument();

    expect(screen.queryByText("Already have an account?").textContent).toMatch(
      /already have an account?/i,
    );

    expect(screen.queryByText("Login").textContent).toMatch(/login/i);

    expect(screen.queryByRole("heading", { level: 1 }).textContent).toMatch(
      /socialhub/i,
    );

    expect(screen.queryByText("Your network, improved.").textContent).toMatch(
      /your network, improved./i,
    );
  });
});
