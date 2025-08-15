import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, describe, expect, vi } from "vitest";
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

  it("should not render the span errors when the inputs are not empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render a user information when signup", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const userSigningUp = {
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
      signUpUser,
    };

    async function signUpUser() {
      fetch("http://localhost/signup", {
        body: {
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
        },
      });
    }

    const mock = vi
      .spyOn(userSigningUp, "signUpUser")
      .mockImplementation(() => "preslaw");

    expect(userSigningUp.username).toEqual("preslaw");

    expect(userSigningUp.display_name).toEqual("preslaw");

    mock.mockImplementationOnce(() => "");

    expect(userSigningUp.bio).toEqual("");

    expect(userSigningUp.website).toEqual("");

    expect(userSigningUp.github).toEqual("");

    expect(userSigningUp.profile_picture).toEqual("");

    mock.mockImplementationOnce(() => 0);

    expect(userSigningUp.followersNumber).toEqual(0);

    expect(userSigningUp.followingNumber).toEqual(0);

    expect(userSigningUp.posts).toEqual(0);

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
  });

  it("should display errors if the username, and display name are taken", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/signup"],
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const userSigningUpError = {
      usernameError: "Username is already taken",
      displayNameError: "Display name is already taken",
      signUpUser,
    };

    async function signUpUser() {
      fetch("http://localhost/signup", {
        body: {
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
        },
      });
    }

    const spy = vi
      .spyOn(userSigningUpError, "signUpUser")
      .mockImplementation(() => "Username is already taken");

    expect(userSigningUpError.usernameError).toEqual(
      "Username is already taken",
    );

    vi.spyOn(userSigningUpError, "signUpUser").mockImplementation(
      () => "Display name is already taken",
    );

    expect(userSigningUpError.displayNameError).toEqual(
      "Display name is already taken",
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

    await screen.findByText("Username is already taken");

    await screen.findByText("Display name is already taken");
  });
});
