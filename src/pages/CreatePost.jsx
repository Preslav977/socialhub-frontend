import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { localhostURL } from "../../utility/localhostURL";
import { UserLogInContext } from "../context/UserLogInContext";
import styles from "./CreatePost.module.css";

export function CreatePost() {
  const [postLetterLength, setPostLetterLength] = useState("0");

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const [checkIfImgIsUploaded, setCheckIfImageIsUploaded] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitPostText = async (data) => {
    const { content, tag } = data;

    try {
      const response = await fetch(`${localhostURL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          content: content,
          tag: tag,
          authorId: userLogIn.id,
        }),
      });

      const result = await response.json();

      console.log(result);

      reset();
    } catch (error) {
      throw error;
    } finally {
      setCheckIfImageIsUploaded(false);
    }
  };

  const onSubmitPostTextAndImage = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append("authorId", Number(userLogIn.id));

    try {
      const response = await fetch(`${localhostURL}/posts/with-image`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const result = await response.json();

      reset();
    } catch (error) {
      throw error;
    } finally {
      setCheckIfImageIsUploaded(false);
    }
  };

  const onChange = (e) => {
    setPostLetterLength(e.target.value.length);
  };

  return (
    <form
      encType="multipart/formdata"
      className={styles.formCreatePostContainer}
      onSubmit={
        checkIfImgIsUploaded
          ? (e) => handleSubmit(onSubmitPostTextAndImage(e))
          : handleSubmit(onSubmitPostText)
      }
    >
      <label htmlFor="content"></label>
      <textarea
        className={styles.formTextarea}
        onChange={onChange}
        placeholder="Share whats happening..."
        name="content"
        id="content"
        aria-label="content"
        rows={3}
        {...register("content", {
          required: true,
          minLength: 1,
          maxLength: 2000,
          onChange,
        })}
        aria-invalid={errors.content ? "true" : "false"}
      ></textarea>

      {errors.content?.type === "required" && (
        <span role="alert">Content is required</span>
      )}

      {errors.content?.type === "minLength" ||
        (errors.content?.type === "maxLength" && (
          <span role="alert">
            Content must be between 1 and 2000 characters
          </span>
        ))}

      <div className={styles.formFlexedControlsContainer}>
        <div className={styles.formControls}>
          <img
            className={styles.formControlsImg}
            src="./upload-image.svg"
            alt="uploading a image"
          />
          <label htmlFor="file"></label>
          <input
            onClick={() => setCheckIfImageIsUploaded(true)}
            type="file"
            name="file"
            id="file"
          />

          <img
            className={styles.formControlsImg}
            src="./add-tag.svg"
            alt="adding a tag"
          />
        </div>

        <div className={styles.formFlexedLengthContainer}>
          <p>{postLetterLength}/2000</p>
          <button className={styles.submitPostBtn} type="submit">
            Post
          </button>
        </div>
      </div>

      <div className={styles.formTagFlexedContainer}>
        <label htmlFor="tag">Tags:</label>
        <input
          className={styles.formInputTag}
          type="text"
          name="tag"
          id="tag"
          aria-label="tag"
          {...register("tag", {
            required: true,
            minLength: 1,
            maxLength: 30,
          })}
        />

        {errors.tag?.type === "required" && (
          <span role="alert">Tags are required</span>
        )}

        {errors.tag?.type === "minLength" ||
          (errors.tag?.type === "maxLength" && (
            <span role="alert">Tag must be between 1 and 2000 characters</span>
          ))}
      </div>
    </form>
  );
}
