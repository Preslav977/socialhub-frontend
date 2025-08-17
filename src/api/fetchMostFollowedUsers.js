import { localhostURL } from "../../utility/localhostURL";

const fetchMostFollowedUsers = async () => {
  const response = await fetch(`${localhostURL}/users/followed`, {
    mode: "cors",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (response.status >= 400) {
    return response.status;
  }

  return response.json();
};

export const mostFollowedUsersPromise = fetchMostFollowedUsers();
