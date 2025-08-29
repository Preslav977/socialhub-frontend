import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPosts } from "../../api/useFetchPosts";
import { PostsPropsComponent } from "../../components/PostsPropsComponent/PostsPropsComponent";
import { UserLogInContext } from "../../context/UserLogInContext";

export function Posts() {
  const { id } = useParams();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const location = useLocation();

  const { pathname } = location;

  const url = changeURLDependingOnPathname();

  const { posts, setPosts, loading, error } = useFetchPosts(url);

  const [clickedPost, setClickedPost] = useState();

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  function changeURLDependingOnPathname() {
    switch (pathname) {
      case "/":
        return `${localhostURL}/posts`;
      case "/likes":
        return `${localhostURL}/posts/liked`;
      case `/profile/${id}`:
        return `${localhostURL}/posts/author/${id}`;
      case "/following":
        return `${localhostURL}/posts/following`;
    }
  }

  async function likeOrDislikePost(post) {
    try {
      const response = await fetch(`${localhostURL}/posts/like/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: post.id,
        }),
      });
      const result = await response.json();

      setPosts(
        posts.map((likedPost) => {
          if (likedPost.id === post.id) {
            return {
              ...likedPost,
              likes: result.likes,
              postLikedByUsers: result.postLikedByUsers,
            };
          } else {
            return likedPost;
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  function onClick(e) {
    if (e.target.id === "articleLike") {
      return;
    } else if (e.target.id === "articleAuthor") {
      navigate(`/profile/${clickedPost.author.id}`);
    } else {
      navigate(`/post/${clickedPost.id}`);
    }
  }

  return (
    <>
      <header
        style={{
          color: "white",
        }}
      >
        <Link to={"/"}>Recent</Link>
        <Link to={"/following"}>Following</Link>
      </header>
      {posts.map((post) => (
        <PostsPropsComponent key={post.id} post={post} />
      ))}
    </>
  );
}
