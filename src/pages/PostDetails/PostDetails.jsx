import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchPost } from "../../api/useFetchPost";
import { PostDetailsPropsComponent } from "../../components/PostDetailsPropsComponent/PostDetailsPropsComponent";

export function PostDetails() {
  const { post, setPost, loading, error } = useFetchPost();

  console.log(post);

  const { id } = useParams();

  const { reset } = useForm();

  const [repliedCommentId, setRepliedCommentId] = useState(0);

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
      console.log(error);
    }
  }

  async function likeOrDislikeComment(comment) {
    // console.log(comment);

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
      console.log(error);
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
        comments: result.comment,
      };

      setPost(commentPostObject);

      reset();
    } catch (error) {
      console.log(error);
    }
  }

  async function leavingACommentReply(data) {
    const { text } = data;

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
            text,
            commentId: repliedCommentId,
          }),
        },
      );
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.log(error);
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
      {post ? (
        <PostDetailsPropsComponent
          post={post}
          onClickLikePost={likeOrDislikePost}
          onClickLikeComment={likeOrDislikeComment}
          onSubmitComment={leavingAComment}
          onSubmitCommentReply={leavingACommentReply}
          repliedCommentId={repliedCommentId}
          setRepliedCommentId={setRepliedCommentId}
        />
      ) : (
        ""
      )}
    </>
  );
}
