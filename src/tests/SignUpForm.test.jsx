import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect } from "vitest";
import { routes } from "../router/routes";

describe("should render SignUpForm", () => {
  it("should render the form with it's content", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

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

  it("should render the span errors when the inputs are empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const signUpBtn = screen.queryByRole("button", { name: "Sign up" });

    await user.click(signUpBtn);

    expect(screen.queryByText("Username is required").textContent).toMatch(
      /username is required/i,
    );

    expect(screen.queryByText("Display name is required").textContent).toMatch(
      /display name is required/i,
    );

    expect(screen.queryByText("Password is required").textContent).toMatch(
      /password is required/i,
    );

    expect(
      screen.queryByText("Confirm password is required").textContent,
    ).toMatch(/confirm password is required/i);
  });
});
