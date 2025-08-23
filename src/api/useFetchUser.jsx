import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { localhostURL } from "../../utility/localhostURL";
import { UserDetailsContext } from "../context/UserDetailsContext";

export const useFetchUser = () => {
  const [userDetails, setUserDetails] = useContext(UserDetailsContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${localhostURL}/users/${id}`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Failed to fetch user details. Try to login again!");
        }
        return response.json();
      })
      .then((response) => setUserDetails(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [setUserDetails]);

  return { userDetails, setUserDetails, error, loading };
};
