import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/PostsContext";

export const useFetchPosts = (url) => {
  const [posts, setPosts] = useContext(PostsContext);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, {
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Failed to fetch posts!");
        }
        return response.json();
      })
      .then((response) => setPosts(response))
      .catch((error) => setError(error))
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 2000),
      );
  }, [url, posts, setPosts]);

  return { posts, setPosts, error, loading };
};
