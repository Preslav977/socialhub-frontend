import { formatDistance } from "date-fns";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./PostDetailsPropsComponent.module.css";

export function PostDetailsPropsComponent({
  post,
  onClickLikePost,
  onClickLikeComment,
  onSubmitComment,
}) {
  const { register, handleSubmit } = useForm();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const [toggleReplyOnComment, setToggleReplyOnComment] = useState(false);

  const onToggledReplyOnComment = () =>
    setToggleReplyOnComment((toggleReplyOnComment) => !toggleReplyOnComment);

  return (
    <>
      <article className={styles.articlePostContainer}>
        <article className={styles.articlePostAuthor}>
          <div className={styles.articlePostAuthorAndDate}>
            <img
              className={styles.articleAuthorImg}
              src={post.author.profile_picture}
              alt=""
            />

            <span>{post.author.username}</span>
            <span>
              {formatDistance(post.createdAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>

          {post.author.id === userLogIn.id ? (
            <div>
              <img
                className={styles.articleDelete}
                src="/trashcan.svg"
                alt=""
              />
            </div>
          ) : (
            ""
          )}
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
                onClick={() => onClickLikePost(post)}
                data-testid="articleLike"
                className={styles.articleLike}
                src="/likes.svg"
                alt="like the post"
              />
            ) : (
              <img
                onClick={() => onClickLikePost(post)}
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
      <form
        onSubmit={handleSubmit(onSubmitComment)}
        className={styles.createArticleComment}
      >
        <label htmlFor="text"></label>
        <textarea
          name="text"
          id="text"
          rows={3}
          placeholder="Type a comment..."
          {...register("text")}
        ></textarea>
        <button className={styles.createCommentBtn} type="submit">
          Post
        </button>
      </form>
      <>
        <p>View comments {post.comments}</p>
        {post.postCommentedByUsers.map((comment) => (
          <div className={styles.articleCommentContainer}>
            <div className={styles.articleCommentUser}>
              <img
                className={styles.articleUserImg}
                src={comment.commentLeftByUser.profile_picture}
                alt=""
              />

              <p>{comment.commentLeftByUser.username}</p>

              <p>
                {formatDistance(comment.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>

            <p>{comment.text}</p>

            <div className={styles.articlePostLikeAndComment}>
              <div className={styles.articlePostLikesContainer}>
                {!comment.commentLikedByUsers.some(
                  (user) => user.id === userLogIn.id,
                ) ? (
                  <img
                    onClick={() => onClickLikeComment(comment)}
                    data-testid="articleLike"
                    className={styles.articleLike}
                    src="/likes.svg"
                    alt="like the comment"
                  />
                ) : (
                  <img
                    onClick={() => onClickLikeComment(comment)}
                    className={styles.articleLike}
                    src="/liked.png"
                    alt="dislike the comment"
                  />
                )}
                <p>{comment.likes}</p>
              </div>

              <div
                onClick={() => onToggledReplyOnComment()}
                className={styles.articlePostCommentsContainer}
              >
                <img
                  className={styles.articleComment}
                  src="/comment-reply.svg"
                  alt=""
                />
                <span>reply</span>
              </div>
            </div>
            {toggleReplyOnComment ? (
              <form className={styles.createReplyArticleComment}>
                <label htmlFor="text"></label>
                <textarea
                  name="text"
                  id="text"
                  rows={3}
                  placeholder="Add a reply..."
                  {...register("text")}
                ></textarea>
                <button className={styles.createReplyCommentBtn} type="submit">
                  Reply
                </button>
              </form>
            ) : (
              ""
            )}
          </div>
        ))}
      </>
    </>
  );
}
