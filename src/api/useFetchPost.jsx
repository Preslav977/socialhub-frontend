import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../utility/localhostURL";

export const useFetchPost = () => {
  const [post, setPost] = useState();

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${localhostURL}/posts/${Number(id)}`, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Failed to fetch single post!");
        }
        return response.json();
      })
      .then((response) => setPost(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  return { post, setPost, loading, error };
};
