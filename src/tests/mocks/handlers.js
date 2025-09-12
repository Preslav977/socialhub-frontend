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
];
