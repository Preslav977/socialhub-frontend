import { useContext } from "react";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPosts } from "../../api/useFetchPosts";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./UsersPosts.module.css";

export function UsersPosts() {
  const { posts, setPosts, loading, error } = useFetchPosts(
    `${localhostURL}/posts/author`,
  );

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const { id } = useParams();

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

      console.log(result);

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
      throw error;
    }
  }

  return (
    <>
      {posts.map((post) => (
        <article className={styles.articlePostContainer} key={post.id}>
          <article className={styles.articlePostAuthor}>
            <img
              className={styles.articleAuthorImg}
              src={post.author.profile_picture}
              alt=""
            />
            <p>{post.author.username}</p>
            <p>{post.createdAt}</p>
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
                  onClick={() => likeOrDislikePost(post)}
                  className={styles.articleLike}
                  src="/likes.svg"
                  alt=""
                />
              ) : (
                <img
                  onClick={() => likeOrDislikePost(post)}
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
