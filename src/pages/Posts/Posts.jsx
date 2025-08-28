import { formatDistance } from "date-fns";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPosts } from "../../api/useFetchPosts";
import { RecentOrFollowingPostsContext } from "../../context/RecentOrFollowingPostsContext";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./Posts.module.css";

export function Posts({ url }) {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const { id } = useParams();

  const { posts, setPosts, loading, error } = useFetchPosts(url);

  const [clickedPost, setClickedPost] = useState();

  const [recentOrFollowingPosts, setRecentOrFollowingPosts] = useContext(
    RecentOrFollowingPostsContext,
  );

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
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
        <span onClick={() => setRecentOrFollowingPosts("recent")}>Recent</span>
        <span onClick={() => setRecentOrFollowingPosts("following")}>
          Following
        </span>
      </header>
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
            <img className={styles.articlePostImg} src={post.imageURL} alt="" />
          ) : (
            ""
          )}
          <article className={styles.articlePostLikeAndComment}>
            <div className={styles.articlePostLikesContainer}>
              {!post.postLikedByUsers.some(
                (user) => user.id === userLogIn.id,
              ) ? (
                <img
                  id="articleLike"
                  onClick={(e) => {
                    onClick(e);

                    likeOrDislikePost(post);
                  }}
                  className={styles.articleLike}
                  src="/likes.svg"
                  alt=""
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
                  alt=""
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
  );
}
