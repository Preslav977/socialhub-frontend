import { http, HttpResponse } from "msw";
import { localhostURL } from "../../../utility/localhostURL";

export const handlers = [
  http.post(`${localhostURL}/signup`, () => {
    return HttpResponse.json(
      {
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
      },
      { status: 200 },
    );
  }),

  http.post(`${localhostURL}/login`, () => {
    return HttpResponse.json(
      {
        username: "preslaw",
        password: "12345678B",
      },
      { status: 200 },
    );
  }),

  http.post(`${localhostURL}/guest_login`, () => {
    return HttpResponse.json(
      {
        username: "guest",
        password: "12345678B",
      },
      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/users/latest`, () => {
    return HttpResponse.json(
      [
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
      ],
      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/users/followed`, () => {
    return HttpResponse.json(
      [
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
      ],
      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/users/details`, () => {
    return HttpResponse.json(
      {
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
      },
      { status: 200 },
    );
  }),

  http.put(`${localhostURL}/users/following/2`, () => {
    return HttpResponse.json(
      [
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
      ],
      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/posts`, () => {
    return HttpResponse.json(
      [
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
      ],
      { status: 200 },
    );
  }),

  http.put(`${localhostURL}/posts/1/like`, () => {
    return HttpResponse.json(
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
      },

      { status: 200 },
    );
  }),
];
