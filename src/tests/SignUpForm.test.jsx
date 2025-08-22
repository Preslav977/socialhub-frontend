import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe } from "vitest";
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

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch.mockResolvedValueOnce(
      Response.json({
        username: "preslaw",
        display_name: "preslaw",
        bio: "",
        website: "",
        github: "",
        password: "12345678B",
        confirm_password: "12345678B",
        profile_picture: "",
        followersNumber: 0,
        followingNumber: 0,
        posts: 0,
      }),
    );

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

    spiedFetch.mockRestore();
  });

  it("should not render the span errors when the inputs are not empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch.mockResolvedValueOnce(
      Response.json({
        username: "preslaw",
        display_name: "preslaw",
        bio: "",
        website: "",
        github: "",
        password: "12345678B",
        confirm_password: "12345678B",
        profile_picture: "",
        followersNumber: 0,
        followingNumber: 0,
        posts: 0,
      }),
    );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    await user.type(screen.queryByLabelText("display_name"), "preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    await user.type(screen.queryByLabelText("confirm_password"), "12345678B");

    const signUpBtn = screen.queryByRole("button", { name: "Sign up" });

    await user.click(signUpBtn);

    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();

    expect(
      screen.queryByText("Display name is required"),
    ).not.toBeInTheDocument();

    expect(screen.queryByText("Password is required")).not.toBeInTheDocument();

    expect(
      screen.queryByText("Confirm password is required"),
    ).not.toBeInTheDocument();

    spiedFetch.mockRestore();
  });

  it("should render a user information when signup", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch.mockResolvedValueOnce(
      Response.json({
        username: "preslaw",
        display_name: "preslaw",
        bio: "",
        website: "",
        github: "",
        password: "12345678B",
        confirm_password: "12345678B",
        profile_picture: "",
        followersNumber: 0,
        followingNumber: 0,
        posts: 0,
      }),
    );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("display_name"), "preslaw");

    expect(screen.queryByLabelText("display_name").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.type(screen.queryByLabelText("confirm_password"), "12345678B");

    expect(screen.queryByLabelText("confirm_password").value).toEqual(
      "12345678B",
    );

    const signUpBtn = screen.queryByRole("button", { name: "Sign up" });

    await user.click(signUpBtn);

    spiedFetch.mockRestore();
  });

  it("should display errors if the username, and display name are taken", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch.mockResolvedValueOnce(
      Response.json(
        [
          { msg: "Username is already taken" },
          { msg: "Display name is already taken" },
        ],
        { status: 400 },
      ),
    );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("display_name"), "preslaw");

    expect(screen.queryByLabelText("display_name").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.type(screen.queryByLabelText("confirm_password"), "12345678B");

    expect(screen.queryByLabelText("confirm_password").value).toEqual(
      "12345678B",
    );

    const signUpBtn = screen.queryByRole("button", { name: "Sign up" });

    await user.click(signUpBtn);

    screen.debug();

    screen.queryByText("Username is already taken");

    screen.queryByText("Display name is already taken");

    spiedFetch.mockRestore();
  });

  it("should navigate to login form and render the form", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    await user.click(screen.queryByText("Login"));

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
