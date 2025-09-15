import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { localhostURL } from "../../utility/localhostURL";
import { routes } from "../router/routes";
import { server } from "./mocks/server";

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

  it("should login, follow a user and render unfollow button", async () => {
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

    await user.click(screen.queryAllByRole("button")[0]);

    expect(screen.queryByRole("button", { name: "Unfollow" }));

    // screen.debug();
  });

  it("should login navigate to settings and render the component", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/settings"],
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
  });

  it("should login navigate to settings and logout", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/settings"],
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
  });

  it("should login and navigate to home and render posts", async () => {
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

    const posts = await fetch(`${localhostURL}/posts`);

    await expect(posts.json()).resolves.toEqual([
      {
        id: 1,
        content: "post on home",
        imageURL: null,
        tag: "post",
        likes: 0,
        comments: 0,
        createdAt: "2025-09-13T06:03:47.988Z",
        authorId: 1,
        postLikedByUsers: [],
        author: {
          id: 1,
          username: "preslaw",
          display_name: "preslaw1",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "",
          role: "USER",
          followersNumber: 0,
          followingNumber: 0,
          createdAt: "2025-09-13T06:03:47.988Z",
        },
      },
    ]);

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
    );

    expect(screen.queryByText("Loading posts..."));

    await waitFor(() => screen.queryByText("Loading posts..."));

    // screen.debug();

    expect(screen.queryByText("Recent").textContent).toMatch(/recent/i);

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("preslaw").textContent).toMatch(/preslaw/i);

    expect(screen.queryAllByText("0")[0].textContent).toEqual("0");

    expect(screen.queryAllByText("0")[1].textContent).toEqual("0");
  });

  it("should login navigate to home page and like a post", async () => {
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

    const likePost = await fetch(`${localhostURL}/posts/1/like`, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
      }),
    });

    await expect(likePost.json()).resolves.toEqual({
      id: 1,
      content: "post on home",
      imageURL: null,
      tag: "post",
      likes: 1,
      comments: 0,
      createdAt: "2025-09-13T06:03:47.988Z",
      authorId: 1,
      postLikedByUsers: [
        {
          id: 1,
          username: "preslaw",
          display_name: "preslaw1",
        },
      ],
    });

    server.use(
      http.get(`${localhostURL}/posts`, () => {
        return HttpResponse.json([
          {
            id: 1,
            content: "post on home",
            imageURL: null,
            tag: "post",
            likes: 1,
            comments: 0,
            createdAt: "2025-09-13T06:03:47.988Z",
            authorId: 1,
            postLikedByUsers: [],
            author: {
              id: 1,
              username: "preslaw",
              display_name: "preslaw1",
              bio: "",
              website: "",
              github: "",
              password: "12345678B",
              confirm_password: "12345678B",
              profile_picture: "",
              role: "USER",
              followersNumber: 0,
              followingNumber: 0,
              createdAt: "2025-09-13T06:03:47.988Z",
            },
          },
        ]);
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

    expect(screen.queryByText("Loading posts..."));

    await waitFor(() => screen.queryByText("Loading posts..."));

    screen.debug();

    expect(screen.queryByText("Recent").textContent).toMatch(/recent/i);

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("preslaw").textContent).toMatch(/preslaw/i);

    await user.click(screen.queryByAltText("like the post"));

    expect(screen.queryByText("0").textContent).toEqual("0");

    expect(screen.queryByText("1").textContent).toEqual("1");
  });

  it("should login and render message that there is no posts in home", async () => {
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

    server.use(
      http.get(`${localhostURL}/posts`, () => {
        return HttpResponse.json({ message: "No posts has been created!" });
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

    expect(screen.queryByText("Loading posts..."));

    await waitFor(() => screen.queryByText("Loading posts..."));

    expect(screen.queryByText("Recent").textContent).toMatch(/recent/i);

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(
      screen.queryByText("No posts has been created!").textContent,
    ).toMatch(/no posts has been created!/i);
  });

  it.only("should navigate to post details and render it", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/posts/1"],
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

    const postDetails = await fetch(`${localhostURL}/posts/1`);

    await expect(postDetails.json()).resolves.toEqual({
      id: 1,
      content: "post on home",
      imageURL: null,
      tag: "post",
      likes: 0,
      comments: 0,
      createdAt: "2025-09-13T06:03:47.988Z",
      authorId: 1,
      postLikedByUsers: [],
      postCommentedByUsers: [],
      author: {
        id: 1,
        username: "preslaw",
        display_name: "preslaw1",
        bio: "",
        website: "",
        github: "",
        password: "12345678B",
        confirm_password: "12345678B",
        profile_picture: "/user-details.pfp.jpg",
        role: "USER",
        followersNumber: 0,
        followingNumber: 0,
        createdAt: "2025-09-13T06:03:47.988Z",
      },
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

    expect(screen.queryByText("Loading posts..."));

    await waitFor(() => screen.queryByText("Loading posts..."));

    await user.click(screen.queryByText("post on home"));

    expect(screen.queryByText("preslaw").textContent).toMatch(/preslaw/i);

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryAllByText(0)[0].textContent).toMatch(/0/i);

    expect(screen.queryAllByText(0)[1].textContent).toMatch(/0/i);

    expect(screen.queryByRole("button", { name: "Post" })).toBeInTheDocument();

    expect(screen.queryByText("View comments 0").textContent).toMatch(
      /view comments 0/i,
    );

    screen.debug();
  });
});
