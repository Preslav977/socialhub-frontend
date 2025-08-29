import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { routes } from "../router/routes";

describe("should render MainGridInterface", () => {
  it("should login and render the aside, and right side section", async () => {
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
          profile_picture: "",
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

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByAltText("loading spinner"),
      {
        timeout: 1000,
      },
    );

    // screen.debug();

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

    spiedFetch.mockRestore();
  });

  it("should login, follow a user and render unfollow button", async () => {
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
          username: "preslaw",
          display_name: "preslaw",
          bio: "",
          website: "",
          github: "",
          password: "12345678B",
          confirm_password: "12345678B",
          profile_picture: "",
          followedBy: [
            {
              id: 5,
              username: "test",
              display_name: "test",
            },
          ],
          following: [
            {
              id: 5,
              username: "test",
              display_name: "test",
            },
          ],
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

    // screen.debug();

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByAltText("loading spinner"),
      {
        timeout: 1000,
      },
    );

    // const loadingLatestUsers = screen.getByText("Loading: latest users...");

    // expect(loadingLatestUsers).toBeInTheDocument();

    // await waitForElementToBeRemoved(() =>
    //   screen.getByText("Loading: latest users..."),
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

    // expect(screen.queryByAltText("Loading: most followed users..."));

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByText("Loading: most followed users..."),
    // );

    await user.click(screen.queryAllByRole("button")[0]);

    // screen.debug();

    expect(screen.queryByRole("button", { name: "Unfollow" }));

    spiedFetch.mockRestore();
    // screen.debug();
  });

  it("should login, navigate and render create post component", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/create"],
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

    // screen.debug();

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByAltText("loading spinner"),
      {
        timeout: 1000,
      },
    );

    // const loadingLatestUsers = screen.queryByText("Loading: latest users...");

    // expect(loadingLatestUsers).toBeInTheDocument();

    // await waitForElementToBeRemoved(() =>
    //   screen.queryByText("Loading: latest users..."),
    // );

    await user.click(screen.queryByText("Create"));

    expect(screen.queryByPlaceholderText("Share whats happening..."));

    expect(screen.queryByText("0/2000"));

    expect(screen.queryByRole("button", { name: "Post" }));

    expect(screen.queryByText("Tags:").textContent).toMatch(/tags/i);

    expect(screen.queryByPlaceholderText("Please type to create a tag."));

    spiedFetch.mockRestore();
  });

  it("should login, navigate and render create post errors", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/create"],
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

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByAltText("loading spinner"),
      {
        timeout: 1000,
      },
    );

    const loadingLatestUsers = screen.getByText("Loading: latest users...");

    expect(loadingLatestUsers).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.getByText("Loading: latest users..."),
      {
        timeout: 2000,
      },
    );

    await user.click(screen.queryByText("Create"));

    expect(screen.queryByText("Create").textContent).toMatch(/create/i);

    expect(screen.queryByText("Users").textContent).toMatch(/users/i);

    expect(screen.queryByText("Message").textContent).toMatch(/message/i);

    expect(screen.queryByText("Likes").textContent).toMatch(/likes/i);

    expect(screen.queryByText("Profile").textContent).toMatch(/profile/i);

    expect(screen.queryByText("Settings").textContent).toMatch(/settings/i);

    await user.click(screen.queryByAltText("create"));

    // screen.debug();

    expect(screen.queryByPlaceholderText("Share whats happening..."));

    expect(screen.queryByText("0/2000"));

    expect(screen.queryByRole("button", { name: "Post" }));

    expect(screen.queryByText("Tags:").textContent).toMatch(/tags/i);

    expect(screen.queryByPlaceholderText("Please type to create a tag."));

    await user.click(screen.queryByRole("button", { name: "Post" }));

    expect(screen.queryByText("Content is required").textContent).toMatch(
      /content is required/i,
    );

    expect(screen.queryByText("Tag is required").textContent).toMatch(
      /tag is required/i,
    );

    spiedFetch.mockRestore();
  });

  it("should login, navigate and create a post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/create"],
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
          content: "post",
          tag: "tag",
          likes: 0,
          comments: 0,
          createdAt: new Date(),
          authorId: 1,
        }),
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.queryByAltText("loading spinner"),
      {
        timeout: 1000,
      },
    );

    await user.click(screen.queryByText("Create"));

    expect(screen.queryByPlaceholderText("Share whats happening..."));

    expect(screen.queryByText("0/2000")).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "Post" })).toBeInTheDocument();

    expect(screen.queryByText("Tags:").textContent).toMatch(/tags/i);

    expect(screen.queryByPlaceholderText("Please type to create a tag."));

    await user.type(screen.queryByLabelText("content"), "post");

    expect(screen.queryByLabelText("content").value).toEqual("post");

    await user.type(screen.queryByLabelText("tag"), "tag");

    expect(screen.queryByLabelText("tag").value).toEqual("tag");

    await user.click(screen.queryByRole("button", { name: "Post" }));

    spiedFetch.mockRestore();
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

    await waitForElementToBeRemoved(
      () => screen.queryByAltText("loading spinner"),
      {
        timeout: 1000,
      },
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

    await waitForElementToBeRemoved(
      () => screen.queryByAltText("loading spinner"),
      {
        timeout: 1000,
      },
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

  it("should login and navigate to users and render its content", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/users"],
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
      );

    await user.type(screen.queryByLabelText("username"), "preslaw");

    expect(screen.queryByLabelText("username").value).toEqual("preslaw");

    await user.type(screen.queryByLabelText("password"), "12345678B");

    expect(screen.queryByLabelText("password").value).toEqual("12345678B");

    await user.click(screen.queryByRole("button", { name: "Login" }));

    expect(screen.queryByAltText("loading spinner")).toBeInTheDocument();

    await waitForElementToBeRemoved(
      () => screen.queryByAltText("loading spinner"),
      {
        timeout: 1000,
      },
    );

    await user.click(screen.queryByText("Users"));

    expect(screen.queryAllByPlaceholderText("Enter a username"));

    expect(screen.queryByText("No results").textContent).toMatch(/no results/i);

    spiedFetch.mockRestore();
  });

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
  });

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
  });

  it.only("should login navigate to user profile and like a post", async () => {
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
  });
});
