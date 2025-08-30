import { useFetchPost } from "../../api/useFetchPost";

export function PostDetails() {
  const { post, setPost, loading, error } = useFetchPost();

  console.log(post);
}
