import { localhostURL } from "../../utility/localhostURL";

const fetchLatestUsers = async () => {
  const response = await fetch(`${localhostURL}/users/latest`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (response.status >= 400) {
    return response.status;
  }

  return response.json();
};

export const latestUsersPromise = fetchLatestUsers();
