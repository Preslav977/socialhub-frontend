import { useContext, useEffect, useState } from "react";
import { localhostURL } from "../../utility/localhostURL";
import { UserDetailsContext } from "../context/UserDetailsContext";

export const useFetchUser = (id) => {
  const [userDetails, setUserDetails] = useContext(UserDetailsContext);

  console.log("useEffect hook", userDetails);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${localhostURL}/users/${Number(id)}`, {
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
