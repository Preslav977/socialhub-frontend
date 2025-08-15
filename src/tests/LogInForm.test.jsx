import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe } from "vitest";
import { routes } from "../router/routes";

describe("should render LogInForm", () => {
  it("should render the form with its content", () => {
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
});
