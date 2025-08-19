import { localhostURL } from "../../utility/localhostURL";

const fetchLatestUsers = async () => {
  try {
    const response = await fetch(`${localhostURL}/users/latest`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status >= 400) {
      return response.status;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const latestUsersPromise = fetchLatestUsers();
