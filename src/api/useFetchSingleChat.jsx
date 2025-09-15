import { useEffect, useState } from "react";
import { localhostURL } from "../../utility/localhostURL";

export const useFetchSingleChat = (id) => {
  const [chatDetails, setChatDetails] = useState();

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${localhostURL}/chats/${id}`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Failed to fetch chats!");
        }
        return response.json();
      })
      .then((response) => setChatDetails(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  return { chatDetails, setChatDetails, loading, error };
};
