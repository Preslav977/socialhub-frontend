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

  http.post(`${localhostURL}/posts`, () => {
    return HttpResponse.json(
      {
        id: 2,
        content: "new post",
        imageURL: null,
        tag: "new",
        likes: 0,
        comments: 0,
        createdAt: "2025-09-13T06:03:47.988Z",
        authorId: 1,
      },

      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/users/1`, () => {
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
      followersNumber: 10,
      followingNumber: 5,
      posts: 1,
      followedBy: [],
      following: [],
    });
  }),

  http.put(`${localhostURL}/users/1`, () => {
    return HttpResponse.json({
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
  }),

  http.get(`${localhostURL}/posts/author/1`, () => {
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

  http.get(`${localhostURL}/posts/liked`, () => {
    return HttpResponse.json(
      [
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
      ],
      { status: 200 },
    );
  }),

  http.post(`${localhostURL}/chats`, () => {
    return HttpResponse.json(
      {
        id: "123bg",
        senderChatId: 1,
        receiverChatId: 2,
      },

      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/posts/1`, () => {
    return HttpResponse.json(
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
      },

      { status: 200 },
    );
  }),

  http.post(`${localhostURL}/posts/1/comment`, () => {
    return HttpResponse.json({
      id: 1,
      content: "post on home",
      imageURL: null,
      tag: "post",
      likes: 0,
      comments: 1,
      createdAt: "2025-09-13T06:03:47.988Z",
      authorId: 1,
      postLikedByUsers: [],
      postCommentedByUsers: [
        {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          text: "hello",
          createdAt: "2025-09-02T08:41:06.396Z",
          commentRelatedToPostId: 1,
          likes: 0,
          parentCommentId: null,
          textReply: null,
          commentLeftByUser: {
            id: 1,
            username: "preslaw",
            display_name: "preslaw",
            createdAt: "2025-08-17T05:29:01.873Z",
          },
          commentLikedByUsers: [],
          childCommentReply: [],
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
        profile_picture: "/user-details.pfp.jpg",
        role: "USER",
        followersNumber: 0,
        followingNumber: 0,
        createdAt: "2025-09-13T06:03:47.988Z",
      },
    });
  }),

  http.put(`${localhostURL}/posts/1/like/1`, () => {
    return HttpResponse.json({
      id: 1,
      content: "post on home",
      imageURL: null,
      tag: "post",
      likes: 0,
      comments: 1,
      createdAt: "2025-09-13T06:03:47.988Z",
      authorId: 1,
      postLikedByUsers: [],
      postCommentedByUsers: [
        {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          text: "hello",
          createdAt: "2025-09-02T08:41:06.396Z",
          commentRelatedToPostId: 1,
          likes: 1,
          parentCommentId: null,
          textReply: null,
          commentLeftByUser: {
            id: 1,
            username: "preslaw",
            display_name: "preslaw",
            createdAt: "2025-08-17T05:29:01.873Z",
          },
          commentLikedByUsers: [
            {
              id: 1,
              username: "preslaw",
              display_name: "preslaw",
            },
          ],
          childCommentReply: [],
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
        profile_picture: "/user-details.pfp.jpg",
        role: "USER",
        followersNumber: 0,
        followingNumber: 0,
        createdAt: "2025-09-13T06:03:47.988Z",
      },
    });
  }),

  http.post(`${localhostURL}/posts/1/comment/1`, () => {
    return HttpResponse.json({
      id: 1,
      content: "post on home",
      imageURL: null,
      tag: "post",
      likes: 0,
      comments: 2,
      createdAt: "2025-09-13T06:03:47.988Z",
      authorId: 1,
      postLikedByUsers: [],
      postCommentedByUsers: [
        {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          text: "hello",
          createdAt: "2025-09-02T08:41:06.396Z",
          commentRelatedToPostId: 1,
          likes: 1,
          parentCommentId: null,
          textReply: null,
          commentLeftByUser: {
            id: 1,
            username: "preslaw",
            display_name: "preslaw",
            createdAt: "2025-08-17T05:29:01.873Z",
          },
          commentLikedByUsers: [],
          childCommentReply: [
            {
              id: 2,
              commentLeftByUserId: 1,
              createdAt: "2025-09-15T06:55:29.094Z",
              commentRelatedToPostId: 1,
              likes: 0,
              parentCommentId: 1,
              textReply: "hello back",
              commentLeftByUser: {
                id: 1,
                username: "preslaw",
                display_name: "preslaw",
                createdAt: "2025-08-17T05:29:01.873Z",
              },
              commentLikedByUsers: [],
            },
          ],
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
        profile_picture: "/user-details.pfp.jpg",
        role: "USER",
        followersNumber: 0,
        followingNumber: 0,
        createdAt: "2025-09-13T06:03:47.988Z",
      },
    });
  }),

  http.delete(`${localhostURL}/posts/1`, () => {
    return HttpResponse.json(
      {
        id: 1,
      },

      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/chats`, () => {
    return HttpResponse.json(
      [
        {
          id: "123bg",
          senderChatId: 1,
          receiverChatId: 2,
          senderChat: {
            id: 1,
            username: "preslaw",
            display_name: "preslaw",
            createdAt: "2025-08-17T05:29:01.873Z",
          },
          receiverChat: {
            id: 2,
            username: "user",
            display_name: "user",

            createdAt: "2025-08-17T05:29:16.247Z",
          },
          messages: [],
        },
      ],

      { status: 200 },
    );
  }),

  http.get(`${localhostURL}/chats/123bg`, () => {
    return HttpResponse.json(
      {
        id: "123bg",
        senderChatId: 1,
        receiverChatId: 2,
        senderChat: {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          createdAt: "2025-08-17T05:29:01.873Z",
        },
        receiverChat: {
          id: 2,
          username: "user",
          display_name: "user",

          createdAt: "2025-08-17T05:29:16.247Z",
        },
        messages: [],
      },

      { status: 200 },
    );
  }),

  http.post(`${localhostURL}/chats/123bg/message`, () => {
    return HttpResponse.json(
      {
        id: "123bg",
        senderChatId: 1,
        receiverChatId: 2,
        senderChat: {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          createdAt: "2025-08-17T05:29:01.873Z",
        },
        receiverChat: {
          id: 2,
          username: "user",
          display_name: "user",

          createdAt: "2025-08-17T05:29:16.247Z",
        },
        messages: [
          {
            id: 1,
            text: "hello",
            imageURL: null,
            createdAt: "2025-09-04T08:05:44.454Z",
            senderMessageId: 1,
            receiverMessageId: 3,
            chatId: "1c2de638-ac34-49e4-9eb0-123bg",
          },
        ],
      },

      { status: 200 },
    );
  }),

  http.post(`${localhostURL}/chats/123bg/image`, () => {
    return HttpResponse.json(
      {
        id: "123bg",
        senderChatId: 1,
        receiverChatId: 2,
        senderChat: {
          id: 1,
          username: "preslaw",
          display_name: "preslaw",
          createdAt: "2025-08-17T05:29:01.873Z",
        },
        receiverChat: {
          id: 2,
          username: "user",
          display_name: "user",

          createdAt: "2025-08-17T05:29:16.247Z",
        },
        messages: [
          {
            id: 2,
            text: "",
            imageURL:
              "https://bjrwqfjliniwoqghdrkl.supabase.co/storage/v1/object/public/socialhub-images/public/socialhub-black.png",
            createdAt: "2025-09-04T08:05:44.454Z",
            senderMessageId: 1,
            receiverMessageId: 2,
            chatId: "1c2de638-ac34-49e4-9eb0-123bg",
          },
        ],
      },

      { status: 200 },
    );
  }),
];
