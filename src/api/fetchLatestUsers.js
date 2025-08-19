import { localhostURL } from "../../utility/localhostURL";

const fetchLatestUsers = async () => {
  const response = await fetch(`${localhostURL}/users/latest`, {
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

export const latestUsersPromise = fetchLatestUsers();
