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
          throw new Error("Failed to fetch latest users!");
        }
        return response.json();
      })
      .then((response) => setLatestUsers(response))
      .catch((error) => setError(error))
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 2000),
      );
  }, [setLatestUsers]);

  return { latestUsers, setLatestUsers, error, loading };
};
