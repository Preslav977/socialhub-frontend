import { useEffect, useState } from "react";

import { localhostURL } from "../../utility/localhostURL";

export const useFetchLatestUsers = () => {
  const [latestUsers, setLatestUsers] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${localhostURL}/users/latest`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Failed to fetch latest users. Try to login again!");
        }
        return response.json();
      })
      .then((response) => setLatestUsers(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setLatestUsers]);

  return { latestUsers, error, loading };
};
