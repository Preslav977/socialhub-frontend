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

describe("should render Profile component", () => {
  it("should login and navigate to profile", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/1`);

    await expect(userInformationById.json()).resolves.toEqual({
      id: 1,
      username: "preslaw",
      display_name: "preslaw",
      bio: "",
      website: "",
      github: "",
      password: "12345678B",
      confirm_password: "12345678B",
      profile_picture: "",
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
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

    await user.click(screen.queryByText("Profile"));

    // screen.debug();

    expect(screen.queryAllByText("Profile")[0].textContent).toMatch(/profile/i);

    expect(screen.queryAllByText("preslaw")[0].textContent).toMatch(/preslaw/i);

    expect(screen.queryByText(1)).toBeInTheDocument();

    expect(screen.queryByText("Followers").textContent).toMatch(/followers/i);

    expect(screen.queryByText(10)).toBeInTheDocument();

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryByText(5)).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[0].textContent).toMatch(/posts/i);

    expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[1].textContent).toMatch(/posts/i);
  });

  it("should login navigate to profile and edit it", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/1`);

    await expect(userInformationById.json()).resolves.toEqual({
      id: 1,
      username: "preslaw",
      display_name: "preslaw",
      bio: "",
      website: "",
      github: "",
      password: "12345678B",
      confirm_password: "12345678B",
      profile_picture: "",
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
    });

    const updateUserProfile = await fetch(`${localhostURL}/users/1`, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        username: "preslaww",
        display_name: "preslaww1",
        bio: "1",
        website: "2",
        github: "3",
        password: "12345678B",
        confirm_password: "12345678B",
        profile_picture: "img",
        followersNumber: 10,
        followingNumber: 5,
        posts: 1,
      }),
    });

    await expect(updateUserProfile.json()).resolves.toEqual({
      id: 1,
      username: "preslaww",
      display_name: "preslaww1",
      bio: "1",
      website: "2",
      github: "3",
      password: "12345678B",
      confirm_password: "12345678B",
      profile_picture: "img",
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
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

    await user.click(screen.queryByText("Profile"));

    expect(screen.queryAllByText("preslaw")[0].textContent).toMatch(/preslaw/i);

    expect(screen.queryByText(5)).toBeInTheDocument();

    expect(screen.queryByText("Followers").textContent).toMatch(/followers/i);

    expect(screen.queryByText(10)).toBeInTheDocument();

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryByText(1)).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[0].textContent).toMatch(/posts/i);

    expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[1].textContent).toMatch(/posts/i);

    await user.click(screen.queryByTestId("editProfileBtn"));

    expect(screen.queryByText("preslaww").textContent).toMatch(/preslaww/i);

    expect(screen.queryByText("preslaww1").textContent).toMatch(/preslaww1/i);

    expect(screen.queryAllByText("1")[0].textContent).toMatch(/1/i);

    expect(screen.queryByText("2").textContent).toMatch(/2/i);

    expect(screen.queryByText("3").textContent).toMatch(/3/i);

    expect(screen.queryByText("10").textContent).toMatch(/10/i);

    expect(screen.queryByText("5").textContent).toMatch(/5/i);

    await user.click(screen.queryByRole("button", { name: "Save Changes" }));
  });

  it("should login navigate to user profile and render the posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/1`);

    await expect(userInformationById.json()).resolves.toEqual({
      id: 1,
      username: "preslaw",
      display_name: "preslaw",
      bio: "",
      website: "",
      github: "",
      password: "12345678B",
      confirm_password: "12345678B",
      profile_picture: "",
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
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

    await user.click(screen.queryByAltText("Profile"));

    screen.debug();

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("preslaw").textContent).toMatch(/preslaw/i);

    expect(screen.queryAllByText("0")[0].textContent).toEqual("0");

    expect(screen.queryAllByText("0")[1].textContent).toEqual("0");
  });

  it("should login navigate to user profile and like a post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/1`);

    await expect(userInformationById.json()).resolves.toEqual({
      id: 1,
      username: "preslaw",
      display_name: "preslaw",
      bio: "",
      website: "",
      github: "",
      password: "12345678B",
      confirm_password: "12345678B",
      profile_picture: "",
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
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

    await user.click(screen.queryByAltText("Profile"));

    // screen.debug();

    expect(screen.queryByText("preslaw").textContent).toMatch(/preslaw/i);

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryAllByText("0")[0].textContent).toEqual("0");

    await user.click(screen.queryByTestId("articleLike"));

    expect(screen.queryByText("1").textContent).toEqual("1");
  });

  it("should login and render message that the user doesn't have created by him posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/1`);

    await expect(userInformationById.json()).resolves.toEqual({
      id: 1,
      username: "preslaw",
      display_name: "preslaw",
      bio: "",
      website: "",
      github: "",
      password: "12345678B",
      confirm_password: "12345678B",
      profile_picture: "",
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
    });

    server.use(
      http.get(`${localhostURL}/posts/author/1`, () => {
        return HttpResponse.json({ message: "No created posts by author!" });
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

    await user.click(screen.queryByText("Profile"));

    screen.debug();

    expect(
      screen.queryByText("No created posts by author!").textContent,
    ).toMatch(/no created posts by author!/i);
  });

  it("should navigate to user profile and follow him", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/2"],
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
      http.get(`${localhostURL}/users/2`, () => {
        return HttpResponse.json({
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
          followedBy: [],
          following: [],
        });
      }),

      http.get(`${localhostURL}/users/details`, () => {
        return HttpResponse.json({
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
          following: [],
        });
      }),
    );

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/2`);

    await expect(userInformationById.json()).resolves.toEqual({
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
      followedBy: [],
      following: [],
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

    await waitFor(() => screen.queryByText("Loading posts..."));

    await user.click(screen.queryAllByText("user")[0]);

    expect(screen.getByTestId("followUserProfileButton")).toBeInTheDocument();

    await user.click(screen.getByTestId("followUserProfileButton"));

    expect(
      screen.queryAllByRole("button", { name: "Unfollow" })[0],
    ).toBeInTheDocument();

    // screen.debug();
  });

  it.only("should navigate to user profile and create conversation", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/2"],
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
      http.get(`${localhostURL}/users/2`, () => {
        return HttpResponse.json({
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
          followedBy: [],
          following: [],
        });
      }),

      http.get(`${localhostURL}/users/details`, () => {
        return HttpResponse.json({
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
          following: [],
        });
      }),
    );

    const userProfile = await fetch(`${localhostURL}/users/details`);

    await expect(userProfile.json()).resolves.toEqual({
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
      following: [],
    });

    const userInformationById = await fetch(`${localhostURL}/users/2`);

    await expect(userInformationById.json()).resolves.toEqual({
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
      followedBy: [],
      following: [],
    });

    const startConversation = await fetch(`${localhostURL}/chats`, {
      method: "POST",
      body: JSON.stringify({
        senderChatId: 1,
        receiverChatId: 2,
      }),
    });

    await expect(startConversation.json()).resolves.toEqual({
      id: "123bg",
      senderChatId: 1,
      receiverChatId: 2,
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

    await waitFor(() => screen.queryByText("Loading posts..."));

    await user.click(screen.queryAllByText("user")[0]);

    await user.click(screen.queryByAltText("start conversation"));

    screen.debug();
  });
});
