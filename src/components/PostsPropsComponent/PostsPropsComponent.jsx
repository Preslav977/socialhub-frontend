import { useContext } from "react";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./PostsPropsComponent.module.css";

export function PostsPropsComponent({ post, onClick, likeOrDislikePost }) {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  return (
    <>
      <article
        onClick={(e) => {
          // setClickedPost(post);
          // onClick(e);
        }}
        className={styles.articlePostContainer}
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
            {/* {formatDistance(post.createdAt, new Date(), {
            addSuffix: true,
          })} */}
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
            <img className={styles.articleComment} src="/comment.svg" alt="" />
            <p>{post.comments}</p>
          </div>
        </article>
      </article>
    </>
  );
}
