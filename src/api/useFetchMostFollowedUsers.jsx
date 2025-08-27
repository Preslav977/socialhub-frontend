import { useEffect, useState } from "react";

import { localhostURL } from "../../utility/localhostURL";

export const useFetchMostFollowedUsers = () => {
  const [mostFollowedUsers, setMostFollowedUsers] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${localhostURL}/users/followed`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error(
            "Failed to fetch most followed users. Try to login again!",
          );
        }
        return response.json();
      })
      .then((response) => setMostFollowedUsers(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setMostFollowedUsers]);

  return { mostFollowedUsers, setMostFollowedUsers, error, loading };
};
