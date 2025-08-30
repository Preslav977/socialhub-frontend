import { formatDistance } from "date-fns";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPosts } from "../../api/useFetchPosts";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./Posts.module.css";

export function Posts({ postsHeader }) {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const { id } = useParams();

  const location = useLocation();

  const { pathname } = location;

  const url = changeURLDependingOnPathName();

  const { posts, setPosts, loading, error } = useFetchPosts(url);

  const [clickedPost, setClickedPost] = useState();

  const navigate = useNavigate();

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
      navigate(`/posts/${clickedPost.id}`);
    }
  }

  function changeURLDependingOnPathName() {
    switch (pathname) {
      case "/":
        return `${localhostURL}/posts`;
      case "/likes":
        return `${localhostURL}/posts/liked`;
      case `/profile/${id}`:
        return `${localhostURL}/posts/author/${id}`;
      case "/following":
        return `${localhostURL}/posts/following`;
      case `/posts/${id}`:
        return `${localhostURL}/posts/${id}`;
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <>
      {!postsHeader ? (
        ""
      ) : (
        <header
          style={{
            color: "white",
          }}
        >
          <Link to={"/"}>Recent</Link>
          <Link to={"/following"}>Following</Link>
        </header>
      )}
      {pathname === "/likes" ? <LeftArrow textProp={"Liked posts"} /> : ""}
      {posts.message ? (
        <p>{posts.message}</p>
      ) : (
        <>
          {posts.map((post) => (
            <article
              onClick={(e) => {
                setClickedPost(post);

                onClick(e);
              }}
              className={styles.articlePostContainer}
              key={post.id}
            >
              <article className={styles.articlePostAuthor}>
                <img
                  className={styles.articleAuthorImg}
                  src={post.author.profile_picture}
                  alt=""
                />
                <span id="articleAuthor" onClick={(e) => onClick(e)}>
                  {post.author.username}
                </span>
                <span>
                  {formatDistance(post.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </article>
              <p>{post.content}</p>

              {post.imageURL ? (
                <img
                  className={styles.articlePostImg}
                  src={post.imageURL}
                  alt=""
                />
              ) : (
                ""
              )}
              <article className={styles.articlePostLikeAndComment}>
                <div className={styles.articlePostLikesContainer}>
                  {!post.postLikedByUsers.some(
                    (user) => user.id === userLogIn.id,
                  ) ? (
                    <img
                      data-testid="articleLike"
                      id="articleLike"
                      onClick={(e) => {
                        onClick(e);

                        likeOrDislikePost(post);
                      }}
                      className={styles.articleLike}
                      src="/likes.svg"
                      alt="like the post"
                    />
                  ) : (
                    <img
                      id="articleLike"
                      onClick={(e) => {
                        onClick(e);

                        likeOrDislikePost(post);
                      }}
                      className={styles.articleLike}
                      src="/liked.png"
                      alt="dislike the post"
                    />
                  )}

                  <p>{post.likes}</p>
                </div>
                <div className={styles.articlePostCommentsContainer}>
                  <img
                    className={styles.articleComment}
                    src="/comment.svg"
                    alt=""
                  />
                  <p>{post.comments}</p>
                </div>
              </article>
            </article>
          ))}
        </>
      )}
    </>
  );
}
