import { formatDistance } from "date-fns";
import { useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPosts } from "../../api/useFetchPosts";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import { LoadingSkeleton } from "../../components/LoadingSkeleton/LoadingSkeletion";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./Posts.module.css";

export function Posts({ postsHeader }) {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const { id } = useParams();

  const location = useLocation();

  const { pathname } = location;

  const url = changeURLDependingOnPathName();

  const { posts, setPosts, loading, error } = useFetchPosts(url);

  const navigate = useNavigate();

  if (loading) {
    return <LoadingSkeleton prop={posts}></LoadingSkeleton>;
  }

  if (error) return <p>Error...</p>;

  async function likeOrDislikePost(post) {
    try {
      const response = await fetch(`${localhostURL}/posts/${id}/like`, {
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

  function navigateToPostAuthor(post) {
    navigate(`/profile/${post.author.id}`);
  }

  function navigateToPostDetails(post) {
    navigate(`/posts/${post.id}`);
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

  return (
    <>
      {!postsHeader ? (
        ""
      ) : (
        <header className={styles.articlePostHeader}>
          <Link className={styles.articlePostHeaderAnchor} to={"/"}>
            <span
              className={pathname === "/" ? styles.articlePosHeaderSpan : ""}
            >
              Recent
            </span>
          </Link>
          <Link className={styles.articlePostHeaderAnchor} to={"/following"}>
            <span
              className={
                pathname === "/following" ? styles.articlePosHeaderSpan : ""
              }
            >
              Following
            </span>
          </Link>
        </header>
      )}
      {pathname === "/likes" ? <LeftArrow textProp={"Liked posts"} /> : ""}
      {!posts.message ? (
        <>
          {posts.map((post) => (
            <article
              onClick={() => navigateToPostDetails(post)}
              className={styles.articlePostContainer}
              key={post.id}
            >
              <article className={styles.articlePostAuthor}>
                <img
                  className={styles.articleAuthorImg}
                  src={post.author.profile_picture}
                  alt="article post author profile picture"
                />
                <span
                  onClick={(e) => {
                    e.stopPropagation();

                    navigateToPostAuthor(post);
                  }}
                >
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
                  alt="article post image"
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
                        likeOrDislikePost(post);

                        e.stopPropagation();
                      }}
                      className={styles.articleLike}
                      src="/likes.svg"
                      alt="like the post"
                    />
                  ) : (
                    <img
                      id="articleLike"
                      onClick={(e) => {
                        likeOrDislikePost(post);

                        e.stopPropagation();
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
                    data-testid="articleComment"
                    src="/comment.svg"
                    alt="comment on post"
                  />
                  <p>{post.comments}</p>
                </div>
              </article>
            </article>
          ))}
        </>
      ) : (
        <p>{posts.message}</p>
      )}
    </>
  );
}
