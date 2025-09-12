import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPost } from "../../api/useFetchPost";
import { ErrorElement } from "../../components/ErrorElement/ErrorElement";
import { Loading } from "../../components/Loading/Loading";
import { PostDetailsPropsComponent } from "../../components/PostDetailsPropsComponent/PostDetailsPropsComponent";

export function PostDetails() {
  const { post, setPost, loading, error } = useFetchPost();

  const { id } = useParams();

  const [repliedCommentId, setRepliedCommentId] = useState(0);

  const [isTokenHasExpired, setIsTokenHasExpired] = useState();

  const navigate = useNavigate();

  async function likeOrDislikePost(post) {
    try {
      const response = await fetch(`${localhostURL}/posts/${post.id}/like`, {
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

      const likedOrDislikedPostObject = {
        ...post,
        postLikedByUsers: result.postLikedByUsers,
        likes: result.likes,
      };

      setPost(likedOrDislikedPostObject);
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

  async function likeOrDislikeComment(comment) {
    try {
      const response = await fetch(
        `${localhostURL}/posts/${id}/like/${comment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: comment.commentRelatedToPostId,
            commentId: comment.id,
          }),
        },
      );
      const result = await response.json();

      const likedOrDislikedCommentObject = {
        ...post,
        postCommentedByUsers: result.postCommentedByUsers,
      };

      setPost(likedOrDislikedCommentObject);
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

  async function leavingAComment(data) {
    const { text } = data;

    try {
      const response = await fetch(`${localhostURL}/posts/${post.id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: post.id,
          text,
        }),
      });

      const result = await response.json();

      const commentPostObject = {
        ...post,
        postCommentedByUsers: result.postCommentedByUsers,
        comments: result.comments,
      };

      setPost(commentPostObject);
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

  async function leavingACommentReply(data) {
    const { textReply } = data;

    try {
      const response = await fetch(
        `${localhostURL}/posts/${Number(id)}/comment/${repliedCommentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: post.id,
            textReply,
            commentId: repliedCommentId,
          }),
        },
      );
      const result = await response.json();

      console.log(result);

      const commentPostObject = {
        ...post,
        postCommentedByUsers: result.postCommentedByUsers,
        comments: result.comments,
      };

      setPost(commentPostObject);
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

  async function deletingAPost(post) {
    try {
      const response = await fetch(`${localhostURL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: post.id,
        }),
      });

      await response.json();

      navigate("/");
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

  if (loading) return <Loading></Loading>;

  if (error || isTokenHasExpired)
    <ErrorElement
      textProp={"400 Bad Request"}
      textDescriptionProp={
        "Token seems to be lost in the darkness. Login can fix that!"
      }
    ></ErrorElement>;

  return (
    <>
      {post ? (
        <PostDetailsPropsComponent
          post={post}
          onClickLikePost={likeOrDislikePost}
          onClickLikeComment={likeOrDislikeComment}
          onSubmitComment={leavingAComment}
          onSubmitCommentReply={leavingACommentReply}
          repliedCommentId={repliedCommentId}
          setRepliedCommentId={setRepliedCommentId}
          onClickDeletePost={deletingAPost}
        />
      ) : (
        ""
      )}
    </>
  );
}
