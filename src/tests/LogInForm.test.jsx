import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe } from "vitest";
import { routes } from "../router/routes";

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

    screen.debug();

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();

    expect(screen.queryByText("Password is required")).not.toBeInTheDocument();
  });
});
