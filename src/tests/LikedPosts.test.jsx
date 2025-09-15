import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { localhostURL } from "../../utility/localhostURL";
import { routes } from "../router/routes";
import { server } from "./mocks/server";

describe("should render Liked posts component", () => {
  it("should login and navigate to likes and render liked posts", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/login", "/", "/likes"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const user = userEvent.setup();

    const response = await fetch(`${localhostURL}/login`, {
      method: "POST",
    });

    await expect(response.json()).resolves.toEqual({
      username: "preslaw",
      password: "12345678B",
    });

    const likedPosts = await fetch(`${localhostURL}/posts/liked`);

    await expect(likedPosts.json()).resolves.toEqual([
      {
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

    await user.click(screen.queryByText("Likes"));

    screen.debug();

    expect(screen.queryByText("Liked posts").textContent).toMatch(
      /liked posts/i,
    );

    expect(screen.queryByText("post on home").textContent).toMatch(
      /post on home/i,
    );

    expect(screen.queryByText("preslaw").textContent).toMatch(/preslaw/i);

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

    const response = await fetch(`${localhostURL}/login`, {
      method: "POST",
    });

    await expect(response.json()).resolves.toEqual({
      username: "preslaw",
      password: "12345678B",
    });

    server.use(
      http.get(`${localhostURL}/posts/liked`, () => {
        return HttpResponse.json({ message: "No liked posts!" });
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

    await user.click(screen.queryByText("Likes"));

    await user.click(screen.queryByAltText("dislike the post"));

    screen.debug();

    expect(screen.queryByText("No liked posts!").textContent).toMatch(
      /no liked posts!/i,
    );
  });
});
