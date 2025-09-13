import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { localhostURL } from "../../utility/localhostURL";
import { routes } from "../router/routes";

describe("should render MainGridInterface", () => {
  it("should login and render the aside, and right side section", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/"],
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

    const latestUsers = await fetch(`${localhostURL}/users/latest`);

    await expect(latestUsers.json()).resolves.toEqual([
      {
        username: "user",
        display_name: "user",
        followedBy: [],
        following: [],
      },
      {
        username: "user1",
        display_name: "user1",
        followedBy: [],
        following: [],
      },
      {
        username: "user2",
        display_name: "user2",
        followedBy: [],
        following: [],
      },
    ]);

    const mostFollowed = await fetch(`${localhostURL}/users/followed`);

    await expect(mostFollowed.json()).resolves.toEqual([
      {
        username: "user3",
        display_name: "user3",
        followedBy: [],
        following: [],
      },
      {
        username: "user4",
        display_name: "user4",
        followedBy: [],
        following: [],
      },
      {
        username: "user5",
        display_name: "user5",
        followedBy: [],
        following: [],
      },
    ]);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    // screen.debug();

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByAltText("loading spinner"),
    );

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

    await waitFor(() => screen.queryByText("Loading latest users..."));

    expect(screen.queryAllByText("user")[0].textContent).toMatch(/user/);

    expect(screen.queryAllByText("user1")[0].textContent).toMatch(/user/);

    expect(screen.queryAllByText("user2")[0].textContent).toMatch(/user/);

    expect(screen.queryAllByText("user3")[0].textContent).toMatch(/user/);

    expect(screen.queryAllByText("user4")[0].textContent).toMatch(/user/);

    expect(screen.queryAllByText("user5")[0].textContent).toMatch(/user/);
  });

  it.only("should login, follow a user and render unfollow button", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/"],
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

    const latestUsers = await fetch(`${localhostURL}/users/latest`);

    await expect(latestUsers.json()).resolves.toEqual([
      {
        id: 2,
        username: "user",
        display_name: "user",
        followedBy: [],
        following: [],
      },
      {
        username: "user1",
        display_name: "user1",
        followedBy: [],
        following: [],
      },
      {
        username: "user2",
        display_name: "user2",
        followedBy: [],
        following: [],
      },
    ]);

    const mostFollowed = await fetch(`${localhostURL}/users/followed`);

    await expect(mostFollowed.json()).resolves.toEqual([
      {
        username: "user3",
        display_name: "user3",
        followedBy: [],
        following: [],
      },
      {
        username: "user4",
        display_name: "user4",
        followedBy: [],
        following: [],
      },
      {
        username: "user5",
        display_name: "user5",
        followedBy: [],
        following: [],
      },
    ]);

    const followingUser = await fetch(`${localhostURL}/users/following/2`, {
      method: "PUT",
      body: JSON.stringify({
        id: 2,
      }),
    });

    await expect(followingUser.json()).resolves.toEqual([
      {
        id: 2,
        username: "user",
        display_name: "user",
        bio: "",
        website: "",
        github: "",
        password: "12345678B",
        confirm_password: "12345678B",
        profile_picture: "",
        followersNumber: 0,
        followingNumber: 0,
        posts: 0,
        followedBy: [
          {
            id: 1,
            username: "preslaw",
            display_name: "preslaw",
            following: [],
          },
        ],
        following: [],
      },
      {
        id: 1,
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
        followedBy: [],
        following: [
          {
            id: 2,
            username: "user",
            display_name: "user",
            following: [],
          },
        ],
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

    await waitFor(() => screen.queryByText("Loading latest users..."));

    // screen.debug();

    await user.click(screen.queryAllByRole("button")[0]);

    expect(screen.queryByRole("button", { name: "Unfollow" }));

    screen.debug();
  });

  it("should login navigate to settings and render the component", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/settings"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch
      .mockResolvedValueOnce(Response.json("token"))
      .mockResolvedValueOnce(
        Response.json({
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "",
          followedBy: [],
          following: [],
          followersNumber: 0,
          followingNumber: 0,
          posts: 0,
        }),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 2,
            username: "preslaw",
            display_name: "preslaw",
          },
          {
            id: 3,
            username: "preslaw1",
            display_name: "preslaw1",
          },
          {
            id: 4,
            username: "preslaw2",
            display_name: "preslaw2",
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 5,
            username: "test",
            display_name: "test",
          },
          {
            id: 6,
            username: "test1",
            display_name: "test1",
          },
          {
            id: 7,
            username: "test2",
            display_name: "test2",
          },
        ]),
      )

      .mockResolvedValue(
        Response.json({
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "",
          followedBy: [],
          following: [],
          followersNumber: 0,
          followingNumber: 0,
          posts: 0,
        }),
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Settings"));

    expect(screen.queryAllByText("Settings")[1].textContent).toMatch(
      /settings/i,
    );

    expect(screen.queryByText("Account").textContent).toMatch(/account/i);

    expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);

    spiedFetch.mockRestore();
  });

  it("should login navigate to settings and logout", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/settings"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch
      .mockResolvedValueOnce(Response.json("token"))
      .mockResolvedValueOnce(
        Response.json({
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "",
          followedBy: [],
          following: [],
          followersNumber: 0,
          followingNumber: 0,
          posts: 0,
        }),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 2,
            username: "preslaw",
            display_name: "preslaw",
          },
          {
            id: 3,
            username: "preslaw1",
            display_name: "preslaw1",
          },
          {
            id: 4,
            username: "preslaw2",
            display_name: "preslaw2",
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 5,
            username: "test",
            display_name: "test",
          },
          {
            id: 6,
            username: "test1",
            display_name: "test1",
          },
          {
            id: 7,
            username: "test2",
            display_name: "test2",
          },
        ]),
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Settings"));

    expect(screen.queryAllByText("Settings")[1].textContent).toMatch(
      /settings/i,
    );

    expect(screen.queryByText("Account").textContent).toMatch(/account/i);

    expect(screen.queryByText("Logout").textContent).toMatch(/logout/i);

    await user.click(screen.queryByText("Logout"));

    spiedFetch.mockRestore();
  });

  it("should login and navigate to home and render posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch
      .mockResolvedValueOnce(Response.json("token"))
      .mockResolvedValueOnce(
        Response.json({
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "./user-default-pfp.jpg",
          followedBy: [],
          following: [],
          createdPostsByUsers: [],
          followersNumber: 0,
          followingNumber: 0,
          posts: 0,
        }),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 1,
            content: "post on home",
            imageURL: null,
            tag: "post",
            likes: 1,
            comments: 0,
            createdAt: new Date(),
            authorId: 1,
            postLikedByUsers: [],
            author: {
              id: 1,
              username: "author",
              display_name: "user",
              bio: "",
              website: "",
              github: "",
              password: "12345678B",
              confirm_password: "12345678B",
              profile_picture: "",
              role: "USER",
              followersNumber: 0,
              followingNumber: 0,
              posts: 1,
              createdAt: new Date(),
            },
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 2,
            username: "preslaw",
            display_name: "preslaw",
          },
          {
            id: 3,
            username: "preslaw1",
            display_name: "preslaw1",
          },
          {
            id: 4,
            username: "preslaw2",
            display_name: "preslaw2",
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 5,
            username: "test",
            display_name: "test",
          },
          {
            id: 6,
            username: "test1",
            display_name: "test1",
          },
          {
            id: 7,
            username: "test2",
            display_name: "test2",
          },
        ]),
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    expect(screen.queryByText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    screen.debug();

    expect(screen.queryByText("Recent").textContent).toMatch(/recent/i);

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryByText("author").textContent).toMatch(/author/i);

    expect(screen.queryByText("less than a minute ago").textContent).toMatch(
      /less than a minute ago/i,
    );

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("author").textContent).toMatch(/author/i);

    expect(screen.queryAllByText("0")[0].textContent).toEqual("0");

    expect(screen.queryAllByText("0")[1].textContent).toEqual("0");

    spiedFetch.mockRestore();
  });

  it("should login navigate to home page and like a post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch
      .mockResolvedValueOnce(Response.json("token"))
      .mockResolvedValueOnce(
        Response.json({
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "./user-default-pfp.jpg",
          followedBy: [],
          following: [],
          createdPostsByUsers: [],
          followersNumber: 0,
          followingNumber: 0,
          posts: 0,
        }),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 1,
            content: "post on home",
            imageURL: null,
            tag: "post",
            likes: 1,
            comments: 0,
            createdAt: new Date(),
            authorId: 1,
            postLikedByUsers: [
              {
                id: 1,
              },
            ],
            author: {
              id: 1,
              username: "author",
              display_name: "user",
              bio: "",
              website: "",
              github: "",
              password: "12345678B",
              confirm_password: "12345678B",
              profile_picture: "",
              role: "USER",
              followersNumber: 0,
              followingNumber: 0,
              posts: 1,
              createdAt: new Date(),
            },
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 2,
            username: "preslaw",
            display_name: "preslaw",
          },
          {
            id: 3,
            username: "preslaw1",
            display_name: "preslaw1",
          },
          {
            id: 4,
            username: "preslaw2",
            display_name: "preslaw2",
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 5,
            username: "test",
            display_name: "test",
          },
          {
            id: 6,
            username: "test1",
            display_name: "test1",
          },
          {
            id: 7,
            username: "test2",
            display_name: "test2",
          },
        ]),
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    expect(screen.queryByText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(screen.queryByText("Recent").textContent).toMatch(/recent/i);

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryByText("author").textContent).toMatch(/author/i);

    expect(screen.queryByText("less than a minute ago").textContent).toMatch(
      /less than a minute ago/i,
    );

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("author").textContent).toMatch(/author/i);

    expect(screen.queryAllByText("0")[0].textContent).toEqual("0");

    await user.click(screen.queryByTestId("articleLike"));

    expect(screen.queryByText("1").textContent).toEqual("1");

    spiedFetch.mockRestore();
  });

  it("should login and render message that there is no posts in home", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const spiedFetch = vi.spyOn(global, "fetch");

    spiedFetch
      .mockResolvedValueOnce(Response.json("token"))
      .mockResolvedValueOnce(
        Response.json({
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "./user-default-pfp.jpg",
          followedBy: [],
          following: [],
          createdPostsByUsers: [],
          followersNumber: 0,
          followingNumber: 0,
          posts: 0,
        }),
      )

      .mockResolvedValueOnce(
        Response.json({ message: "No posts has been created!" }),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 2,
            username: "preslaw",
            display_name: "preslaw",
          },
          {
            id: 3,
            username: "preslaw1",
            display_name: "preslaw1",
          },
          {
            id: 4,
            username: "preslaw2",
            display_name: "preslaw2",
          },
        ]),
      )

      .mockResolvedValueOnce(
        Response.json([
          {
            id: 5,
            username: "test",
            display_name: "test",
          },
          {
            id: 6,
            username: "test1",
            display_name: "test1",
          },
          {
            id: 7,
            username: "test2",
            display_name: "test2",
          },
        ]),
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    expect(screen.queryByText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(screen.queryByText("Recent").textContent).toMatch(/recent/i);

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(
      screen.queryByText("No posts has been created!").textContent,
    ).toMatch(/no posts has been created!/i);

    spiedFetch.mockRestore();
  });
});
