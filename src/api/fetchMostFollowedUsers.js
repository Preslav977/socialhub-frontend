import { localhostURL } from "../../utility/localhostURL";

const fetchMostFollowedUsers = async () => {
  const response = await fetch(`${localhostURL}/users/followed`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });

  // console.log(response);

  if (response.status >= 400) {
    return response.status;
  }

  return response.json();
};

export const mostFollowedUsersPromise = fetchMostFollowedUsers();
