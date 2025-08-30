import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { routes } from "../router/routes";

describe("should render Profile component", () => {
  it("should login and navigate to profile", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

    await user.click(screen.queryByText("Profile"));

    // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    screen.queryByText("Loading...");

    screen.debug();

    expect(screen.queryAllByText("preslaw")[0].textContent).toMatch(/preslaw/i);

    expect(screen.queryAllByText(0)[0]).toBeInTheDocument();

    expect(screen.queryByText("Followers").textContent).toMatch(/followers/i);

    expect(screen.queryAllByText(0)[1]).toBeInTheDocument();

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryAllByText(0)[2]).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[0].textContent).toMatch(/posts/i);

    expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[1].textContent).toMatch(/posts/i);

    spiedFetch.mockRestore();
  });

  it("should login navigate to profile and edit it", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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

      .mockResolvedValueOnce(
        Response.json({
          id: 1,
          username: "preslaww",
          display_name: "preslaww",
          bio: "bio",
          website: "website",
          github: "github",
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

    await user.click(screen.queryByText("Profile"));

    // await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    screen.queryByText("Loading...");

    expect(screen.queryAllByText("preslaw")[0].textContent).toMatch(/preslaw/i);

    expect(screen.queryAllByText(0)[0]).toBeInTheDocument();

    expect(screen.queryByText("Followers").textContent).toMatch(/followers/i);

    expect(screen.queryAllByText(0)[1]).toBeInTheDocument();

    expect(screen.queryByText("Following").textContent).toMatch(/following/i);

    expect(screen.queryAllByText(0)[2]).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[0].textContent).toMatch(/posts/i);

    expect(screen.queryByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();

    expect(screen.queryAllByText("Posts")[1].textContent).toMatch(/posts/i);

    // screen.debug();

    await user.click(screen.queryByRole("button", { name: "Edit" }));

    await user.type(screen.queryByLabelText("username"), "preslaww");

    expect(screen.queryByLabelText("username").value).toEqual("preslaww");

    await user.type(screen.queryByLabelText("display_name"), "preslaww");

    expect(screen.queryByLabelText("display_name").value).toEqual("preslaww");

    await user.click(screen.queryByLabelText("file"));

    const file = new File(["image"], "image.png", { type: "image/png" });

    const bgImageInput = screen.queryByLabelText("file");

    await user.upload(bgImageInput, file);

    await user.click(screen.queryByRole("button", { name: "Save Changes" }));

    spiedFetch.mockRestore();
  });

  it("should login navigate to user profile and render the posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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
          createdPostsByUsers: [
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
          ],
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
            likes: 0,
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

    await user.click(screen.queryByAltText("Profile"));

    expect(screen.queryByText("Loading..."));

    screen.debug();

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

  it("should login navigate to user profile and like a post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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
          createdPostsByUsers: [
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
          ],
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

    await user.click(screen.queryByAltText("Profile"));

    expect(screen.queryByText("Loading..."));

    screen.debug();

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

  it("should login and render message that the user doesn't have created by him posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/profile/1"],
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
        Response.json({ message: "No created posts by author!" }),
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

    expect(screen.queryByText("Profile"));

    expect(screen.queryByText("Loading..."));

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(
      screen.queryByText("No created posts by author!").textContent,
    ).toMatch(/no created posts by author!/i);

    spiedFetch.mockRestore();
  });
});
