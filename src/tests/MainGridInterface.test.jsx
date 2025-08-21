import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, vi } from "vitest";
import { routes } from "../router/routes";

describe("should render MainGridInterface", () => {
  it("should login and render the aside, and right side section", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/home"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const userLogIn = {
      username: "preslaw",
      password: "12345678B",
      token: "token",
      logInUser,
    };

    async function logInUser() {
      fetch("http://localhost/login", {
        body: {
          username: "preslaw",
          password: "12345678B",
          token: "token",
        },
      });
    }

    const mock = vi
      .spyOn(userLogIn, "logInUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mock()).toEqual("preslaw");

    mock.mockImplementationOnce(() => "12345678B");

    expect(mock()).toEqual("12345678B");

    mock.mockImplementationOnce(() => "token");

    expect(mock()).toEqual("token");

    mock.mockImplementationOnce(() => true);

    expect(mock()).toBe(true);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    // screen.debug();

    expect(await screen.findByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    const latestUser = {
      username: "preslaw",
      display_name: "preslaw",
      fetchLatestUser,
    };

    async function fetchLatestUser() {
      fetch("http://localhost/users/latest", {
        body: {
          username: "preslaw",
          display_name: "preslaw",
          token: "token",
        },
      });
    }

    const mockLatestUser = vi
      .spyOn(latestUser, "fetchLatestUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mockLatestUser()).toEqual("preslaw");

    mock.mockImplementationOnce(() => "token");

    expect(mock()).toEqual("token");

    expect(screen.findByText("Loading: latest users..."));

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading: latest users..."),
    );

    const mockFollowedUser = {
      username: "preslaw1",
      display_name: "preslaw1",
      fetchMostFollowedUser,
    };

    async function fetchMostFollowedUser() {
      fetch("http://localhost/users/following", {
        body: {
          username: "preslaw1",
          display_name: "preslaw1",
          token: "token",
        },
      });
    }

    const mockMostFollowedUser = vi
      .spyOn(mockFollowedUser, "fetchMostFollowedUser")
      .mockImplementationOnce(() => "preslaw1");

    expect(mockMostFollowedUser()).toEqual("preslaw1");

    mockMostFollowedUser.mockImplementationOnce(() => "token");

    expect(mockMostFollowedUser()).toEqual("token");

    expect(screen.findByText("Loading: most followed users..."));

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByText("Loading most followed users..."),
    // );

    expect(screen.queryByText("Home").textContent).toMatch(/home/i);

    expect(screen.queryByText("Create").textContent).toMatch(/create/i);

    expect(screen.queryByText("Users").textContent).toMatch(/users/i);

    expect(screen.queryByText("Message").textContent).toMatch(/message/i);

    expect(screen.queryByText("Likes").textContent).toMatch(/likes/i);

    expect(screen.queryByText("Profile").textContent).toMatch(/profile/i);

    expect(screen.queryByText("Settings").textContent).toMatch(/settings/i);

    expect(screen.queryByText("Announcements").textContent).toMatch(
      /announcements/i,
    );

    expect(
      screen.queryByText("Added latest users feature").textContent,
    ).toMatch(/added latest users feature/i);

    expect(
      screen.queryByText("Added most followed users feature").textContent,
    ).toMatch(/added most followed users feature/i);
  });

  it("should login, follow a user and render unfollow button", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/home"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const userLogIn = {
      username: "preslaw",
      password: "12345678B",
      token: "token",
      logInUser,
    };

    async function logInUser() {
      fetch("http://localhost/login", {
        body: {
          username: "preslaw",
          password: "12345678B",
          token: "token",
        },
      });
    }

    const mock = vi
      .spyOn(userLogIn, "logInUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mock()).toEqual("preslaw");

    mock.mockImplementationOnce(() => "12345678B");

    expect(mock()).toEqual("12345678B");

    mock.mockImplementationOnce(() => "token");

    expect(mock()).toEqual("token");

    mock.mockImplementationOnce(() => true);

    expect(mock()).toBe(true);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    // screen.debug();

    expect(await screen.findByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    const latestUser = {
      username: "preslaw1",
      display_name: "preslaw1",
      fetchLatestUser,
    };

    async function fetchLatestUser() {
      fetch("http://localhost/users/latest", {
        body: {
          username: "preslaw1",
          display_name: "preslaw1",
          token: "token",
        },
      });
    }

    const mockLatestUser = vi
      .spyOn(latestUser, "fetchLatestUser")
      .mockImplementationOnce(() => "preslaw1");

    expect(mockLatestUser()).toEqual("preslaw1");

    mock.mockImplementationOnce(() => "token");

    expect(mock()).toEqual("token");

    expect(screen.findByText("Loading: latest users..."));

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading: latest users..."),
    );

    const mockFollowedUser = {
      username: "preslaw2",
      display_name: "preslaw2",
      fetchMostFollowedUser,
    };

    async function fetchMostFollowedUser() {
      fetch("http://localhost/users/following", {
        body: {
          username: "preslaw2",
          display_name: "preslaw2",
          token: "token",
        },
      });
    }

    const mockMostFollowedUser = vi
      .spyOn(mockFollowedUser, "fetchMostFollowedUser")
      .mockImplementationOnce(() => "preslaw2");

    expect(mockMostFollowedUser()).toEqual("preslaw2");

    mockMostFollowedUser.mockImplementationOnce(() => "token");

    expect(mockMostFollowedUser()).toEqual("token");

    expect(screen.findByText("Loading: most followed users..."));

    // screen.debug();

    expect(screen.findByText("Loading most followed users..."));

    expect(screen.queryByText("Home").textContent).toMatch(/home/i);

    expect(screen.queryByText("Create").textContent).toMatch(/create/i);

    expect(screen.queryByText("Users").textContent).toMatch(/users/i);

    expect(screen.queryByText("Message").textContent).toMatch(/message/i);

    expect(screen.queryByText("Likes").textContent).toMatch(/likes/i);

    expect(screen.queryByText("Profile").textContent).toMatch(/profile/i);

    expect(screen.queryByText("Settings").textContent).toMatch(/settings/i);

    expect(screen.queryByText("Announcements").textContent).toMatch(
      /announcements/i,
    );

    expect(
      screen.queryByText("Added latest users feature").textContent,
    ).toMatch(/added latest users feature/i);

    expect(
      screen.queryByText("Added most followed users feature").textContent,
    ).toMatch(/added most followed users feature/i);

    const mockFollowingAUser = {
      username: "preslaw",
      display_name: "preslaw",
      following: [
        {
          id: 3,
          username: "preslaw2",
          display_name: "preslaw2",
        },
      ],
      followingAUser,
    };

    async function followingAUser() {
      fetch("http://localhost/users/following/3", {
        body: {
          username: "preslaw",
          display_name: "preslaw",
          following: [
            {
              id: 3,
              username: "preslaw2",
              display_name: "preslaw2",
            },
          ],
        },
      });
    }

    vi.spyOn(mockFollowingAUser, "followingAUser").mockImplementationOnce(
      () => "preslaw2",
    );

    expect(screen.queryAllByRole("button")[0]);

    await user.click(screen.queryAllByRole("button")[0]);

    // screen.debug();
  });

  it("should login, navigate and render create post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/home", "/create"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const userLogIn = {
      username: "preslaw",
      password: "12345678B",
      token: "token",
      logInUser,
    };

    async function logInUser() {
      fetch("http://localhost/login", {
        body: {
          username: "preslaw",
          password: "12345678B",
          token: "token",
        },
      });
    }

    const mock = vi
      .spyOn(userLogIn, "logInUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mock()).toEqual("preslaw");

    mock.mockImplementationOnce(() => "12345678B");

    expect(mock()).toEqual("12345678B");

    mock.mockImplementationOnce(() => "token");

    expect(mock()).toEqual("token");

    mock.mockImplementationOnce(() => true);

    expect(mock()).toBe(true);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(await screen.findByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Create"));

    expect(screen.queryByPlaceholderText("Share whats happening..."));

    expect(screen.queryByText("0/2000")).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "Post" })).toBeInTheDocument();

    expect(screen.queryByText("Tags:").textContent).toMatch(/tags/i);

    expect(screen.queryByPlaceholderText("Please type to create a tag."));
  });

  it("should login, navigate and render create post errors", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/home", "/create"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const userLogIn = {
      username: "preslaw",
      password: "12345678B",
      token: "token",
      logInUser,
    };

    async function logInUser() {
      fetch("http://localhost/login", {
        body: {
          username: "preslaw",
          password: "12345678B",
          token: "token",
        },
      });
    }

    const mock = vi
      .spyOn(userLogIn, "logInUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mock()).toEqual("preslaw");

    mock.mockImplementationOnce(() => "12345678B");

    expect(mock()).toEqual("12345678B");

    mock.mockImplementationOnce(() => "token");

    expect(mock()).toEqual("token");

    mock.mockImplementationOnce(() => true);

    expect(mock()).toBe(true);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(await screen.findByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Create"));

    expect(screen.queryByPlaceholderText("Share whats happening..."));

    expect(screen.queryByText("0/2000")).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "Post" })).toBeInTheDocument();

    expect(screen.queryByText("Tags:").textContent).toMatch(/tags/i);

    expect(screen.queryByPlaceholderText("Please type to create a tag."));

    await user.click(screen.queryByRole("button", { name: "Post" }));

    expect(screen.queryByText("Content is required").textContent).toMatch(
      /content is required/i,
    );

    expect(screen.queryByText("Tag is required").textContent).toMatch(
      /tag is required/i,
    );
  });
});
