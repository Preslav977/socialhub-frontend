import { formatDistance } from "date-fns";
import { useContext } from "react";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./PostDetailsPropsComponent.module.css";

export function PostDetails({ post }) {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  return (
    <article className={styles.articlePostContainer}>
      <article className={styles.articlePostAuthor}>
        <img
          className={styles.articleAuthorImg}
          src={post.author.profile_picture}
          alt=""
        />
        <span id="articleAuthor">{post.author.username}</span>
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
          {!post.postLikedByUsers.some((user) => user.id === userLogIn.id) ? (
            <img
              data-testid="articleLike"
              id="articleLike"
              className={styles.articleLike}
              src="/likes.svg"
              alt="like the post"
            />
          ) : (
            <img
              id="articleLike"
              className={styles.articleLike}
              src="/liked.png"
              alt="dislike the post"
            />
          )}

          <p>{post.likes}</p>
        </div>
        <div className={styles.articlePostCommentsContainer}>
          <img className={styles.articleComment} src="/comment.svg" alt="" />
          <p>{post.comments}</p>
        </div>
      </article>
    </article>
  );
}
