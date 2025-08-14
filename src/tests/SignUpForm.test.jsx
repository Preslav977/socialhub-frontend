import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect } from "vitest";
import { routes } from "../router/routes";

describe("should render SignUpForm", () => {
  it("should render the form with it's content", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    console.log(screen.debug());

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
