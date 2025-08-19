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
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
      logInUser,
    };

    async function logInUser() {
      fetch("http://localhost/login", {
        body: {
          username: "preslaw",
          password: "12345678B",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
        },
      });
    }

    const mock = vi
      .spyOn(userLogIn, "logInUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mock()).toEqual("preslaw");

    mock.mockImplementationOnce(() => "12345678B");

    expect(mock()).toEqual("12345678B");

    mock.mockImplementationOnce(
      () =>
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
    );

    expect(mock()).toEqual(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
    );

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
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
        },
      });
    }

    const mockLatestUser = vi
      .spyOn(latestUser, "fetchLatestUser")
      .mockImplementationOnce(() => "preslaw");

    expect(mockLatestUser()).toEqual("preslaw");

    mock.mockImplementationOnce(
      () =>
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
    );

    expect(mock()).toEqual(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
    );

    expect(screen.findByText("Loading latest users..."));

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading latest users..."),
    );

    const mockFollowedUser = {
      username: "preslaw1",
      display_name: "preslaw1",
      fetchMostFollowedUser,
    };

    async function fetchMostFollowedUser() {
      fetch("http://localhost/users/followed", {
        body: {
          username: "preslaw1",
          display_name: "preslaw1",
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
        },
      });
    }

    const mockMostFollowedUser = vi
      .spyOn(mockFollowedUser, "fetchMostFollowedUser")
      .mockImplementationOnce(() => "preslaw1");

    expect(mockMostFollowedUser()).toEqual("preslaw1");

    mockMostFollowedUser.mockImplementationOnce(
      () =>
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
    );

    expect(mockMostFollowedUser()).toEqual(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU0NDU5ODYwLCJleHAiOjE3NTQ0NjEzNjB9.49YsQnJmqxDZdA4Vycf9Gzy1tjmj758B_ZJBBeuZE5U",
    );

    expect(screen.findByText("Loading most followed users..."));

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

    screen.debug();
  });
});
