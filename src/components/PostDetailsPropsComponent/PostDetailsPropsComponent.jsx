import { formatDistance } from "date-fns";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { HasNewCommentBeenCreatedContext } from "../../context/HasNewCommentBeenCreatedContext";
import { HasNewCommentReplyBeenCreatedContext } from "../../context/HasNewCommentReplyBeenCreatedContext";
import { UserLogInContext } from "../../context/UserLogInContext";
import { LeftArrow } from "../LeftArrow/LeftArrow";
import styles from "./PostDetailsPropsComponent.module.css";

export function PostDetailsPropsComponent({
  post,
  onClickLikePost,
  onClickLikeComment,
  onSubmitComment,
  onSubmitCommentReply,
  repliedCommentId,
  setRepliedCommentId,
  onClickDeletePost,
}) {
  const { register, handleSubmit, reset } = useForm();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const [toggleReplyOnComment, setToggleReplyOnComment] = useState(false);

  const onToggledReplyOnComment = () =>
    setToggleReplyOnComment((toggleReplyOnComment) => !toggleReplyOnComment);

  const [showOrHideReplyComments, setShowOrHideReplyComments] = useState(false);

  const onToggleShowOrHideReplyComments = () =>
    setShowOrHideReplyComments(
      (showOrHideReplyComments) => !showOrHideReplyComments,
    );

  const [hasNewCommentBeenCreated, setHasNewCommentBeenCreated] = useContext(
    HasNewCommentBeenCreatedContext,
  );

  const [hasNewCommentReplyBeenCreated, setHasNewCommentReplyBeenCreated] =
    useContext(HasNewCommentReplyBeenCreatedContext);

  return (
    <>
      <LeftArrow textProp={"Post"} navigation={"/"} />
      <article className={styles.articlePostContainer}>
        <article className={styles.articlePostAuthor}>
          <div className={styles.articlePostAuthorAndDate}>
            <img
              className={styles.articleAuthorImg}
              src={
                post.author.profile_picture
                  ? post.author.profile_picture
                  : "/user-default-pfp.jpg"
              }
              alt="user profile picture"
            />

            <span>{post.author.username}</span>
            <span>
              {formatDistance(post.createdAt, new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>

          {post.author.id === userLogIn.id ? (
            <div onClick={onClickDeletePost}>
              <img
                className={styles.articleDelete}
                src="/trashcan.svg"
                alt="delete the post"
              />
            </div>
          ) : (
            ""
          )}
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
            <img
              className={styles.articleComment}
              src="/comment.svg"
              alt="comments on article post"
            />
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
          className={styles.createArticleCommentTextarea}
          name="text"
          id="text"
          rows={3}
          minLength={1}
          required
          placeholder="Type a comment..."
          {...register("text")}
        ></textarea>
        <button
          disabled={hasNewCommentBeenCreated}
          onClick={() => {
            setTimeout(() => {
              reset();
            }, 1000);
          }}
          className={styles.createCommentBtn}
          type="submit"
        >
          Post
        </button>
      </form>
      <>
        <p className={styles.viewCommentsPara}>
          View comments ({post.comments})
        </p>
        {post.postCommentedByUsers.map((comment) => (
          <>
            {comment.text ? (
              <div key={comment.id} className={styles.articleCommentContainer}>
                <div className={styles.articleCommentUser}>
                  <img
                    className={styles.articleUserImg}
                    src={
                      comment.commentLeftByUser.profile_picture
                        ? comment.commentLeftByUser.profile_picture
                        : "/user-default-pfp.jpg"
                    }
                    alt="user profile picture"
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

                  <div className={styles.articlePostCommentsContainer}>
                    {comment.childCommentReply.length > 0 ? (
                      <div
                        className={styles.articlePostCommentReplies}
                        onClick={() => {
                          onToggleShowOrHideReplyComments();

                          setRepliedCommentId(comment.id);
                        }}
                      >
                        <img
                          className={styles.articleComment}
                          src="/messages.svg"
                          alt="show replies"
                        />
                        <p>show replies </p>
                      </div>
                    ) : (
                      ""
                    )}

                    <div
                      className={styles.articlePostCommentReply}
                      onClick={() => {
                        onToggledReplyOnComment();

                        setRepliedCommentId(comment.id);
                      }}
                    >
                      <img
                        className={styles.articleComment}
                        src="/comment-reply.svg"
                        alt="reply on the comment"
                      />
                      <span>reply</span>
                    </div>
                  </div>
                </div>
                {showOrHideReplyComments && comment.id === repliedCommentId ? (
                  <>
                    {comment.childCommentReply.map((childComment) => (
                      <div
                        className={styles.articleCommentReplyCommentsContainer}
                        key={childComment.id}
                      >
                        <div className={styles.articleCommentUser}>
                          <img
                            className={styles.articleUserImg}
                            src={
                              childComment.commentLeftByUser.profile_picture
                                ? childComment.commentLeftByUser.profile_picture
                                : "/user-default-pfp.jpg"
                            }
                            alt="user profile picture"
                          />

                          <p>{childComment.commentLeftByUser.username}</p>

                          <p>
                            {formatDistance(
                              childComment.createdAt,
                              new Date(),
                              {
                                addSuffix: true,
                              },
                            )}
                          </p>
                        </div>

                        <p>{childComment.textReply}</p>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}

                {toggleReplyOnComment && repliedCommentId === comment.id ? (
                  <form
                    onSubmit={handleSubmit(onSubmitCommentReply)}
                    className={styles.createReplyArticleComment}
                  >
                    <label htmlFor="textReply"></label>
                    <textarea
                      className={styles.createArticleReplyCommentTextarea}
                      name="textReply"
                      id="textReply"
                      rows={3}
                      placeholder="Add a reply..."
                      minLength={1}
                      required
                      {...register("textReply")}
                    ></textarea>
                    <button
                      disabled={hasNewCommentReplyBeenCreated}
                      onClick={() => {
                        setTimeout(() => {
                          reset({ textReply: "" });

                          setToggleReplyOnComment(false);
                        }, 1500);
                      }}
                      className={styles.createReplyCommentBtn}
                      type="submit"
                    >
                      Reply
                    </button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </>
        ))}
      </>
    </>
  );
}
