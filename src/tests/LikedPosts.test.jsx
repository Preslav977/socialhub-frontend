import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { routes } from "../router/routes";

describe("should render Liked posts component", () => {
  it("should login and navigate to likes and render liked posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/likes"],
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
                posts: 0,
                createdAt: new Date(),
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

    await user.click(screen.queryByAltText("likes"));

    expect(screen.queryByText("Loading..."));

    screen.debug();

    expect(screen.queryByText("Liked posts").textContent).toMatch(
      /liked posts/i,
    );

    expect(screen.queryByText("author").textContent).toMatch(/author/i);

    expect(screen.queryByText("less than a minute ago").textContent).toMatch(
      /less than a minute ago/i,
    );

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("author").textContent).toMatch(/author/i);

    expect(screen.queryAllByText("0")[0].textContent).toEqual("0");

    expect(screen.queryByText("1").textContent).toEqual("1");

    spiedFetch.mockRestore();
  });

  it("should login and render message that the user doesn't have liked posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/likes"],
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

      .mockResolvedValueOnce(Response.json({ message: "No liked posts!" }))

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

    expect(screen.queryByText("No liked posts!").textContent).toMatch(
      /no liked posts!/i,
    );

    spiedFetch.mockRestore();
  });

  it.only("should login and leave a comment on liked post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/liked", "/posts/1"],
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
                posts: 0,
                createdAt: new Date(),
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
      )

      .mockResolvedValue(
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
                posts: 0,
                createdAt: new Date(),
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

      .mockResolvedValue(
        Response.json({
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
              posts: 0,
              createdAt: new Date(),
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

    // user.click(screen.queryByText("Likes"));

    expect(screen.queryByText("Loading posts...")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading posts..."),
    );

    // screen.debug();

    await user.click(screen.queryByTestId("article"));

    expect(screen.queryByText("Loading posts details..."));

    screen.debug();

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByText("Loading posts..."),
    // );

    // expect(screen.queryByText("Liked posts").textContent).toMatch(
    //   /liked posts/i,
    // );

    spiedFetch.mockRestore();
  });
});
