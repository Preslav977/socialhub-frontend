import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { routes } from "../router/routes";

describe("should render Post component", () => {
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

    await waitForElementToBeRemoved(() =>
      screen.getByAltText("loading spinner"),
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

    await waitForElementToBeRemoved(() =>
      screen.getByAltText("loading spinner"),
    );

    const loadingLatestUsers = screen.getByText("Loading: latest users...");

    expect(loadingLatestUsers).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading: latest users..."),
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

    await waitForElementToBeRemoved(() =>
      screen.queryByAltText("loading spinner"),
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
});
