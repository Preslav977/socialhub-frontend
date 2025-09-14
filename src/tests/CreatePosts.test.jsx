import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { localhostURL } from "../../utility/localhostURL";
import { routes } from "../router/routes";

describe("should render Post component", () => {
  it("should login, navigate and render create post component", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/create"],
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

    // screen.debug();

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByAltText("loading spinner"),
    );

    await user.click(screen.queryByText("Create"));

    expect(screen.queryByPlaceholderText("Share whats happening..."));

    expect(screen.queryByText("0/2000"));

    expect(screen.queryByRole("button", { name: "Post" }));

    expect(screen.queryByText("Tags:").textContent).toMatch(/tags/i);

    expect(screen.queryByPlaceholderText("Please type to create a tag."));
  });

  it("should login, navigate and render create post errors", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/create"],
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

    const loading = screen.getByAltText("loading spinner");

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByAltText("loading spinner"),
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
  });

  it("should login, navigate and create a post", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/create"],
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

    const createPost = await fetch(`${localhostURL}/posts`, {
      method: "POST",
      body: JSON.stringify({
        content: "new post",
        tag: "new",
        authorId: 1,
      }),
    });

    await expect(createPost.json()).resolves.toEqual({
      id: 2,
      content: "new post",
      imageURL: null,
      tag: "new",
      likes: 0,
      comments: 0,
      createdAt: "2025-09-13T06:03:47.988Z",
      authorId: 1,
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

    expect(screen.queryByText("Post created!").textContent).toMatch(
      /post created!/i,
    );

    expect(screen.queryByText("X").textContent).toMatch(/x/i);
  });
});
